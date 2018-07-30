/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onFormDataChange } from '../../actions/FormAction';
import { saveTableInputData } from '../../actions/TableAction';
import { inputEnter, inputEnterNoRequest, inputEnterShowData, saveDisable } from '../../actions/InputAction';
import { onInputEnter } from '../../actions/SMMMaterialCarMergeOthersAction';
import { onFeederInputEnter } from '../../actions/SMMAutoUpFeederOthersAction';
import Input from '../../components/Input';
import { formReducerName, formDataName, inputName } from '../../constants/Config';
import { tableRedecurName } from '../../constants/TableConfig';

const mapStateToProps = (state, props) => (
  {
    value: props.index !== undefined ? state.getIn([
      tableRedecurName,
      props.tableName,
      'tableInputData',
      props.index,
      props.name,
    ]) : state.getIn([
      formReducerName,
      props.formName ? props.formName : inputName,
      formDataName, props.name]),
    disabled: props.disabled ? true : state.getIn([formReducerName, props.formName, 'InputDisable', props.name, 'disabled']),
  }
  );
const mapDispatchToProps = (dispatch, props) => (
  {
    // 表格中的input 初始化的时候 回调的函数
    onInitail: (() => {
      if (props.inputInitFunc) {
        const { index, name, tableName, value } = props;
        dispatch(saveTableInputData({
          tableName,
          index,
          name,
          value,
        }));
        return null;
      }
      if (props.value) {
        dispatch(onFormDataChange({
          formName: props.formName ? props.formName : inputName,
          name: props.name,
          value: props.value,
        }));
      } else if (props.noValue) {
        dispatch(onFormDataChange({
          formName: props.formName ? props.formName : inputName,
          name: props.name,
          value: '',
        }));
      }
      if (props.Init) {
        dispatch(saveDisable({
          formName: props.formName,
          inputName: 'InputDisable',
          name: props.name,
          disabled: false,
        }));
      }
    })(),
    onChange: (e) => {
      if (!props.NoOnChange) {
        // 判断是否为文件上传
        if (props.type === 'file') {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
            const dataURL = reader.result;
            dispatch(onFormDataChange({
              formName: props.formName ? props.formName : inputName,
              name: `${props.name}-files`,
              value: dataURL,
            }));
          };
        }
      //  debugger;
        if (props.onInputCallFunc) {
          const flag = dispatch(props.onInputCallFunc({ props, e }));
          if (flag) {
            const { index, name, tableName } = props;
            dispatch(saveTableInputData({
              tableName,
              index,
              name,
              value: e.target.value,
            }));
          }
          return null;
        }
        dispatch(onFormDataChange({
          formName: props.formName ? props.formName : inputName,
          name: props.name,
          value: e.target.value,
        }));
      }
    },
    onKeyDown: (e) => {
      if (props.name === 'labelName') {
        if (e && e.keyCode === 13) {
          const inputValue = e.target.value;
          e.target.value = '';
          if (props.materail) {
            // smmMaterailCarMergePage
            dispatch(onInputEnter());
            dispatch(onFormDataChange({
              formName: props.formName ? props.formName : inputName,
              name: props.name,
              value: inputValue,
            }));
          } else if (props.autoFeederOthers) {
            // smmAutoUpFeederOthers
            dispatch(onFeederInputEnter(props));
            dispatch(onFormDataChange({
              formName: props.formName ? props.formName : inputName,
              name: props.name,
              value: inputValue,
            }));
          } else {
            // 普通input回车事件
            if (props.noRequest) {
              dispatch(inputEnterNoRequest(inputValue));
              e.target.value = '';
            } else if (props.RequestShowData) {
              dispatch(inputEnterShowData(inputValue));
            } else {
              dispatch(inputEnter(inputValue));
            }
          }
        }
      }
    },
    onClick: (e) => {
      if (props.value === 'others') {
        document.getElementById('tt').className = 'displayblock';
      } else if (props.value === 'overDue') {
        document.getElementById('tt').className = 'displaynone';
        dispatch(onFormDataChange({
          formName: 'JigCheckGroupSettingAdd',
          name: 'reason',
          value: '超期',
        }));
      } else if (props.value === 'dullMaterial') {
        document.getElementById('tt').className = 'displaynone';
        dispatch(onFormDataChange({
          formName: 'JigCheckGroupSettingAdd',
          name: 'reason',
          value: '呆料',
        }));
      } else if (props && props.value) {
        dispatch(onFormDataChange({
          formName: props.formName,
          name: props.name,
          value: props.value,
        }));
      }
    },

  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Input);
