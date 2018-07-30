import rectangle from '../../assets/rectangle.png';
import ellipse from '../../assets/ellipse.png';
import rhombus from '../../assets/rhombus.png';
import delete2 from '../../assets/delete2.png';
import navigatePlus from '../../assets/navigatePlus.png';
import navigateMinus from '../../assets/navigateMinus.png';
import Request from '../../utils/Request';
import { SERVER_IP_RULE1 } from '../../constants/Settings';

const mxgraph = require('mxgraph')({
  mxImageBasePath: './src/images',
  mxBasePath: './src',
});

export let ruleGraphXmlParseData = {};
export let ruleGraphXmlupdateParseData = {};
export let graph = null;
export let toolbar = null;

let isSearch = false;
let searchToolBarData = null;
let isInput = false;
// 动态设定toolBarName的宽度
const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
const reSize = function () {
  if (document.getElementById('toolBox') && document.getElementById('toobarName')) {
    const toolBox = document.getElementById('toolBox');
    const toobarNameBox = document.getElementById('toobarName');
    const toolBoxWidth = toolBox.clientWidth;
    toobarNameBox.style.width = `${toolBoxWidth - 42}px`;
  }
};
window.addEventListener(resizeEvent, reSize, false);
document.addEventListener('DOMContentLoaded', reSize, false);


// 增加左侧工具栏
function addToolbarItem(graph, toolbar, prototype, image, dropCallback, title) {
  const funct = function (graph, evt, cell) {
    graph.stopEditing(false);
    const pt = graph.getPointForEvent(evt);
    const vertex = graph.getModel().cloneCell(prototype);
    vertex.geometry.x = pt.x;
    vertex.geometry.y = pt.y;
    graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
  };
  // Creates the image which is used as the drag icon (preview)
  const img = toolbar.addMode(title, image, funct);
  mxgraph.mxUtils.makeDraggable(img, graph, funct);
}
// 左侧toolBar增加元素
const addVertex = function (content, icon, w, h, style, title) {
  const vertex = new mxgraph.mxCell(content, new mxgraph.mxGeometry(0, 0, w, h), style);
  vertex.setVertex(true);
  addToolbarItem(graph, toolbar, vertex, icon, dropCallback, title);
};
// 初始画面
function addGraphModel(graph, graphData) {
  const parent = graph.getDefaultParent();
  graph.getModel().beginUpdate();
  try {
    if (graphData) {
      const paramIdObj = {};
      if (graphData[0].nodeList.length > 0) {
        graphData[0].nodeList.map((v, i) => {
          if (v.name === 'Start') {
            paramIdObj[v.graphId] = graph.insertVertex(parent, null, v.name, v.x, v.y, v.width, v.height, 'nodeId=1;type=ROUTE;shape=ellipse;fillColor=yellowGreen;strokeColor=green');
          } else if (v.name === 'End') {
            paramIdObj[v.graphId] = graph.insertVertex(parent, null, v.name, v.x, v.y, v.width, v.height, 'nodeId=2;type=ROUTE;shape=ellipse;fillColor=red;strokeColor=#660d0d');
          } else if (v.type === 'RULE') {
            paramIdObj[v.graphId] = graph.insertVertex(parent, null, v.name, v.x, v.y, v.width, v.height, `nodeId=${v.nodeId};type=${v.type};fillColor=#66aef4;strokeColor=#4a96e1`);
          } else {
            paramIdObj[v.graphId] = graph.insertVertex(parent, null, v.name, v.x, v.y, v.width, v.height, `nodeId=${v.nodeId};type=${v.type}`);
          }
          return null;
        });
      }
      if (graphData[0].edgeList.length) {
        graphData[0].edgeList.map((v, i) => {
          graph.insertEdge(parent, null, v.condition, paramIdObj[v.sourceId], paramIdObj[v.destId]);
          return null;
        });
      }
    }
  } finally {
    graph.getModel().endUpdate();
  }
}

// 解析XML文件
function parseXml(xml) {
  const xmll = `<?xml version="1.0" encoding="gb2312"?>${xml}`;
  const parser = new DOMParser();
  const xmlDom = parser.parseFromString(xmll, 'text/xml');
  const mxCell = xmlDom.getElementsByTagName('mxCell');
  const nodeList = [];
  const edgeList = [];
  for (let i = 2; i < mxCell.length; i++) {
    const node = {};
    const edge = {};
    const attributes = mxCell[i].attributes;
    if (!attributes.edge) {
      const attrStyleValue = attributes.style.nodeValue;
      node.style = attributes.style.nodeValue;
      const attrStyleValueArr = attrStyleValue.split(';');
      node.nodeId = attrStyleValueArr[0].substring(attrStyleValueArr[0].indexOf('=') + 1);
      node.type = attrStyleValueArr[1].substring(attrStyleValueArr[1].indexOf('=') + 1);
      node.graphId = mxCell[i].attributes.id.nodeValue;
      const childNodeAttr = mxCell[i].childNodes[0].attributes;
      node.x = childNodeAttr.x.nodeValue;
      node.y = childNodeAttr.y.nodeValue;
      node.width = childNodeAttr.width.nodeValue;
      node.height = childNodeAttr.height.nodeValue;
      nodeList.push(node);
    } else if (attributes.source && attributes.target) {
      edge.sourceId = attributes.source.nodeValue;
      edge.destId = attributes.target.nodeValue;
      edge.condition = '';
      if (attributes.value) {
        edge.condition = attributes.value.nodeValue;
      }
      edgeList.push(edge);
    }
  }
  const dataList = { nodeList, edgeList };
  return dataList;
}

function mxVertexToolHandler(state) {
  mxgraph.mxVertexHandler.apply(this, arguments);
}

// 获取xml文件
const dropCallback = mxgraph.mxUtils.getPrettyXml = function (graph) {
  const enc = new mxgraph.mxCodec();
  return enc.encode(graph.getModel());
};

mxVertexToolHandler.prototype = new mxgraph.mxVertexHandler();
mxVertexToolHandler.prototype.constructor = mxVertexToolHandler;

mxVertexToolHandler.prototype.domNode = null;

mxVertexToolHandler.prototype.init = function () {
  mxgraph.mxVertexHandler.prototype.init.apply(this, arguments);
  this.domNode = document.createElement('div');
  this.domNode.style.position = 'absolute';
  this.domNode.style.whiteSpace = 'nowrap';
  function createImage(src)	{
    if (mxgraph.mxClient.IS_IE && !mxgraph.mxClient.IS_SVG)	{
      const img = document.createElement('div');
      img.style.backgroundImage = `url(${src})`;
      img.style.backgroundPosition = 'center';
      img.style.backgroundRepeat = 'no-repeat';
      img.style.display = (mxgraph.mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';

      return img;
    }

    return mxgraph.mxUtils.createImage(src);
  }
};

// main为主画图
function main(container, tbContainers, graphData) {
  if (container && tbContainers) {
    const graphDiv = container;
    graphDiv.innerHTML = '';
    // 禁用浏览器自带右键菜单
    mxgraph.mxEvent.disableContextMenu(container);
  }
  if (!mxgraph.mxClient.isBrowserSupported()) {
    mxgraph.mxUtils.error('Browser is not supported!', 200, false);
  } else {
    graph = new mxgraph.mxGraph(container);
    graph.setConnectable(true);
    graph.setMultigraph(false);

    // 启用工具提示信息。
    graph.setTooltips(true);  // no effect，默认值是false
    // 当鼠标滑动到Cell时，高亮显示。
    new mxgraph.mxCellTracker(graph);
    // 移动或者创建Cell时，显示标尺。
    mxgraph.mxGraphHandler.prototype.guidesEnabled = true;
    // 禁止移动连线上的Label。
    graph.edgeLabelsMovable = false;
    // 禁止edge的移动脱离节点
    mxgraph.mxGraph.prototype.disconnectOnMove = false;

    // const style = graph.getStylesheet().getDefaultEdgeStyle();
    // 连接线的拐弯处使用圆角，默认为直角。
    // style[mxgraph.mxConstants.STYLE_ROUNDED] = true;
    // 使用弯曲连接线，默认为直线。
    // style[mxgraph.mxConstants.STYLE_EDGE] = mxgraph.mxEdgeStyle.ElbowConnector;
    // 默认的连接线为水平连接，双击该连接线的主控点（连接线中间的关键点）时变为垂直连接。只有连接线为弯曲线时才有效。
    // graph.alternateEdgeStyle = 'elbow=vertical';   // no effect

// 两条以上平行线错开
    const layout = new mxgraph.mxParallelEdgeLayout(graph);
    const layoutMgr = new mxgraph.mxLayoutManager(graph);
    layoutMgr.getLayout = function (cell) {
      if (cell.getChildCount() > 0) {
        return layout;
      }
    };
    // 禁止双击后对cell(vertex和edge)编辑
    graph.isCellEditable = function (cell) {
      return !this.getModel().isEdge(cell) && !this.getModel().isVertex(cell);
    };
// 画布有操作，执行函数
    graph.createHandler = function (state) {
      const model = graph.getModel();
    // 右键执行编辑、删除操作
      graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
        if (model.isVertex(cell) || model.isEdge(cell)) {
          if (model.isEdge(cell)) {
            const submenu1 = menu.addItem('编辑', null, null);
            menu.addItem('PASS', null, () => {
              cell.setValue('PASS');
              graph.refresh();
              // 重新获取最新的xml文件
              const xml = dropCallback(graph);
              if (xml) {
                const updateData = parseXml(xml.innerHTML);
                ruleGraphXmlParseData = updateData;
                ruleGraphXmlupdateParseData = updateData;
              }
              mxgraph.mxEvent.consume(evt);
            }, submenu1);
            menu.addItem('REPAIR', null, () => {
              cell.setValue('REPAIR');
              graph.refresh();
              // 重新获取最新的xml文件
              const xml = dropCallback(graph);
              if (xml) {
                const updateData = parseXml(xml.innerHTML);
                ruleGraphXmlParseData = updateData;
                ruleGraphXmlupdateParseData = updateData;
              }
              mxgraph.mxEvent.consume(evt);
            }, submenu1);
            menu.addItem('PACKING', null, () => {
              cell.setValue('PACKING');
              graph.refresh();
              // 重新获取最新的xml文件
              const xml = dropCallback(graph);
              if (xml) {
                const updateData = parseXml(xml.innerHTML);
                ruleGraphXmlParseData = updateData;
                ruleGraphXmlupdateParseData = updateData;
              }
              mxgraph.mxEvent.consume(evt);
            }, submenu1);
            menu.addItem('OK', null, () => {
              cell.setValue('OK');
              graph.refresh();
              // 重新获取最新的xml文件
              const xml = dropCallback(graph);
              if (xml) {
                const updateData = parseXml(xml.innerHTML);
                ruleGraphXmlParseData = updateData;
                ruleGraphXmlupdateParseData = updateData;
              }
              mxgraph.mxEvent.consume(evt);
            }, submenu1);
            menu.addItem('NG', null, () => {
              cell.setValue('NG');
              graph.refresh();
              // 重新获取最新的xml文件
              const xml = dropCallback(graph);
              if (xml) {
                const updateData = parseXml(xml.innerHTML);
                ruleGraphXmlParseData = updateData;
                ruleGraphXmlupdateParseData = updateData;
              }
              mxgraph.mxEvent.consume(evt);
            }, submenu1);
            menu.addItem('CANCEL', null, () => {
              cell.setValue('CANCEL');
              graph.refresh();
              // 重新获取最新的xml文件
              const xml = dropCallback(graph);
              if (xml) {
                const updateData = parseXml(xml.innerHTML);
                ruleGraphXmlParseData = updateData;
                ruleGraphXmlupdateParseData = updateData;
              }
              mxgraph.mxEvent.consume(evt);
            }, submenu1);
          } else {
            menu.addItem('编辑', null, () => {
              alert('编辑');
            });
            menu.addSeparator();
          }
          menu.addItem('删除', null, () => {
            graph.removeCells(graph.getSelectionCells());
            // 删除节点重新获取最新的xml文件
            const xml = dropCallback(graph);
            if (xml) {
              const updateData = parseXml(xml.innerHTML);
              ruleGraphXmlParseData = updateData;
              ruleGraphXmlupdateParseData = updateData;
            }
            mxgraph.mxEvent.consume(evt);
          });
        }
      };

      // Delete键执行删除操作
      const keyHandler = new mxgraph.mxKeyHandler(graph); // 允许键盘操作
      keyHandler.bindKey(46, (evt) => {
        if (graph.isEnabled()) {
          graph.removeCells(graph.getSelectionCells());
          // 删除节点重新获取最新的xml文件
          const xml = dropCallback(graph);
          if (xml) {
            const updateData = parseXml(xml.innerHTML);
            ruleGraphXmlParseData = updateData;
            ruleGraphXmlupdateParseData = updateData;
          }
          mxgraph.mxEvent.consume(evt);
        }
      });
      console.log('11111222', dropCallback(graph));
      const xml = dropCallback(graph);
      if (xml) {
        const addData = parseXml(xml.innerHTML);
        ruleGraphXmlParseData = addData;
        ruleGraphXmlupdateParseData = addData;
      }
      if (state != null && this.model.isVertex(state.cell)) {
        return new mxVertexToolHandler(state);
      }
      return mxgraph.mxGraph.prototype.createHandler.apply(this, arguments);
    };
    new mxgraph.mxRubberband(graph);
// 监听点击事件，获取最新的xml文件数据
    mxgraph.mxEvent.addListener(document, 'click', (evt) => {
      const xml = dropCallback(graph);
      if (xml) {
        const updateData = parseXml(xml.innerHTML);
        ruleGraphXmlParseData = updateData;
        ruleGraphXmlupdateParseData = updateData;
      }
    });
// 增加初始化画面
    if (graphData) {
      addGraphModel(graph, graphData);
    }
  }
}
// toolbar title click
const routingTitleClick = (titleParam, barBoxParam, nameBoxParam) => {
  const title = titleParam,
    barBox = barBoxParam,
    nameBox = nameBoxParam;
  const NameState = nameBox.lastElementChild.style.display;
  const toolBarState = barBox.style.display;
  if (NameState === 'none' && toolBarState === 'none') {
    nameBox.lastElementChild.style.display = 'block';
    barBox.style.display = 'block';
    title.innerHTML = '<strong>∧</strong>';
  } else {
    nameBox.lastElementChild.style.display = 'none';
    barBox.style.display = 'none';
    title.innerHTML = '<strong>∨</strong>';
  }
};
// 规则设定左侧栏
const addVertexInit = (addVertextFunc, ruleListData, toolbarName, toolBarDiv, startEnd) => {
  if (toolbarName && toolBarDiv) {
    const toobarDiv = toolBarDiv;
    const toolbarNameDiv = toolbarName;
    toobarDiv.innerHTML = '';
    toolbarNameDiv.innerHTML = '';
    if (startEnd) {
      const tbContainer = document.createElement('div');
      tbContainer.style.overflow = 'hidden';
      tbContainer.setAttribute('class', 'toolbarStartEnd');
      if (toolBarDiv) {
        toolBarDiv.appendChild(tbContainer);
      }
      toolbar = new mxgraph.mxToolbar(tbContainer);
      toolbar.enabled = false;
      addVertextFunc('Start', ellipse, 40, 40, 'nodeId=1;type=ROUTE;shape=ellipse;fillColor=yellowGreen;strokeColor=green');
      if (toolbarName) {
        const div = document.createElement('div');
        div.setAttribute('class', 'toolBarNameStartEnd');
        div.innerHTML = 'start';
        toolbarName.appendChild(div);
      }
      addVertextFunc('End', ellipse, 40, 40, 'nodeId=2;type=ROUTE;shape=ellipse;fillColor=red;strokeColor=#660d0d');
      if (toolbarName) {
        const div = document.createElement('div');
        div.setAttribute('class', 'toolBarNameStartEnd');
        div.innerHTML = 'end';
        toolbarName.appendChild(div);
      }
    }


    if (ruleListData.length > 0) {
      const toolBarNameBox = document.createElement('div');
      toolBarNameBox.setAttribute('class', 'toolBarNameBox');
      toolBarNameBox.setAttribute('id', 'toolBarNameBox');
      const toolBarNameTitle = document.createElement('a');
      toolBarNameTitle.setAttribute('class', 'ruleTitle');
      toolBarNameTitle.innerHTML = '<strong>∨</strong>';
      toolBarNameBox.appendChild(toolBarNameTitle);
      const toolBarNameContent = document.createElement('div');
      toolBarNameBox.appendChild(toolBarNameContent);
      const toolBarBox = document.createElement('div');
      const toolBarBoxTitle = document.createElement('a');
      toolBarBoxTitle.setAttribute('class', 'ruleTitle');
      toolBarBoxTitle.innerHTML = '规则';
      toolBarBox.appendChild(toolBarBoxTitle);
      const toolBarContent = document.createElement('div');
      toolBarContent.setAttribute('id', 'toolBarContent');
      toolBarBox.appendChild(toolBarContent);
      toolBarDiv.appendChild(toolBarBox);
      toolbar = new mxgraph.mxToolbar(toolBarContent);
      toolbar.enabled = false;
      ruleListData.map((v, i) => {
        const div = document.createElement('div');
        div.innerHTML = `${v.name}`;
        let byteLen = 0;
        for (let i = 0; i < v.name.length; i++) {
          byteLen += v.name.charCodeAt(i) > 255 ? 2 : 1;
        }
        const width = byteLen * 7;
        if (width > 80) {
          addVertextFunc(v.name, rectangle, width, 30, `nodeId=${v.id};type=RULE;fillColor=#66aef4;strokeColor=#4a96e1`, v.name);
        } else {
          addVertextFunc(v.name, rectangle, 80, 30, `nodeId=${v.id};type=RULE;fillColor=#66aef4;strokeColor=#4a96e1`, v.name);
        }
        if (toolbarName) {
          toolBarNameContent.appendChild(div);
        }
        return null;
      });
      toolbarName.appendChild(toolBarNameBox);
      const barBox = document.getElementById('toolBarContent');
      const nameBox = document.getElementById('toolBarNameBox');
      nameBox.lastElementChild.style.display = 'none';
      barBox.style.display = 'none';
      toolBarBoxTitle.addEventListener('click', (e) => {
        routingTitleClick(toolBarNameTitle, barBox, nameBox);
      }, false);
      toolBarNameTitle.addEventListener('click', (e) => {
        routingTitleClick(toolBarNameTitle, barBox, nameBox);
      }, false);
    }
  }
};

const showDataList = (ruleShowState) => {
  const ruleBarBox = document.getElementById('toolBarContent');
  const ruleNameBox = document.getElementById('toolBarNameBox');
  if (ruleBarBox && ruleNameBox) {
    ruleNameBox.lastElementChild.style.display = ruleShowState;
    ruleBarBox.style.display = ruleShowState;
  }
};

const searchDataFunc = (e) => {
  isSearch = true;
  const name = document.getElementById('input').value;
  let url = `${SERVER_IP_RULE1}/ams/routing/select?type=2`;
  isInput = false;
  if (name !== '') {
    url = `${SERVER_IP_RULE1}/ams/routing/select?name=${name}&type=2`;
    isInput = true;
  }
  const callback = (response) => {
    if (response.code === 0) {
      const searchData = response.rows[0];
      searchToolBarData = searchData;
      if (name === '') {
        addVertexInit(addVertex, searchData.rule, document.getElementById('toobarName'), document.getElementById('toolbar'), true);
      } else {
        addVertexInit(addVertex, searchData.rule, document.getElementById('toobarName'), document.getElementById('toolbar'), false);
      }
      showDataList('block');
    }
  };
  Request({
    url,
    callback,
  });
};

const graphFunc = (graphData, toolbarData) => {
  main(document.getElementById('graph'), document.getElementById('toolbar'), graphData);
  const ruleBox = document.getElementById('toolBarContent');
  let ruleShowState = 'none';
  if (ruleBox) {
    ruleShowState = ruleBox.style.display;
  }
  if (isSearch) {
    if (isInput) {
      addVertexInit(addVertex, searchToolBarData.rule, document.getElementById('toobarName'), document.getElementById('toolbar'), false);
    } else {
      addVertexInit(addVertex, searchToolBarData.rule, document.getElementById('toobarName'), document.getElementById('toolbar'), true);
    }
  } else {
    addVertexInit(addVertex, toolbarData.rule, document.getElementById('toobarName'), document.getElementById('toolbar'), true);
  }
  showDataList(ruleShowState);
};

export { main, addVertexInit, addVertex, reSize, searchDataFunc, graphFunc };
