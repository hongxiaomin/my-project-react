System.config({
  baseURL: "./",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  meta: {
    "*.css": {
      "loader": "css"
    }
  },

  map: {
    "ag-grid": "npm:ag-grid@10.1.0",
    "ag-grid-react": "npm:ag-grid-react@10.1.0",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "check-types": "npm:check-types@7.3.0",
    "core-js": "npm:core-js@1.2.7",
    "css": "github:systemjs/plugin-css@0.1.33",
    "drc.atoms": "npm:drc.atoms@0.0.37",
    "drc.atoms.buttons": "npm:drc.atoms.buttons@0.0.26",
    "drc.atoms.menus": "npm:drc.atoms.menus@0.0.26",
    "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.25",
    "drc.atoms.table": "npm:drc.atoms.table@0.0.30",
    "flexboxgrid": "npm:flexboxgrid@6.3.1",
    "immutable": "npm:immutable@3.8.1",
    "material-ui": "npm:material-ui@0.15.4",
    "paho-mqtt": "npm:paho-mqtt@1.0.3",
    "prop-types": "npm:prop-types@15.5.10",
    "react": "npm:react@15.6.1",
    "react-dom": "npm:react-dom@15.6.1",
    "react-flexbox-grid": "npm:react-flexbox-grid@1.0.2",
    "react-native-material-color": "npm:react-native-material-color@1.0.15",
    "react-real-time-chart": "npm:react-real-time-chart@0.0.5",
    "react-redux": "npm:react-redux@5.0.1",
    "react-router": "npm:react-router@3.0.0",
    "react-router-redux": "npm:react-router-redux@4.0.7",
    "react-tap-event-plugin": "npm:react-tap-event-plugin@2.0.1",
    "recharts": "npm:recharts@0.21.2",
    "redux": "npm:redux@3.6.0",
    "redux-actions": "npm:redux-actions@1.2.0",
    "redux-immutable": "npm:redux-immutable@3.0.9",
    "roylee0704/react-flexbox-grid": "github:roylee0704/react-flexbox-grid@1.0.0",
    "systemjs-plugin-css": "npm:systemjs-plugin-css@0.1.33",
    "uuid": "npm:uuid@3.0.1",
    "whatwg-fetch": "npm:whatwg-fetch@2.0.3",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.1": {
      "buffer": "npm:buffer@5.0.7"
    },
    "github:jspm/nodelibs-constants@0.1.0": {
      "constants-browserify": "npm:constants-browserify@0.0.1"
    },
    "github:jspm/nodelibs-crypto@0.1.0": {
      "crypto-browserify": "npm:crypto-browserify@3.11.1"
    },
    "github:jspm/nodelibs-domain@0.1.0": {
      "domain-browser": "npm:domain-browser@1.1.7"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.10"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:jspm/nodelibs-zlib@0.1.0": {
      "browserify-zlib": "npm:browserify-zlib@0.1.4"
    },
    "npm:ag-grid-react@10.1.0": {
      "ag-grid": "npm:ag-grid@10.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:ag-grid@10.1.0": {
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:asap@2.0.6": {
      "domain": "github:jspm/nodelibs-domain@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:asn1.js@4.9.1": {
      "bn.js": "npm:bn.js@4.11.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-polyfill@6.23.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "core-js": "npm:core-js@2.4.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "regenerator-runtime": "npm:regenerator-runtime@0.10.5"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:babel-runtime@6.26.0": {
      "core-js": "npm:core-js@2.4.1",
      "regenerator-runtime": "npm:regenerator-runtime@0.11.0"
    },
    "npm:browserify-aes@1.0.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "buffer-xor": "npm:buffer-xor@1.0.3",
      "cipher-base": "npm:cipher-base@1.0.4",
      "create-hash": "npm:create-hash@1.1.3",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.2",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-cipher@1.0.0": {
      "browserify-aes": "npm:browserify-aes@1.0.6",
      "browserify-des": "npm:browserify-des@1.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.2"
    },
    "npm:browserify-des@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "cipher-base": "npm:cipher-base@1.0.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "des.js": "npm:des.js@1.0.0",
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:browserify-rsa@4.0.1": {
      "bn.js": "npm:bn.js@4.11.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "randombytes": "npm:randombytes@2.0.5"
    },
    "npm:browserify-sign@4.0.4": {
      "bn.js": "npm:bn.js@4.11.8",
      "browserify-rsa": "npm:browserify-rsa@4.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "create-hash": "npm:create-hash@1.1.3",
      "create-hmac": "npm:create-hmac@1.1.6",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.4.0",
      "inherits": "npm:inherits@2.0.1",
      "parse-asn1": "npm:parse-asn1@5.1.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-zlib@0.1.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "pako": "npm:pako@0.2.9",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "readable-stream": "npm:readable-stream@2.3.3",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:buffer-xor@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:buffer@5.0.7": {
      "base64-js": "npm:base64-js@1.2.1",
      "ieee754": "npm:ieee754@1.1.8"
    },
    "npm:c3@0.4.11": {
      "css": "github:systemjs/plugin-css@0.1.33",
      "d3": "npm:d3@3.5.17"
    },
    "npm:chain-function@1.0.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:cipher-base@1.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0"
    },
    "npm:constants-browserify@0.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-js@2.4.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:create-ecdh@4.0.0": {
      "bn.js": "npm:bn.js@4.11.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.4.0"
    },
    "npm:create-hash@1.1.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "cipher-base": "npm:cipher-base@1.0.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "ripemd160": "npm:ripemd160@2.0.1",
      "sha.js": "npm:sha.js@2.4.8"
    },
    "npm:create-hmac@1.1.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "cipher-base": "npm:cipher-base@1.0.4",
      "create-hash": "npm:create-hash@1.1.3",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "ripemd160": "npm:ripemd160@2.0.1",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "sha.js": "npm:sha.js@2.4.8"
    },
    "npm:create-react-class@15.6.0": {
      "fbjs": "npm:fbjs@0.8.14",
      "loose-envify": "npm:loose-envify@1.3.1",
      "object-assign": "npm:object-assign@4.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:crypto-browserify@3.11.1": {
      "browserify-cipher": "npm:browserify-cipher@1.0.0",
      "browserify-sign": "npm:browserify-sign@4.0.4",
      "create-ecdh": "npm:create-ecdh@4.0.0",
      "create-hash": "npm:create-hash@1.1.3",
      "create-hmac": "npm:create-hmac@1.1.6",
      "diffie-hellman": "npm:diffie-hellman@5.0.2",
      "inherits": "npm:inherits@2.0.1",
      "pbkdf2": "npm:pbkdf2@3.0.13",
      "public-encrypt": "npm:public-encrypt@4.0.0",
      "randombytes": "npm:randombytes@2.0.5"
    },
    "npm:css-in-js-utils@1.0.3": {
      "hyphenate-style-name": "npm:hyphenate-style-name@1.0.2"
    },
    "npm:d3-interpolate@1.1.5": {
      "d3-color": "npm:d3-color@1.0.3"
    },
    "npm:d3-scale@1.0.4": {
      "d3-array": "npm:d3-array@1.2.0",
      "d3-collection": "npm:d3-collection@1.0.4",
      "d3-color": "npm:d3-color@1.0.3",
      "d3-format": "npm:d3-format@1.2.0",
      "d3-interpolate": "npm:d3-interpolate@1.1.5",
      "d3-time": "npm:d3-time@1.0.7",
      "d3-time-format": "npm:d3-time-format@2.0.5"
    },
    "npm:d3-shape@1.0.4": {
      "d3-path": "npm:d3-path@1.0.5"
    },
    "npm:d3-time-format@2.0.5": {
      "d3-time": "npm:d3-time@1.0.7"
    },
    "npm:des.js@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
    },
    "npm:diffie-hellman@5.0.2": {
      "bn.js": "npm:bn.js@4.11.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "miller-rabin": "npm:miller-rabin@4.0.0",
      "randombytes": "npm:randombytes@2.0.5",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:domain-browser@1.1.7": {
      "events": "github:jspm/nodelibs-events@0.1.1"
    },
    "npm:drc.atoms.accordion@0.0.37": {
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.37",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1",
      "react-tap-event-plugin": "npm:react-tap-event-plugin@2.0.1"
    },
    "npm:drc.atoms.app-bar@0.0.37": {
      "check-types": "npm:check-types@7.3.0",
      "drc.atoms.buttons": "npm:drc.atoms.buttons@0.0.37",
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.37",
      "drc.atoms.paper": "npm:drc.atoms.paper@0.0.37",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1",
      "react-tap-event-plugin": "npm:react-tap-event-plugin@2.0.1"
    },
    "npm:drc.atoms.breadcrumb@0.0.37": {
      "check-types": "npm:check-types@7.3.0",
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.37",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1"
    },
    "npm:drc.atoms.buttons@0.0.26": {
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.25",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1"
    },
    "npm:drc.atoms.buttons@0.0.37": {
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.37",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1",
      "react-tap-event-plugin": "npm:react-tap-event-plugin@2.0.1"
    },
    "npm:drc.atoms.card@0.0.37": {
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.37",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1"
    },
    "npm:drc.atoms.charts@0.0.37": {
      "deepmerge": "npm:deepmerge@1.5.1",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1",
      "recharts": "npm:recharts@0.22.4",
      "shortid": "npm:shortid@2.2.8"
    },
    "npm:drc.atoms.grid-list@0.0.37": {
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.37",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1"
    },
    "npm:drc.atoms.menus@0.0.26": {
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.25",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1"
    },
    "npm:drc.atoms.menus@0.0.37": {
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.37",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1",
      "react-tap-event-plugin": "npm:react-tap-event-plugin@2.0.1"
    },
    "npm:drc.atoms.mui-theme-provider@0.0.25": {
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1"
    },
    "npm:drc.atoms.mui-theme-provider@0.0.37": {
      "delta-color": "npm:delta-color@0.0.3",
      "lodash.merge": "npm:lodash.merge@4.6.0",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1"
    },
    "npm:drc.atoms.paper@0.0.37": {
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.37",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1"
    },
    "npm:drc.atoms.switches@0.0.37": {
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.37",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1"
    },
    "npm:drc.atoms.table@0.0.30": {
      "ag-grid": "npm:ag-grid@10.1.0",
      "ag-grid-react": "npm:ag-grid-react@10.1.0",
      "drc.atoms.buttons": "npm:drc.atoms.buttons@0.0.26",
      "drc.atoms.menus": "npm:drc.atoms.menus@0.0.26",
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.25",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1"
    },
    "npm:drc.atoms.table@0.0.37": {
      "ag-grid": "npm:ag-grid@10.1.0",
      "ag-grid-react": "npm:ag-grid-react@10.1.0",
      "drc.atoms.buttons": "npm:drc.atoms.buttons@0.0.37",
      "drc.atoms.menus": "npm:drc.atoms.menus@0.0.37",
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.37",
      "drc.atoms.paper": "npm:drc.atoms.paper@0.0.37",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1",
      "react-tap-event-plugin": "npm:react-tap-event-plugin@2.0.1"
    },
    "npm:drc.atoms.text-field@0.0.37": {
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.37",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1"
    },
    "npm:drc.atoms@0.0.37": {
      "ag-grid": "npm:ag-grid@10.1.0",
      "ag-grid-react": "npm:ag-grid-react@10.1.0",
      "check-types": "npm:check-types@7.3.0",
      "deepmerge": "npm:deepmerge@1.5.1",
      "drc.atoms.accordion": "npm:drc.atoms.accordion@0.0.37",
      "drc.atoms.app-bar": "npm:drc.atoms.app-bar@0.0.37",
      "drc.atoms.breadcrumb": "npm:drc.atoms.breadcrumb@0.0.37",
      "drc.atoms.buttons": "npm:drc.atoms.buttons@0.0.37",
      "drc.atoms.card": "npm:drc.atoms.card@0.0.37",
      "drc.atoms.charts": "npm:drc.atoms.charts@0.0.37",
      "drc.atoms.grid-list": "npm:drc.atoms.grid-list@0.0.37",
      "drc.atoms.menus": "npm:drc.atoms.menus@0.0.37",
      "drc.atoms.mui-theme-provider": "npm:drc.atoms.mui-theme-provider@0.0.37",
      "drc.atoms.paper": "npm:drc.atoms.paper@0.0.37",
      "drc.atoms.switches": "npm:drc.atoms.switches@0.0.37",
      "drc.atoms.table": "npm:drc.atoms.table@0.0.37",
      "drc.atoms.text-field": "npm:drc.atoms.text-field@0.0.37",
      "material-ui": "npm:material-ui@0.18.7",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1",
      "react-tap-event-plugin": "npm:react-tap-event-plugin@2.0.1",
      "recharts": "npm:recharts@0.22.4",
      "shortid": "npm:shortid@2.2.8"
    },
    "npm:elliptic@6.4.0": {
      "bn.js": "npm:bn.js@4.11.8",
      "brorand": "npm:brorand@1.1.0",
      "hash.js": "npm:hash.js@1.1.3",
      "hmac-drbg": "npm:hmac-drbg@1.0.1",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:encoding@0.1.12": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "iconv-lite": "npm:iconv-lite@0.4.18"
    },
    "npm:evp_bytestokey@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "md5.js": "npm:md5.js@1.3.4",
      "safe-buffer": "npm:safe-buffer@5.1.1"
    },
    "npm:fbjs@0.2.1": {
      "core-js": "npm:core-js@1.2.7",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "promise": "npm:promise@7.3.1",
      "whatwg-fetch": "npm:whatwg-fetch@0.9.0"
    },
    "npm:fbjs@0.8.14": {
      "core-js": "npm:core-js@1.2.7",
      "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
      "loose-envify": "npm:loose-envify@1.3.1",
      "object-assign": "npm:object-assign@4.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "promise": "npm:promise@7.3.1",
      "setimmediate": "npm:setimmediate@1.0.5",
      "ua-parser-js": "npm:ua-parser-js@0.7.14"
    },
    "npm:flexboxgrid@6.3.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:hash-base@2.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:hash-base@3.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:hash.js@1.1.3": {
      "inherits": "npm:inherits@2.0.3",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
    },
    "npm:history@3.2.1": {
      "invariant": "npm:invariant@2.2.2",
      "loose-envify": "npm:loose-envify@1.3.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "query-string": "npm:query-string@4.2.3",
      "warning": "npm:warning@3.0.0"
    },
    "npm:hmac-drbg@1.0.1": {
      "hash.js": "npm:hash.js@1.1.3",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:iconv-lite@0.4.18": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:inherits@2.0.3": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:inline-style-prefixer@2.0.5": {
      "bowser": "npm:bowser@1.7.3",
      "hyphenate-style-name": "npm:hyphenate-style-name@1.0.2"
    },
    "npm:inline-style-prefixer@3.0.7": {
      "bowser": "npm:bowser@1.7.3",
      "css-in-js-utils": "npm:css-in-js-utils@1.0.3",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:invariant@2.2.2": {
      "loose-envify": "npm:loose-envify@1.3.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:isomorphic-fetch@2.2.1": {
      "node-fetch": "npm:node-fetch@1.7.2",
      "whatwg-fetch": "npm:whatwg-fetch@2.0.3"
    },
    "npm:lodash.merge@4.6.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.throttle@4.1.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:loose-envify@1.3.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "js-tokens": "npm:js-tokens@3.0.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:material-ui@0.15.4": {
      "inline-style-prefixer": "npm:inline-style-prefixer@2.0.5",
      "keycode": "npm:keycode@2.1.9",
      "lodash": "npm:lodash@4.17.4",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.6.1",
      "react-addons-create-fragment": "npm:react-addons-create-fragment@15.4.1",
      "react-addons-transition-group": "npm:react-addons-transition-group@15.4.2",
      "react-dom": "npm:react-dom@15.6.1",
      "react-event-listener": "npm:react-event-listener@0.2.1",
      "react-tap-event-plugin": "npm:react-tap-event-plugin@1.0.0",
      "recompose": "npm:recompose@0.20.2",
      "simple-assign": "npm:simple-assign@0.1.0",
      "warning": "npm:warning@3.0.0"
    },
    "npm:material-ui@0.18.7": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "inline-style-prefixer": "npm:inline-style-prefixer@3.0.7",
      "keycode": "npm:keycode@2.1.9",
      "lodash.merge": "npm:lodash.merge@4.6.0",
      "lodash.throttle": "npm:lodash.throttle@4.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1",
      "react-dom": "npm:react-dom@15.6.1",
      "react-event-listener": "npm:react-event-listener@0.4.5",
      "react-tap-event-plugin": "npm:react-tap-event-plugin@2.0.1",
      "react-transition-group": "npm:react-transition-group@1.2.0",
      "recompose": "npm:recompose@0.24.0",
      "simple-assign": "npm:simple-assign@0.1.0",
      "warning": "npm:warning@3.0.0"
    },
    "npm:md5.js@1.3.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "hash-base": "npm:hash-base@3.0.4",
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:miller-rabin@4.0.0": {
      "bn.js": "npm:bn.js@4.11.8",
      "brorand": "npm:brorand@1.1.0"
    },
    "npm:node-fetch@1.7.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "encoding": "npm:encoding@0.1.12",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "is-stream": "npm:is-stream@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "zlib": "github:jspm/nodelibs-zlib@0.1.0"
    },
    "npm:paho-mqtt@1.0.3": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:pako@0.2.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:parse-asn1@5.1.0": {
      "asn1.js": "npm:asn1.js@4.9.1",
      "browserify-aes": "npm:browserify-aes@1.0.6",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "create-hash": "npm:create-hash@1.1.3",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.2",
      "pbkdf2": "npm:pbkdf2@3.0.13",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:pbkdf2@3.0.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "create-hash": "npm:create-hash@1.1.3",
      "create-hmac": "npm:create-hmac@1.1.6",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "ripemd160": "npm:ripemd160@2.0.1",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "sha.js": "npm:sha.js@2.4.8"
    },
    "npm:performance-now@2.1.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process-nextick-args@1.0.7": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.10": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:promise@7.3.1": {
      "asap": "npm:asap@2.0.6",
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:prop-types@15.5.10": {
      "fbjs": "npm:fbjs@0.8.14",
      "loose-envify": "npm:loose-envify@1.3.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:public-encrypt@4.0.0": {
      "bn.js": "npm:bn.js@4.11.8",
      "browserify-rsa": "npm:browserify-rsa@4.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "create-hash": "npm:create-hash@1.1.3",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "parse-asn1": "npm:parse-asn1@5.1.0",
      "randombytes": "npm:randombytes@2.0.5"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:query-string@4.2.3": {
      "object-assign": "npm:object-assign@4.1.1",
      "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
    },
    "npm:raf@3.3.2": {
      "performance-now": "npm:performance-now@2.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:randombytes@2.0.5": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "safe-buffer": "npm:safe-buffer@5.1.1"
    },
    "npm:react-addons-create-fragment@15.4.1": {
      "react": "npm:react@15.6.1"
    },
    "npm:react-addons-transition-group@15.4.2": {
      "fbjs": "npm:fbjs@0.8.14",
      "object-assign": "npm:object-assign@4.1.1",
      "react": "npm:react@15.6.1"
    },
    "npm:react-dom@15.6.1": {
      "fbjs": "npm:fbjs@0.8.14",
      "loose-envify": "npm:loose-envify@1.3.1",
      "object-assign": "npm:object-assign@4.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1"
    },
    "npm:react-event-listener@0.2.1": {
      "fbjs": "npm:fbjs@0.8.14"
    },
    "npm:react-event-listener@0.4.5": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "fbjs": "npm:fbjs@0.8.14",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1",
      "warning": "npm:warning@3.0.0"
    },
    "npm:react-flexbox-grid@1.0.2": {
      "flexboxgrid": "npm:flexboxgrid@6.3.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.6.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:react-real-time-chart@0.0.5": {
      "babel-polyfill": "npm:babel-polyfill@6.23.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "c3": "npm:c3@0.4.11",
      "deepmerge": "npm:deepmerge@0.2.10",
      "filter-react-dom-props": "npm:filter-react-dom-props@0.0.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:react-redux@5.0.1": {
      "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
      "invariant": "npm:invariant@2.2.2",
      "lodash": "npm:lodash@4.17.4",
      "lodash-es": "npm:lodash-es@4.17.3",
      "loose-envify": "npm:loose-envify@1.3.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.6.1",
      "redux": "npm:redux@3.6.0"
    },
    "npm:react-resize-detector@0.3.3": {
      "react": "npm:react@15.6.1"
    },
    "npm:react-resize-detector@0.4.1": {
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1"
    },
    "npm:react-router@3.0.0": {
      "history": "npm:history@3.2.1",
      "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
      "invariant": "npm:invariant@2.2.2",
      "loose-envify": "npm:loose-envify@1.3.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.6.1",
      "warning": "npm:warning@3.0.0"
    },
    "npm:react-smooth@0.1.20": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "lodash": "npm:lodash@4.17.4",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "raf": "npm:raf@3.3.2",
      "react": "npm:react@15.6.1",
      "react-addons-transition-group": "npm:react-addons-transition-group@15.4.2",
      "react-dom": "npm:react-dom@15.6.1"
    },
    "npm:react-smooth@0.3.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "lodash": "npm:lodash@4.17.4",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "prop-types": "npm:prop-types@15.5.10",
      "raf": "npm:raf@3.3.2",
      "react": "npm:react@15.6.1",
      "react-dom": "npm:react-dom@15.6.1",
      "react-transition-group": "npm:react-transition-group@1.2.0"
    },
    "npm:react-tap-event-plugin@1.0.0": {
      "fbjs": "npm:fbjs@0.2.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.6.1"
    },
    "npm:react-tap-event-plugin@2.0.1": {
      "fbjs": "npm:fbjs@0.8.14",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.6.1",
      "react-dom": "npm:react-dom@15.6.1"
    },
    "npm:react-transition-group@1.2.0": {
      "chain-function": "npm:chain-function@1.0.0",
      "dom-helpers": "npm:dom-helpers@3.2.1",
      "loose-envify": "npm:loose-envify@1.3.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1",
      "react-dom": "npm:react-dom@15.6.1",
      "warning": "npm:warning@3.0.0"
    },
    "npm:react@15.6.1": {
      "create-react-class": "npm:create-react-class@15.6.0",
      "fbjs": "npm:fbjs@0.8.14",
      "loose-envify": "npm:loose-envify@1.3.1",
      "object-assign": "npm:object-assign@4.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "prop-types": "npm:prop-types@15.5.10"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:readable-stream@2.3.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "process-nextick-args": "npm:process-nextick-args@1.0.7",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "npm:string_decoder@1.0.3",
      "util-deprecate": "npm:util-deprecate@1.0.2"
    },
    "npm:recharts@0.21.2": {
      "classnames": "npm:classnames@2.2.5",
      "core-js": "npm:core-js@2.4.1",
      "d3-scale": "npm:d3-scale@1.0.4",
      "d3-shape": "npm:d3-shape@1.0.4",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "lodash": "npm:lodash@4.17.4",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.6.1",
      "react-addons-transition-group": "npm:react-addons-transition-group@15.4.2",
      "react-resize-detector": "npm:react-resize-detector@0.3.3",
      "react-smooth": "npm:react-smooth@0.1.20",
      "recharts-scale": "npm:recharts-scale@0.3.0",
      "reduce-css-calc": "npm:reduce-css-calc@1.3.0"
    },
    "npm:recharts@0.22.4": {
      "classnames": "npm:classnames@2.2.5",
      "core-js": "npm:core-js@2.4.1",
      "d3-scale": "npm:d3-scale@1.0.4",
      "d3-shape": "npm:d3-shape@1.0.4",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "lodash": "npm:lodash@4.17.4",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "prop-types": "npm:prop-types@15.5.10",
      "react": "npm:react@15.6.1",
      "react-resize-detector": "npm:react-resize-detector@0.4.1",
      "react-smooth": "npm:react-smooth@0.3.0",
      "react-transition-group": "npm:react-transition-group@1.2.0",
      "recharts-scale": "npm:recharts-scale@0.3.0",
      "reduce-css-calc": "npm:reduce-css-calc@1.3.0"
    },
    "npm:recompose@0.20.2": {
      "change-emitter": "npm:change-emitter@0.1.6",
      "fbjs": "npm:fbjs@0.8.14",
      "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.6.1",
      "symbol-observable": "npm:symbol-observable@0.2.4"
    },
    "npm:recompose@0.24.0": {
      "change-emitter": "npm:change-emitter@0.1.6",
      "fbjs": "npm:fbjs@0.8.14",
      "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.6.1",
      "symbol-observable": "npm:symbol-observable@1.0.4"
    },
    "npm:reduce-css-calc@1.3.0": {
      "balanced-match": "npm:balanced-match@0.4.2",
      "math-expression-evaluator": "npm:math-expression-evaluator@1.2.17",
      "reduce-function-call": "npm:reduce-function-call@1.0.2"
    },
    "npm:reduce-function-call@1.0.2": {
      "balanced-match": "npm:balanced-match@0.4.2"
    },
    "npm:redux-actions@1.2.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "invariant": "npm:invariant@2.2.2",
      "lodash": "npm:lodash@4.17.4",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "reduce-reducers": "npm:reduce-reducers@0.1.2"
    },
    "npm:redux-immutable@3.0.9": {
      "immutable": "npm:immutable@3.8.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:redux@3.6.0": {
      "lodash": "npm:lodash@4.17.4",
      "lodash-es": "npm:lodash-es@4.17.3",
      "loose-envify": "npm:loose-envify@1.3.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "symbol-observable": "npm:symbol-observable@1.0.4"
    },
    "npm:regenerator-runtime@0.10.5": {
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:regenerator-runtime@0.11.0": {
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:ripemd160@2.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "hash-base": "npm:hash-base@2.0.2",
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:safe-buffer@5.1.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:setimmediate@1.0.5": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:sha.js@2.4.8": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:shortid@2.2.8": {
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:string_decoder@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "safe-buffer": "npm:safe-buffer@5.1.1"
    },
    "npm:ua-parser-js@0.7.14": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util-deprecate@1.0.2": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:uuid@3.0.1": {
      "crypto": "github:jspm/nodelibs-crypto@0.1.0"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:warning@3.0.0": {
      "loose-envify": "npm:loose-envify@1.3.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
