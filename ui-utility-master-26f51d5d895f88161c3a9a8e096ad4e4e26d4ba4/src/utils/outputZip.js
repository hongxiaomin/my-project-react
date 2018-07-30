import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import FileSaver from 'file-saver';
import Mark from 'markup-js';

import 'whatwg-fetch';
/*
@see https://github.com/js-cookie/js-cookie/blob/master/src/js.cookie.js
export Cookies: function api (key, value, attributes)
 */
import { default as getCookies } from 'js-cookie';

import composeStencilTree from 'ui-utility-core/lib/utils/composeStencilTree';
import { renderViewByModel } from 'ui-utility-code-generator/lib/utils';
import {
  genContainerCode, getTopicsAndUrls, convertNonPrimitiveProps,
} from './';
import {
  MAIN_VIEW_TEMPLATE, ROUTE_TEMPLATE, DEFAULT_ROUTE_TEMPLATE, MQTT_SUBSCRIPTION_TEMPLATE,
  COMPONENT_TEMPLATE, IMPORT_TEMPLATE, CONTAINER_TEMPLATE, MQTT_SETUP_TEMPLATE,
  REST_SETUP_TEMPLATE, REST_URL_TEMPLATE,
} from '../constants/codeTemplates';

/**
 * zip this website view
 * @param  {Object} options.routing     {...}
 * @param  {Object} options.mqttSetting {...}
 * @param  {String} options.apiURI      http://...
 * @param  {String} options.fileName    abc.zip
 * @param  {String} options.callback    function
 */
export default ({ routing, mqttSetting, apiURI, fileName = '', callback }) => {
  new JSZip.external.Promise((resolve, reject) => {
    JSZipUtils.getBinaryContent('./zip/user-web.zip', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
  .then(JSZip.loadAsync)
  .then((zip) => {
    const routes = [];
    let imports = '';
    for (let i = 0; i < routing.routes.length; i++) {
      const { path, stencils } = routing.routes[i];
      const stencilTree = composeStencilTree(stencils).toJS();
      const view = renderViewByModel(stencilTree);
      const container = genContainerCode(stencils);
      // create each page both component/container by path name
      // every component has container to connect itself and do dispatch
      const componentCode = Mark.up(COMPONENT_TEMPLATE, { path, view });
      const containerCode = Mark.up(CONTAINER_TEMPLATE, { path, container });
      zip.file(`src/components/${path}.js`, `${componentCode}`);
      zip.file(`src/containers/${path}Container.js`, `${containerCode}`);
      // dynamically create import xxxContainer from... based on file name
      imports = imports + Mark.up(IMPORT_TEMPLATE, { path });
      // each path is <Route> inside MainView.js, MainView will import containers
      routes.push(Mark.up(ROUTE_TEMPLATE, { path, i }));
    }
    const firstPage = routing.routes[0].path;
    // make the route path: '/' to show first page, and push to be the last route
    routes.push(Mark.up(DEFAULT_ROUTE_TEMPLATE, { path: firstPage, i: routing.routes.length }));
    // MainView.js is root component and do routing of container
    zip.file('src/MainView.js', Mark.up(MAIN_VIEW_TEMPLATE, { routes, imports, firstPage }));
    // create json of whole state.routing for later load
    const appRouting = routing;
    delete appRouting.locationBeforeTransitions;
    // convert transformer of both chart to be string since only string can be saved to JSON
    appRouting.routes = convertNonPrimitiveProps(appRouting.routes, 'save');
    // the third parameter: 2 is for prettify JSON
    zip.file('app.json', JSON.stringify(appRouting, null, 2));
    // add MQTT setup info
    const { ip } = mqttSetting;
    if (ip !== undefined && ip.length !== 0 && ip.replace(/\s/g, '').length !== 0) {
      const { topics } = getTopicsAndUrls(routing.routes);
      let subscriptions = '';
      for (let i = 0; i < topics.length; i++) {
        subscriptions = subscriptions + Mark.up(MQTT_SUBSCRIPTION_TEMPLATE, { topic: topics[i] });
      }
      zip.file('src/setup/setupMQTT.js',
        Mark.up(MQTT_SETUP_TEMPLATE, { mqttSetting, subscriptions }));
    }
    // add REST setup info
    const { urls } = getTopicsAndUrls(routing.routes);
    if (urls.length > 0) {
      let urlInfos = '';
      for (let i = 0; i < urls.length; i++) {
        urlInfos = urlInfos + Mark.up(REST_URL_TEMPLATE, { url: urls[i] });
      }
      zip.file('src/setup/setupREST.js', Mark.up(REST_SETUP_TEMPLATE, { urlInfos }));
    }
    /*
    save to app.zip
    @see https://stuk.github.io/jszip/documentation/api_jszip/file_name.html
    @see https://stuk.github.io/jszip/documentation/api_jszip/generate_async.html
     */
    const timestamp = new Date().toISOString().replace(/[:|\.]+/g, '-');
    const zipName = fileName !== '' ? `${fileName}.zip` : `${timestamp}_app.zip`;
    zip.generateAsync({ type: 'blob' })
      .then((blob) => {
        /*
        fetch server or download to user
         */
        if (apiURI !== undefined) {
          /*
          NOT use 'Content-Type': 'multipart/form-data',
          @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
           */
          const myHeaders = new Headers({
            'Content-Length': blob.size.toString(),
            token: getCookies('MP_token'),
          });
          /*
          uploade file to server
          @see http://stackoverflow.com/questions/41025078/react-dropzone-how-to-upload-image
          @see https://developer.mozilla.org/zh-TW/docs/Web/API/FormData/Using_FormData_Objects
          @see https://developer.mozilla.org/zh-TW/docs/Web/API/FormData/append
           */
          const formData = new FormData();
          formData.append(
            'file',
            blob,
            `${timestamp}_${zipName}`
          );
          /*
          http://stackoverflow.com/questions/18642828
          /origin-http-localhost3000-is-not-allowed-by-access-control-allow-origin
           */
          fetch(
            apiURI,
            {
              method: 'POST',
              headers: myHeaders,
              // mode: 'no-cors', // don't use this!!
              body: formData,
            }
          ).then((response) => {
            const contentType = response.headers.get('content-type');
            let json = null;
            // @see https://stackoverflow.com/questions/37121301/
            if (contentType && contentType.indexOf('application/json') !== -1) {
              // example: {"success":true,"url":"http://10.120.136.90:3010/apps/test/"}
              json = response.json();
            }

            return json;
          }).then((json) => {
            if (Object.prototype.toString.call(callback) === '[object Function]') {
              callback(json);
            }
          })
          .catch((exception) => {
            window.console.error('Zip deploy to server error!!', exception);
          });
        } else {
          FileSaver.saveAs(blob, zipName);
        }
      }
    );
  }); // end JSZip
};
