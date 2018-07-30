import Request from '../../utils/fetchData';
import { SERVER_IP } from '../../constants/Config';
import { dataHandlerWithEncode, clearForm } from '../../utils/Common';


const stateInit = (_this) => {
  _this.setState({
    doubleClick: false,
    ADoubleClick: false,
    BDoubleClick: false,
    isTip: 'none',
    AIsTip: 'none',
    BIsTip: 'none',
  });
};
// single程式料表生成点击事件
export const onClick = _this => (props) => {
  const { getData } = props;
  const formData = getData('BOMOISingle').toJS();
  Object.keys(formData).forEach((key) => {
    if (formData[key] === '') {
      delete formData[key];
    }
  });
  if (JSON.stringify(formData) !== '{}' && formData.assembleNo && formData.nxtType && formData.moduleNum && formData.side) {
    if (formData.side === 'AB') {
      _this.setState({ isMoreFlexa: true });
    } else {
      _this.setState({ isMoreFlexa: false });
    }
    _this.setState({ uploadFlexaVisible: true, formData, tools: props });
  } else {
    _this.setState({
      snackSwitch: true,
      message: '请将form表单填写完整',
    });
  }
};
// single 上传modal取消事件
export const handleCancel = _this => () => {
  _this.setState({ uploadFlexaVisible: false });
};

// single发送上传文件请求，分AB双制程，A、B单制程
export const postSingleRequest = _this => (datas, flexa1This, flexa2This, bomThis, uploadThis) => {
  const method = 'POST';
  const data = datas;
  const formData = _this.state.formData;
  let url = null;
  let callback = null;
  if (formData.side === 'AB') {
    url = `${SERVER_IP}/ams/dg5/bom/double/create`;
    callback = (response) => {
      if (response.code === 0) {
        _this.setState({
          snackSwitch: true,
          loading: false,
          message: response.message,
          uploadFlexaVisible: false,
          compareResultVisible: true,
          compareResultData: response.rows,
          sheetName: {
            ..._this.state.sheetName,
            ...{ A: response.rows[0].bomCommon.bomReportName },
            ...{ B: response.rows[1].bomCommon.bomReportName },
          },
        });
        // 文件上传后清空
        flexa1This.setState({ value: '' });
        if (flexa2This) {
          flexa2This.setState({ value: '' });
        }
        bomThis.setState({ value: '' });
        uploadThis.setState({
          bomFile: null,
          flexaFile: null,
          flexaABFile: null,
          flexa1This: null,
          flexa2This: null,
          bom1This: null,
        });
      } else if (response.code === -1) {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: response.message,
        });
      }
    };
  } else {
    url = `${SERVER_IP}/ams/dg5/bom/create`;
    callback = (response) => {
      if (response.code === 0) {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: response.message,
          uploadFlexaVisible: false,
          compareResultVisible: true,
          compareResultData: response.rows,
          sheetName: { ..._this.state.sheetName, ...{ AB: response.rows.bomCommon.bomReportName } },
        });
        // 文件上传后清空
        flexa1This.setState({ value: '' });
        if (flexa2This) {
          flexa2This.setState({ value: '' });
        }
        bomThis.setState({ value: '' });
        uploadThis.setState({
          bomFile: null,
          flexaFile: null,
          flexaABFile: null,
          flexa1This: null,
          flexa2This: null,
          bom1This: null,
        });
      } else if (response.code === -1) {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: response.message,
        });
      }
    };
  }
  const headers = new Headers();
  Request(url, {
    headers,
    method,
    contentType: 'multipart/form-data',
    data,
    callback,
  });
};
// single中获取文件上传数据
export const allUploadClick = _this => (flexaFile, bomFile, flexaABFile, flexa1This, flexa2This, bomThis, uploadThis) => () => {
  if ((flexaFile && bomFile) || (flexaABFile && bomFile)) {
    _this.setState({ compareResultAModalShow: 'block', compareResultBModalShow: 'block', loading: true });
    const formData = _this.state.formData;
    let data = null;
    if (formData.side === 'AB') {
      data = {
        aFlexa: flexaABFile.aFlexa,
        bFlexa: flexaABFile.bFlexa,
        sap: bomFile,
        assembleNo: formData.assembleNo,
        nxtType: formData.nxtType,
        moduleNum: formData.moduleNum,
        side: formData.side,
      };
    } else {
      data = {
        flexa: flexaFile,
        sap: bomFile,
        assembleNo: formData.assembleNo,
        nxtType: formData.nxtType,
        moduleNum: formData.moduleNum,
        side: formData.side,
      };
    }
    postSingleRequest(_this)(data, flexa1This, flexa2This, bomThis, uploadThis);
  } else {
    _this.setState({
      snackSwitch: true,
      message: '文件都为必选项',
    });
  }
};
// single中NG button 事件
export const handleNGClick = _this => () => {
  _this.setState({ compareResultVisible: false, CompareResultDeatilVisible: false });
  stateInit(_this);
};
// single中 OK button 数据库没有该料表名时的post请求
const postOkData = _this => (dataa, side) => {
  _this.setState({ loading: true });
  const method = 'POST';
  const reportName = _this.state.sheetName[side];
  const datas = dataa;
  datas.bomCommon.bomReportName = reportName;
  let data = { common: datas.bomCommon, detailList: datas.bomDetailList };
  data = JSON.stringify(data);
  const headers = new Headers();
  const url = `${SERVER_IP}/ams/dg5/bom/create/doublecheck`;
  let callback = null;
  if (side === 'AB') {
    callback = (response) => {
      if (response.code === 0) {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: response.message,
          compareResultVisible: false,
          CompareResultDeatilVisible: false,
        });
        clearForm('BOMOISingle', ['assembleNo', 'nxtType', 'moduleNum', 'side'], _this.state.tools);
      } else if (response.code === -1) {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: response.message,
        });
      }
    };
  } else if (side === 'A') {
    const bShow = _this.state.compareResultBModalShow;
    if (bShow === 'none') {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultVisible: false,
            CompareResultDeatilVisible: false,
          });
          clearForm('BOMOISingle', ['assembleNo', 'nxtType', 'moduleNum', 'side'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
          });
        }
      };
    } else {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultAModalShow: 'none',
            CompareResultDeatilVisible: false,
          });
          clearForm('BOMOISingle', ['assembleNo', 'nxtType', 'moduleNum', 'side'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
          });
        }
      };
    }
  } else if (side === 'B') {
    const aShow = _this.state.compareResultAModalShow;
    if (aShow === 'none') {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultVisible: false,
            CompareResultDeatilVisible: false,
          });
          clearForm('BOMOISingle', ['assembleNo', 'nxtType', 'moduleNum', 'side'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
          });
        }
      };
    } else {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultBModalShow: 'none',
            CompareResultDeatilVisible: false,
          });
          clearForm('BOMOISingle', ['assembleNo', 'nxtType', 'moduleNum', 'side'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
          });
        }
      };
    }
  }

  Request(url, {
    headers,
    method,
    contentType: 'application/json',
    data,
    callback,
  });
};
// 验证料表名是否存在于数据库
const postSureClick = _this => async (value) => {
  _this.setState({ loading: true });
  const method = 'GET';
  const headers = new Headers();
  const values = encodeURIComponent(value);
  const url = `${SERVER_IP}/ams/dg5/bom/exist/reportname?bomReportName=${values}`;
  let requestRow = null;
  const callback = (response) => {
    if (response.code === 0) {
      _this.setState({ loading: false });
      requestRow = response.rows;
    }
  };
  await Request(url, {
    headers,
    method,
    callback,
  });
  return requestRow;
};
// single中料表名存在，OK button发送update请求
const updateBom = _this => (dataa, side) => {
  _this.setState({ loading: true });
  const method = 'PUT';
  const reportName = _this.state.sheetName[side];
  const datas = dataa;
  datas.bomCommon.bomReportName = reportName;
  let data = { bomCommon: datas.bomCommon, bomDetailList: datas.bomDetailList };
  data = JSON.stringify(data);
  const headers = new Headers();
  const url = `${SERVER_IP}/ams/dg5/bom/bomanddetail/update`;
  let callback = null;
  if (side === 'AB') {
    callback = (response) => {
      if (response.code === 0) {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: response.message,
          compareResultVisible: false,
          CompareResultDeatilVisible: false,
          isTip: 'none',
        });
        clearForm('BOMOISingle', ['assembleNo', 'nxtType', 'moduleNum', 'side'], _this.state.tools);
      } else if (response.code === -1) {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: response.message,
          isTip: 'none',
        });
      }
    };
  } else if (side === 'A') {
    const bShow = _this.state.compareResultBModalShow;
    if (bShow === 'none') {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultVisible: false,
            CompareResultDeatilVisible: false,
            AIsTip: 'none',
          });
          clearForm('BOMOISingle', ['assembleNo', 'nxtType', 'moduleNum', 'side'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            AIsTip: 'none',
          });
        }
      };
    } else {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultAModalShow: 'none',
            CompareResultDeatilVisible: false,
            AIsTip: 'none',
          });
          clearForm('BOMOISingle', ['assembleNo', 'nxtType', 'moduleNum', 'side'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            AIsTip: 'none',
          });
        }
      };
    }
  } else if (side === 'B') {
    const aShow = _this.state.compareResultAModalShow;
    if (aShow === 'none') {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultVisible: false,
            CompareResultDeatilVisible: false,
            BIsTip: 'none',
          });
          clearForm('BOMOISingle', ['assembleNo', 'nxtType', 'moduleNum', 'side'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            BIsTip: 'none',
          });
        }
      };
    } else {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultBModalShow: 'none',
            CompareResultDeatilVisible: false,
            BIsTip: 'none',
          });
          clearForm('BOMOISingle', ['assembleNo', 'nxtType', 'moduleNum', 'side'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            BIsTip: 'none',
          });
        }
      };
    }
  }

  Request(url, {
    headers,
    method,
    contentType: 'application/json',
    data,
    callback,
  });
};
// 变量isDouble计算点击single中OK button次数
// let isDouble = 0;
export const handleAOKClick = _this => async () => {
  const isDouble = _this.state.ADoubleClick;
  const data = _this.state.compareResultData[0];
  if (isDouble) {
    updateBom(_this)(data, 'A');
    _this.setState({ AIsTip: 'none', ADoubleClick: false });
  } else {
    const sheetName = _this.state.sheetName.A;
    const callData = await postSureClick(_this)(sheetName);
    if (callData !== 'false') {
      _this.setState({ AIsTip: 'block', ADoubleClick: true });
    } else {
      postOkData(_this)(data, 'A');
    }
  }
};
export const handleBOKClick = _this => async () => {
  const isDouble = _this.state.BDoubleClick;
  const data = _this.state.compareResultData[1];
  if (isDouble) {
    updateBom(_this)(data, 'B');
    _this.setState({ BIsTip: 'none', BDoubleClick: false });
  } else {
    const sheetName = _this.state.sheetName.B;
    const callData = await postSureClick(_this)(sheetName);
    if (callData !== 'false') {
      _this.setState({ BIsTip: 'block', BDoubleClick: true });
    } else {
      postOkData(_this)(data, 'B');
    }
  }
};
export const handleOkClick = _this => async () => {
  const isDouble = _this.state.doubleClick;
  const data = _this.state.compareResultData;
  if (isDouble) {
    updateBom(_this)(data, 'AB');
    _this.setState({ isTip: 'none', doubleClick: false });
  } else {
    const sheetName = _this.state.sheetName.AB;
    const callData = await postSureClick(_this)(sheetName);
    if (callData !== 'false') {
      _this.setState({ isTip: 'block', doubleClick: true });
    } else {
      postOkData(_this)(data, 'AB');
    }
  }
};
// grouping中程式料表生成button事件
export const onGroupClick = _this => (props) => {
  const { getData } = props;
  const groupFormData = getData('BOMOIGroup').toJS();
  Object.keys(groupFormData).forEach((key) => {
    if (groupFormData[key] === '') {
      delete groupFormData[key];
    }
  });
  if (JSON.stringify(groupFormData) !== '{}' && groupFormData.assembleNo && groupFormData.nxtType && groupFormData.moduleNum && groupFormData.side) {
    const groupList = [];
    let groupArr = [];
    groupArr.push(groupFormData.assembleNo);
    const groupA = groupFormData.groupA;
    if (groupA) {
      if (groupA.indexOf(',') > 0 || groupA.indexOf(',') > 0 || groupA.indexOf('，') > 0 || groupA.indexOf('，') > 0) {
        const groupAReplace = groupA.replace(/[，,，,]/ig, '&').replace(/\s+/g, '');
        const groupAArray = Array.from(new Set(groupAReplace.split('&')));
        groupAArray.map((v, i) => {
          groupArr.push(v.trim());
          if (v !== groupFormData.assembleNo.toString()) {
            groupList.push({ groupingSide: 'A', groupingAssembleNo: v.trim() });
          }
          return null;
        });
      } else if (groupA.trim() !== groupFormData.assembleNo.toString()) {
        groupArr.push(groupA.trim());
        groupList.push({ groupingSide: 'A', groupingAssembleNo: groupA.trim() });
      }
    }
    const groupB = groupFormData.groupB;
    if (groupB) {
      if (groupB.indexOf(',') > 0 || groupB.indexOf(',') > 0 || groupB.indexOf('，') > 0 || groupB.indexOf('，') > 0) {
        const groupBReplace = groupB.replace(/[，,，,]/ig, '&').replace(/\s+/g, '');
        const groupBArray = Array.from(new Set(groupBReplace.split('&')));
        groupBArray.map((v, i) => {
          groupArr.push(v.trim());
          if (v !== groupFormData.assembleNo.toString()) {
            groupList.push({ groupingSide: 'B', groupingAssembleNo: v.trim() });
          }
          return null;
        });
      } else if (groupB.trim() !== groupFormData.assembleNo.toString()) {
        groupArr.push(groupB.trim());
        groupList.push({ groupingSide: 'B', groupingAssembleNo: groupB.trim() });
      }
    }
    const groupSet = new Set(groupArr);
    groupArr = Array.from(groupSet);
    if (groupFormData.side === 'AB') {
      groupList.push({ groupingSide: 'A', groupingAssembleNo: groupFormData.assembleNo.toString() });
      groupList.push({ groupingSide: 'B', groupingAssembleNo: groupFormData.assembleNo.toString() });
      _this.setState({ isMoreFlexa: true });
    } else {
      _this.setState({ isMoreFlexa: false });
      if (groupFormData.side === 'A') {
        groupList.push({ groupingSide: 'B', groupingAssembleNo: groupFormData.assembleNo.toString() });
      } else if (groupFormData.side === 'B') {
        groupList.push({ groupingSide: 'A', groupingAssembleNo: groupFormData.assembleNo.toString() });
      }
    }
    const newFormData = {
      groupData: groupArr,
      groupList,
      assembleNo: groupFormData.assembleNo,
      moduleNum: groupFormData.moduleNum,
      nxtType: groupFormData.nxtType,
      side: groupFormData.side,
    };
    _this.setState({ uploadGroupFlexaVisible: true, groupFormData: newFormData, tools: props });
  } else {
    _this.setState({
      snackSwitch: true,
      message: '请将form表单填写完整',
    });
  }
};
// grouping中NG button 事件
export const handleGroupNGClick = _this => () => {
  _this.setState({
    compareResultVisible: false,
    CompareResultDeatilVisible: false,
  });
  stateInit(_this);
};
// grouping中OK button post请求
const postOkGroupClick = _this => (dataa, side) => {
  _this.setState({ loading: true });
  const method = 'POST';
  const reportName = _this.state.sheetName[side];
  const datas = dataa;
  datas.bomCommon.bomReportName = reportName;
  let data = { common: datas.bomCommon, detailList: datas.bomDetailList, groupingList: _this.state.groupFormData.groupList };
  data = JSON.stringify(data);
  const headers = new Headers();
  const url = `${SERVER_IP}/ams/dg5/bom/grouping/create/doublecheck `;
  let callback = null;
  if (side === 'AB') {
    callback = (response) => {
      if (response.code === 0) {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: response.message,
          compareResultVisible: false,
          CompareResultDeatilVisible: false,
        });
        clearForm('BOMOIGroup', ['assembleNo', 'nxtType', 'moduleNum', 'side', 'groupA', 'groupB'], _this.state.tools);
      } else if (response.code === -1) {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: response.message,
        });
      }
    };
  } else if (side === 'A') {
    const bShow = _this.state.compareResultBModalShow;
    if (bShow === 'none') {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultVisible: false,
            CompareResultDeatilVisible: false,
          });
          clearForm('BOMOIGroup', ['assembleNo', 'nxtType', 'moduleNum', 'side', 'groupA', 'groupB'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
          });
        }
      };
    } else {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultAModalShow: 'none',
            CompareResultDeatilVisible: false,
          });
          clearForm('BOMOIGroup', ['assembleNo', 'nxtType', 'moduleNum', 'side', 'groupA', 'groupB'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
          });
        }
      };
    }
  } else if (side === 'B') {
    const aShow = _this.state.compareResultAModalShow;
    if (aShow === 'none') {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultVisible: false,
            CompareResultDeatilVisible: false,
          });
          clearForm('BOMOIGroup', ['assembleNo', 'nxtType', 'moduleNum', 'side', 'groupA', 'groupB'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
          });
        }
      };
    } else {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultBModalShow: 'none',
            CompareResultDeatilVisible: false,
          });
          clearForm('BOMOIGroup', ['assembleNo', 'nxtType', 'moduleNum', 'side', 'groupA', 'groupB'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
          });
        }
      };
    }
  }
  Request(url, {
    headers,
    method,
    contentType: 'application/json',
    data,
    callback,
  });
};
// grouping中ok button PUT请求
const updateOkGroupClick = _this => (dataa, side) => {
  _this.setState({ loading: true });
  const method = 'PUT';
  const reportName = _this.state.sheetName[side];
  const datas = dataa;
  datas.bomCommon.bomReportName = reportName;
  let data = { bomCommon: datas.bomCommon, bomDetailList: datas.bomDetailList, bomGroupingList: _this.state.groupFormData.groupList };
  data = JSON.stringify(data);
  const headers = new Headers();
  const url = `${SERVER_IP}/ams/dg5/bom/bomanddetail/update`;
  let callback = null;
  if (side === 'AB') {
    callback = (response) => {
      if (response.code === 0) {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: response.message,
          compareResultVisible: false,
          CompareResultDeatilVisible: false,
        });
        clearForm('BOMOIGroup', ['assembleNo', 'nxtType', 'moduleNum', 'side', 'groupA', 'groupB'], _this.state.tools);
      } else if (response.code === -1) {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: response.message,
        });
      }
    };
  } else if (side === 'A') {
    const bShow = _this.state.compareResultBModalShow;
    if (bShow === 'none') {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultVisible: false,
            CompareResultDeatilVisible: false,
          });
          clearForm('BOMOIGroup', ['assembleNo', 'nxtType', 'moduleNum', 'side', 'groupA', 'groupB'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
          });
        }
      };
    } else {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultAModalShow: 'none',
            CompareResultDeatilVisible: false,
          });
          clearForm('BOMOIGroup', ['assembleNo', 'nxtType', 'moduleNum', 'side', 'groupA', 'groupB'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
          });
        }
      };
    }
  } else if (side === 'B') {
    const aShow = _this.state.compareResultAModalShow;
    if (aShow === 'none') {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultVisible: false,
            CompareResultDeatilVisible: false,
          });
          clearForm('BOMOIGroup', ['assembleNo', 'nxtType', 'moduleNum', 'side', 'groupA', 'groupB'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
          });
        }
      };
    } else {
      callback = (response) => {
        if (response.code === 0) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
            compareResultBModalShow: 'none',
            CompareResultDeatilVisible: false,
          });
          clearForm('BOMOIGroup', ['assembleNo', 'nxtType', 'moduleNum', 'side', 'groupA', 'groupB'], _this.state.tools);
        } else if (response.code === -1) {
          _this.setState({
            loading: false,
            snackSwitch: true,
            message: response.message,
          });
        }
      };
    }
  }
  Request(url, {
    headers,
    method,
    contentType: 'application/json',
    data,
    callback,
  });
};

// grouing中OK button事件
export const handleGroupOkClick = _this => async () => {
  const isGroupDouble = _this.state.doubleClick;
  const groupSheetName = _this.state.sheetName.AB;
  const data = _this.state.compareResultData;
  if (isGroupDouble) {
    updateOkGroupClick(_this)(data, 'AB');
    _this.setState({ isTip: 'none', doubleClick: false });
  } else {
    const groupCallData = await postSureClick(_this)(groupSheetName);
    if (groupCallData !== 'false') {
      _this.setState({ isTip: 'block', doubleClick: true });
    } else {
      postOkGroupClick(_this)(data, 'AB');
    }
  }
};
export const handleGroupAOkClick = _this => async () => {
  const isGroupDouble = _this.state.ADoubleClick;
  const groupSheetName = _this.state.sheetName.A;
  const data = _this.state.compareResultData[0];
  if (isGroupDouble) {
    updateOkGroupClick(_this)(data, 'A');
    _this.setState({ AIsTip: 'none', ADoubleClick: false });
  } else {
    const groupCallData = await postSureClick(_this)(groupSheetName);
    if (groupCallData !== 'false') {
      _this.setState({ AIsTip: 'block', ADoubleClick: true });
    } else {
      postOkGroupClick(_this)(data, 'A');
    }
  }
};
export const handleGroupBOkClick = _this => async () => {
  const isGroupDouble = _this.state.BDoubleClick;
  const groupSheetName = _this.state.sheetName.B;
  const data = _this.state.compareResultData[1];
  if (isGroupDouble) {
    updateOkGroupClick(_this)(data, 'B');
    _this.setState({ BIsTip: 'none', BDoubleClick: false });
  } else {
    const groupCallData = await postSureClick(_this)(groupSheetName);
    if (groupCallData !== 'false') {
      _this.setState({ BIsTip: 'block', BDoubleClick: true });
    } else {
      postOkGroupClick(_this)(data, 'B');
    }
  }
};
// grouping 上传文件post请求
export const postGroupRequest = _this => (datas, flexa1This, flexa2This, bomThis, uploadThis) => {
  const method = 'POST';
  const data = datas;
  const groupFormData = _this.state.groupFormData;
  let url = null;
  let callback = null;
  if (groupFormData.side === 'AB') {
    url = `${SERVER_IP}/ams/dg5/bom/grouping/double/create`;
    callback = (response) => {
      if (response.code === 0) {
        _this.setState({
          loading: false,
          uploadGroupFlexaVisible: false,
          compareResultVisible: true,
          compareResultData: response.rows,
          sheetName: {
            ..._this.state.sheetName,
            ...{ A: response.rows[0].bomCommon.bomReportName },
            ...{ B: response.rows[1].bomCommon.bomReportName },
          },
          snackSwitch: true,
          message: response.message,
        });
        // 文件上传后清空
        flexa1This.setState({ value: '' });
        if (flexa2This) {
          flexa2This.setState({ value: '' });
        }
        bomThis.setState({ value: '' });
        uploadThis.setState({
          bomFile: null,
          flexaFile: null,
          flexaABFile: null,
          flexa1This: null,
          flexa2This: null,
          bom1This: null,
        });
      } else if (response.code === -1) {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: response.message,
        });
      }
    };
  } else {
    url = `${SERVER_IP}/ams/dg5/bom/grouping/create`;
    callback = (response) => {
      if (response.code === 0) {
        _this.setState({
          loading: false,
          uploadGroupFlexaVisible: false,
          compareResultVisible: true,
          compareResultData: response.rows,
          sheetName: {
            ..._this.state.sheetName,
            ...{ AB: response.rows.bomCommon.bomReportName },
          },
          snackSwitch: true,
          message: response.message,
        });
        // 文件上传后清空
        flexa1This.setState({ value: '' });
        if (flexa2This) {
          flexa2This.setState({ value: '' });
        }
        bomThis.setState({ value: '' });
        uploadThis.setState({
          bomFile: null,
          flexaFile: null,
          flexaABFile: null,
          flexa1This: null,
          flexa2This: null,
          bom1This: null,
        });
      } else if (response.code === -1) {
        _this.setState({
          loading: false,
          snackSwitch: true,
          message: response.message,
        });
      }
    };
  }
  const headers = new Headers();
  Request(url, {
    headers,
    method,
    contentType: 'multipart/form-data',
    data,
    callback,
  });
};
// grouping中获取上传文件需要数据
export const groupAllUploadClick = _this => (flexa, bom, flexaABFile, flexa1This, flexa2This, bomThis, uploadThis) => () => {
  if ((flexa && bom) || (JSON.stringify(flexaABFile) !== '{}' && bom)) {
    _this.setState({ compareResultAModalShow: 'block', compareResultBModalShow: 'block', loading: true });
    const groupFormData = _this.state.groupFormData;
    let data = null;
    if (groupFormData.side === 'AB') {
      data = {
        aFlexa: flexaABFile.aFlexa,
        bFlexa: flexaABFile.bFlexa,
        sap: bom,
        assembleNo: _this.state.groupFormData.assembleNo,
        nxtType: _this.state.groupFormData.nxtType,
        moduleNum: _this.state.groupFormData.moduleNum,
        side: _this.state.groupFormData.side,
        groupingList: JSON.stringify(_this.state.groupFormData.groupList),
      };
    } else {
      data = {
        flexa,
        sap: bom,
        assembleNo: _this.state.groupFormData.assembleNo,
        nxtType: _this.state.groupFormData.nxtType,
        moduleNum: _this.state.groupFormData.moduleNum,
        side: _this.state.groupFormData.side,
        groupingList: JSON.stringify(_this.state.groupFormData.groupList),
      };
    }
    postGroupRequest(_this)(data, flexa1This, flexa2This, bomThis, uploadThis);
  } else {
    _this.setState({
      snackSwitch: true,
      message: '文件都为必选项',
    });
  }
};
// grouping中上传文件modal隐藏事件
export const handleGroupCancel = _this => () => {
  _this.setState({ uploadGroupFlexaVisible: false });
};
// snackSwitch 关闭事件
export const requestClose = _this => () => {
  _this.setState({ snackSwitch: false });
};
// 料表名变化改变state
const inputChange = _this => (value) => {
  const stateSheet = { ..._this.state.sheetName };
  const sheet = { ...stateSheet, ...value };
  _this.setState({ sheetName: sheet });
};
// single中单面、grouping中料表名变化事件
export const handleChange = _this => (e) => {
  inputChange(_this)({ AB: e.target.value });
};
// single中双面制程中A面料表名变化事件
export const handleAChange = _this => (e) => {
  inputChange(_this)({ A: e.target.value });
};
// single中双面制程中B面料表名变化事件
export const handleBChange = _this => (e) => {
  inputChange(_this)({ B: e.target.value });
};
// 查看对比结果有误详细信息button事件
export const clickLookDetail = _this => name => () => {
  _this.setState({ CompareResultDeatilVisible: true, compareResultVisible: false, sideName: name });
};
// 双面制程中A面NG button事件
export const handleANGClick = _this => () => {
  const BShow = _this.state.compareResultBModalShow;
  if (BShow === 'none') {
    _this.setState({ compareResultVisible: false });
  }
  _this.setState({
    compareResultAModalShow: 'none',
  });
  stateInit(_this);
};
// 双面制程中B面NG button事件
export const handleBNGClick = _this => () => {
  const AShow = _this.state.compareResultAModalShow;
  if (AShow === 'none') {
    _this.setState({ compareResultVisible: false });
  }
  _this.setState({
    compareResultBModalShow: 'none',
  });
  stateInit(_this);
};

