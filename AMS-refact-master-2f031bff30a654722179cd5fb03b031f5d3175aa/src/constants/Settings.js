// import _ from 'lodash';
// --------------------- Filter ---------------------
const filters = [null, '', undefined, 'Invalid date', '-1', 'null', 'undefined'];
const isObject = obj => typeof obj === 'object' && obj !== null;
const isArray = obj => Array.isArray(obj);
export const dataHandler = (value) => {
  const data = value;
  if (isArray(data)) {
    data.map(item => dataHandler(item, filters));
  } else if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      data[key] = dataHandler(data[key], filters);
      filters.forEach((filter) => {
        if (data[key] === filter) delete data[key];
      });
    });
  }
  return data;
};
export const number2String = (value) => {
  const data = value;
  if (isArray(data) || isObject(data)) {
    return data;
  }
  if (data === 0) {
    return `${data}`;
  }
  return data ? `${data}` : '';
};
// 去重
export const unique = (arr) => {
  const uniqueObj = {};
  let returnArr = [];
  arr.forEach((item) => {
    uniqueObj[JSON.stringify(item)] = item;// 键名不会重复
  });
  returnArr = Object.keys(uniqueObj).map(u =>
  // Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
  JSON.parse(u));
  return returnArr;
};
// checkbox函数
export const checkBoxUnique = (arr) => {
  const uniqueObj = {};
  let returnArr = [];
  arr.forEach((item) => {
    if (!uniqueObj[JSON.stringify(item)]) {
      uniqueObj[JSON.stringify(item)] = item;// 键名不会重复
    } else {
      delete uniqueObj[JSON.stringify(item)];
    }
  });
  returnArr = Object.keys(uniqueObj).map(u =>
  // Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
  JSON.parse(u));
  return returnArr;
};

// ---------------------- Cookie ---------------------
export const setCookie = (name, value, Days = 10) => {
  const exp = new Date();
  exp.setTime(exp.getTime() + (Days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
};

export const getCookie = (name) => {
  let arr = null;
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  }
  return null;
};

// --------------------- Request ---------------------
export const defaultGetParamTemplate = (param) => {
  const {
    sort = undefined,
    size = 10,
    current = 1,
    ...data1 } = param;
  const data = dataHandler(data1);
  let handledData = [];
  if (typeof data === 'object' && data !== null) {
    handledData = Object.keys(data).map(itemName => ({
      column: itemName,
      value: data[itemName],
      opt: '=',
      relation: 'AND',
    }));
  } else if (data) {
    handledData = [data];
  }
  return {
    condition: handledData,
    sort: sort ? [sort] : [],
    page: { size, current },
  };
};

// EQM get请求中的ParamTemplate
export const EQMParamTemplate = (param) => {
  const {
    size = 10,
    current = 1,
    ...data1 } = param;
  const data = dataHandler(data1);
  const condition = { ...data };
  return { condition, size, current };
};
// EQM Add post请求中的Templete
export const EQMAddPostDataTemplate = (param) => {
  const { ...data } = param;
  const data1 = dataHandler(data);
  const createBy = 'Admin';
  const dataMerge = { createBy, ...data1 };
  const dataStr1 = JSON.stringify(dataMerge);
  const dataStr = `${dataStr1}`;
  return {
    mode: 'AddNew',
    value: dataStr || {},
  };
};
// EQM Update put请求中的Templete
export const EQMUpdatePutDataTemplate = (param) => {
  const { ...data } = param;
  const data1 = dataHandler(data);
  const lastUpdateBy = 'Admin';
  const dataMerge = { lastUpdateBy, ...data1 };
  const dataStr1 = JSON.stringify(dataMerge);
  const dataStr = `${dataStr1}`;
  return {
    mode: 'AddNew',
    value: dataStr || {},
  };
};

// EQM Update put请求中的Templete(不使用dataHandler)
export const EQMUpdatePutDataTemplate2 = (param) => {
  const { ...data } = param;
  // const data1 = dataHandler(data);
  const lastUpdateBy = 'Admin';
  const dataMerge = { lastUpdateBy, ...data };
  const dataStr1 = JSON.stringify(dataMerge);
  const dataStr = `${dataStr1}`;
  return {
    mode: 'AddNew',
    value: dataStr || {},
  };
};

// EQM post请求中的带有上传文件dataTemplate
export const EQMPostFileDataTemplate = files => ((param) => {
  // const { ...data } = param;
  const data = { ...param, createBy: 'Admin' };
  const len = files.length;
  const data1 = dataHandler(data);
  // 将对应文件属性由名称转化为base64数据
  // for (let i = 0; i < len; i + 1) {
  //   data1[files[i]] = data1[`${files[i]}-files`];
  //   delete data1[`${files[i]}-files`];
  // }
  if (len === 1) {
    data1[files[0]] = data1[`${files[0]}-files`];
    delete data1[`${files[0]}-files`];
  }

  const dataStr1 = JSON.stringify(data1);
  const dataStr = `${dataStr1}`;
  return {
    mode: 'AddNew',
    value: dataStr || {},
  };
  // files.map((file, index) => {
  //   data1[file] = data1[`${file}-files`];
  //   delete data1[`${file}-files`];
  //   if (len === index + 1) {
  //     const dataStr1 = JSON.stringify(data1);
  //     const dataStr = `${dataStr1}`;
  //     return {
  //       mode: 'AddNew',
  //       value: dataStr || {},
  //     };
  //   }
  // });
});
// EQM put带文件上传请求中的dataTemplate
export const EQMPutFileDataTemplate = files => ((param) => {
  // const { ...data } = param;
  const data = { ...param, lastUpdateBy: 'Admin' };
  const len = files.length;
  // const data1 = dataHandler(data);

  // 将对应文件属性由名称转化为base64数据
  if (len === 1) {
    data[files[0]] = data[`${files[0]}-files`];
    delete data[`${files[0]}-files`];
  }

  const dataStr1 = JSON.stringify(data);
  const dataStr = `${dataStr1}`;
  return {
    value: dataStr || {},
  };
});
// EQM show/hide请求中的dataTemplate
export const EQMHideDataParamTemplate = (param) => {
  const { ...data } = { id: param.id, active: 'N', lastUpdateBy: 'admin' };
  const dataStr1 = JSON.stringify(data);
  const dataStr = `${dataStr1}`;
  return {
    value: dataStr || {},
  };
};
export const EQMShowDataParamTemplate = (param) => {
  const { ...data } = { id: param.id, active: 'Y', lastUpdateBy: 'admin' };
  const dataStr1 = JSON.stringify(data);
  const dataStr = `${dataStr1}`;
  return {
    value: dataStr || {},
  };
};

export const defaultGetParamTemplate2 = (param) => {
  const {
    sort = undefined,
    size = 10,
    current = 1,
    ...data } = param;
  return {
    condition: data ? [data] : [],
    sort: sort ? [sort] : [],
    page: { size, current },
  };
};
export const defaultGetParamTemplateChart = (param) => {
  const { ...data } = param;
  return {
    condition: data || {},
  };
};
export const defaultGetParamTemplate3 = (param) => {
  const {
    size = 10,
    current = 1,
    ...data } = param;
  return {
    condition: data ? [data] : [],
    page: { size, current },
  };
};
// date formate
export const defaultDataTemplate = (data) => {
  if ('startTime' in data) {
    const startTime = data.startTime;
    const t1 = new Date(startTime * 1000);
    const startTimeNew =
      `${t1.getFullYear().toString()}-${
      t1.getMonth() + 1}-${
      t1.getDate()} ${
      t1.getHours()}:${
      t1.getMinutes()}:${
      t1.getSeconds()}`;
    data.startTime = startTimeNew;
  }
  if ('endTime' in data) {
    const endTime = data.endTime;
    const t2 = new Date(endTime * 1000);
    const endTimeNew =
      `${t2.getFullYear().toString()}-${
      t2.getMonth() + 1}-${
      t2.getDate()} ${
      t2.getHours()}:${
      t2.getMinutes()}:${
      t2.getSeconds()}`;
    data.endTime = endTimeNew;
  }
  return data;
};

export const LineBomDataSourceTemplate = param => param.rows.material_list;
export const defaultGetParamTemplateBom = (param) => {
  const {
    sort = undefined,
    size = 10,
    current = 1,
    ...data } = param;
  return {
    condition: data || {},
    sort: sort ? [sort] : [],
    page: { size, current },
  };
};

export const defaultGetParamTemplateBom2 = (param) => {
  const {
    sort = undefined,
    size = 10,
    current = 1,
    ...data1 } = param;
  const data = dataHandler(data1);
  return {
    condition: Object.keys(data).length > 0 ? [data] : [],
    sort: sort ? [sort] : [],
    page: { size, current },
  };
};
export const bomGetParamTemplate = (param) => {
  const {
    sort = undefined,
    size = 10,
    current = 1,
    ...data } = param;
  return {
    condition: data || {},
    sort: sort ? [sort] : [],
    page: { size, current },
  };
};

export const modifyParamTemplate = (param) => {
  const { ...data } = { id: param.id };
  return {
    condition: data ? [data] : [],
  };
};
export const SMMModifyParamTemplate = (param) => {
  const { ...data } = param;
  return {
    value: data ? [data] : [],
  };
};
// export const defaultPostDataTemplate = param => defaultGetParamTemplate(param);
export const defaultPostDataTemplate = (param) => {
  const { ...data } = param;
  const data1 = dataHandler(data);
  const dataStr1 = JSON.stringify(data1);
  const dataStr = `[${dataStr1}]`;
  return {
    mode: 'AddNew',
    value: dataStr || [],
  };
};


export const defaultGetParamTemplateArr = (param) => {
  const { ...data } = param;
  const dataArrs = param.status;
  let dataArr = [];
  if (dataArrs === '0') {
    dataArr = [0, 1, 2, 3, 4, 5];
  } else if (dataArrs === '1') {
    dataArr = [6];
  }
  return {
    condition: [{
      status: dataArr || [],
    }],
  };
};
export const bomPostDataTemplate = (param) => {
  const { ...data } = param;

  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  // const dataStr = [data];
  return {
    value: dataStr || [],
  };
};
export const smmPostDataTemplate = (param) => {
  const { ...data } = param;
  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  // const dataStr = [data];
  return {
    value: dataStr || [],
  };
};
export const LinePostDataTemplate = (param) => {
  const { dataParam, record } = param;
  const { id,
    acquirePatternPath,
    saveLocalPath,
    machineName,
    acquirePatternPathIP,
    saveLocalPathIP,
    machinetypename,
    line_type,
    line_number,
    pc_or_plc,
    } = dataParam;
  const add = `${acquirePatternPath},
  ${saveLocalPath},
  ${machineName},
  ${acquirePatternPathIP},
  ${saveLocalPathIP},
  ${machinetypename},`;
  const add2 = `${record.acquirePatternPath},
  ${record.saveLocalPath},
  ${record.machineName},
  ${record.acquirePatternPathIP},
  ${record.saveLocalPathIP},
  ${record.machinetypename},`;
  if (add === add2) {
    return false;
  }
  const isTrue = machinetypename.indexOf(',');
  const plcData = pc_or_plc === 'PC' ? 0 : 1;
  const machinetypenameData = machinetypename.split(',')[0];
  const pcOrplc = machinetypename.split(',')[1] ? machinetypename.split(',')[1] : plcData;
  const data = {
    id,
    lineType: line_type,
    lineNum: line_number,
    acquirePatternPath,
    saveLocalPath,
    machineName,
    acquirePatternPathIP,
    saveLocalPathIP,
    machinetypename: isTrue ? machinetypenameData : machinetypename,
    pc_or_plc: pcOrplc,
  };
  Object.keys(data).forEach((key) => {
    if (data[key] === '') {
      delete data[key];
    }
  });
  return {
    value: JSON.stringify([data]),
  };
};
export const LineConfigPostDataTemplate = (param) => {
  const { acquirePatternPath,
    saveLocalPath,
    machineName,
    acquirePatternPathIP,
    saveLocalPathIP,
    machinetypename } = param;
  const data = {
    lineType: param.line_type,
    lineNum: param.line_number,
    acquirePatternPath,
    saveLocalPath,
    machineName,
    acquirePatternPathIP,
    saveLocalPathIP,
    machinetypename,
  };
  return {
    value: JSON.stringify([data]) || [],
  };
};
export const LineConfigPostAddMachineDataTemplate2 = param => ({
  value: JSON.stringify([param]) || [],
});
export const LineConfigPostAddMachineDataTemplate3 = (param) => {
  const ids = param.join(',');
  return {
    value: JSON.stringify([{ ids }]) || [],
  };
};
export const LineConfigPostAddMachineDataTemplate = param => ({
  value: JSON.stringify([param]) || [],
});
export const smmWithPageDataTemplate = (param) => {
  const { ...data } = param;
  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  const page = JSON.stringify({ size: 10, current: 1 });
  return {
    value: dataStr || [],
    page,
  };
};
export const addMorePostDataTemplate = (param) => {
  const { ...data } = param;
  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  return {
    mode: 'AddMore',
    value: dataStr || [],
  };
};
export const copyPostDataTemplate = (param) => {
  const { id, ...data } = param;
  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  return {
    mode: 'Copy',
    value: dataStr || [],
  };
};
export const modifyPostDataTemplate = (param) => {
  const { id, ...data } = param;
  const data1 = dataHandler(data);
  const dataStr1 = JSON.stringify(data1);
  const dataStr = `[${dataStr1}]`;
  return {
    mode: 'Modify',
    value: dataStr || [],
  };
};

// ------退料扣账------
export const debitPostDataTemplate = (param) => {
  const { ...data } = param;
  const dataDefaultTable = data.defaultTableData[0];
  const dataTable = data.tableData;
  const workOrder = dataDefaultTable.workOrder;
  const side = dataDefaultTable.side;
  const dataTableNew = [];
  dataTable.map((v) => {
    const aaaa = {
      slot: v.slot,
      material_no: v.material_no,
      demand_qty: v.amount,
      total_qty: v.issue_amount,
    };
    dataTableNew.push(aaaa);
  });
  const [...list] = dataTableNew;
  const dataStr = {
    work_order: workOrder,
    side,
    list,
  };
  const dataStrNew = JSON.stringify(dataStr);
  const dataArr = `[${dataStrNew}]`;
  return {
    value: dataArr || [],
  };
};
// ------备料车解绑------
export const unbindStockPutDataTemplate = (param) => {
  const { ...data } = param;
  const dataTable = data.tableData;
  const dataProps = data.tableProps;
  const record = dataProps.record;
  const workOrder = record.work_order;
  const side = record.side;

  const cars = [];
  dataTable.map((v) => {
    const car = {
      id: v.id,
      car_name: v.car_name,
    };
    cars.push(car);
  });
  const [...list] = cars;
  const dataStr = {
    work_order: workOrder,
    side,
    parts: [{
      id: dataProps.id,
      part: dataProps.part,
      cars,
    }],
  };
  const dataStrNew = JSON.stringify(dataStr);
  const dataArr = `[${dataStrNew}]`;
  return {
    value: dataArr || [],
  };
};
export const defaultPutParamTemplate = (param) => {
  const { ...data } = param;
  return {
    condition: [data],
  };
};

export const SMMHideDataParamTemplate = (param) => {
  const { ...data } = { id: param.id, active: 'N' };
  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  return {
    value: dataStr || [],
  };
};
export const SMMShowDataParamTemplate = (param) => {
  const { ...data } = { id: param.id, active: 'Y' };
  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  return {
    value: dataStr || [],
  };
};
export const defaultDataSourceTemplate = (param) => {
  let dataSource;
  if (Object.prototype.toString.call(param) === '[object Object]') {
    dataSource = param.rows ? param.rows : param;
  } else if (Object.prototype.toString.call(param) === '[object Array]') {
    dataSource = param || [];
    const a = {
      editable: false,
    };
    const dataArry = [];
    (dataSource !== []) ? dataSource.map((v) => {
      if (!v.editable) {
        Object.assign(v, a);
      }
      dataArry.push(v);
      return null;
    }) : [];
    dataSource = [...dataArry];
  }
  return dataSource;
};
// 将rgb格式转换为16进制
export const colorHex = (param) => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  const that = param;
  if (/^(rgb|RGB)/.test(that)) {
    const aColor = that.replace(/(?:||rgb|RGB)*/g, '').split(',');
    let strHex = '#';
    for (let i = 0; i < aColor.length; i++) {
      let aColorItem = aColor[i];
      if (i === 0) {
        aColorItem = aColorItem.substr(1);
      } else if (i === 2) {
        aColorItem = aColorItem.trim();
        aColorItem = aColorItem.substring(0, aColorItem.length - 1);
      }
      let hex = Number(aColorItem).toString(16);
      if (hex === '0') {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = that;
    }
    return strHex;
  } else if (reg.test(that)) {
    const aNum = that.replace(/#/, '').split('');
    if (aNum.length === 6) {
      return that;
    } else if (aNum.length === 3) {
      let numHex = '#';
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i]);
      }
      return numHex;
    }
  } else {
    return that;
  }
  return null;
};
// 将16进制转化为rgb
export const colorRgb = (param) => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  const that = param;
  let sColor = that.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
    }
    return `rgb(${sColorChange.join(',')})`;
  }
  return sColor;
};
// ----------------发料状态查询--------------------------

export const defaultDataSourceTemplateSMMPP = param => param.rows[0].list;

const addZero = (num) => {
  const nums = num < 10 ? `0${num}` : num;
  return nums;
};

export const updateTime = (times) => {
  if (times) {
    let time = times || new Date();
    time = new Date(time);
    const year = time.getFullYear();
    let months = time.getMonth() + 1;
    months = addZero(months);
    let day = time.getDate();
    day = addZero(day);
    let hour = time.getHours();
    hour = addZero(hour);
    let mins = time.getMinutes();
    mins = addZero(mins);
    let secs = time.getSeconds();
    secs = addZero(secs);
    const timeStr = `${year}-${months}-${day} ${hour}:${mins}:${secs}`;
    return timeStr;
  }
  return '';
};

export const defaultPutParamTemplateRule = (param) => {
  const { ...data } = param;
  const dataPage = {
    size: 10,
    current: 1,
    ...data,
  };
  const dataStr = JSON.stringify(dataPage);
  return {
    param: [dataStr],
  };
};

export const defaultGetParamTemplateSel = (param) => {
  const { ...data } = param;
  const dataStr = JSON.stringify(data);
  return {
    param: [dataStr],
  };
};

export const defaultParamTemplateAddRule = (param) => {
  const { ...data } = param;
  const dataStr1 = JSON.stringify(data);
  const dataStr2 = `[${dataStr1}]`;

  return {
    param: dataStr2,
  };
};
export const defaultGetParamTemplateSMT = (param) => {
  let {
    sort = undefined,
    size = 10,
    current = 1,
    ...data } = param;
  data = param || {};
  return {
    ...data,
    sort,
    size,
    current,
  };
};
export const defaultPostDataTemplateSMT = param => (param);

export const defaultPutParamTemplateSMT = (param) => {
  const { ...data } = param;
  return {
    condition: [data],
  };
};

export const dataSourceTemplateDetail = rows => (rows ? rows.detailInfo : rows);
export const dataSourceTemplateSummary = rows => (rows ? rows.summaryInfo : rows);
export const defaultRequestFilters = [null, '', undefined, 'Invalid date', '-1', 'null'];
// export const SERVER_IP_SMM = 'http://10.120.137.176:8081/ams';
// export const SERVER_IP_SMM = 'http://cnxmdrcnb002:80/ams';
// export const SERVER_IP_SMM = 'http://cnbjdrcpc300:80/ams';
// export const SERVER_IP_JIG = 'http://cnbjdrcpc018:8081';
// export const SERVER_IP_JIG = 'http://cnbjdrcnb011:8081';
// export const SERVER_IP_BOM = 'http://10.120.137.176:8081';
// export const SERVER_IP_BOM = 'http://172.17.52.43:8081';
// export const SERVER_IP_PCB = 'http://cnbjdrcpc017:8081';
// export const SERVER_IP_PCB = 'http://172.22.40.35:8081';
// export const SERVER_IP_PCB = 'http://172.22.40.31:8081';
// export const SERVER_IP_LION = 'http://CNBJDRCNB060:80';
// export const SERVER_IP_LION = 'http://CNBJDRCPC328:80';
// export const SERVER_IP_SPM = 'http://172.22.34.59:8081';
// export const SERVER_IP_EQM = 'http://172.22.27.153:8081';
// export const SERVER_IP_EQM = 'http://172.22.34.14:8081';
// export const SERVER_IP_EQM = 'http://CNXADRCNB016:8081';
// export const SERVER_IP_EQM = 'http://172.22.27.81:8081';

// export const SERVER_IP_SMT = 'http://172.22.27.216:8081';
// export const SERVER_IP_SMT = 'http://10.146.128.63:8081';
export const SERVER_IP_RULE = 'http://10.146.192.7:8081';
export const SERVER_IP_RULE1 = 'http://172.22.27.216:8081';
export const SERVER_IP_WIP = 'http://10.120.137.178:8300';
// export const SERVER_IP_SPC = 'http://10.120.137.178:8300';
export const SERVER_IP_SPC = 'http://10.120.137.41:8500';
export const SERVER_IP_EQM = 'http://172.22.27.153:8081';
export const SERVER_IP = 'http://172.22.27.216:8081';
export const SERVER_IP_ALARM = 'http://172.22.34.59:80';
// export const SERVER_IP = 'http://172.22.27.15:8081';

// export const SERVER_IP_EQM = 'http://10.147.73.111:8081';
// const SERVER_IP = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
export const SERVER_IP_SPM = SERVER_IP;
export const SERVER_IP_JIG = SERVER_IP;
export const SERVER_IP_SMM = `${SERVER_IP}/ams`;
export const SERVER_IP_BOM = SERVER_IP;
export const SERVER_IP_PCB = SERVER_IP;
export const SERVER_IP_LION = SERVER_IP;
// export const SERVER_IP_EQM = SERVER_IP;
export const SERVER_IP_SMT = SERVER_IP;
// export const SERVER_IP_RULE = SERVER_IP;
// export const SERVER_IP_RULE1 = SERVER_IP;
