import React from 'react'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import propTypes from 'prop-types'
import { Select } from 'antd'
import classes from './modelParing/components/ModelParing/ModelParing.scss'

const Option = Select.Option

export class SearchCondition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      processId: 'processId',
    }
  }
  render() {
    const { intl } = this.props

    return (
      <div>
        <div className={classes.searchDiv}>
          <h5 style={{ marginTop: '6px', marginRight: '10px' }}><WrapperFormattedMessage id='modelPairing.modelParing.searchCondition' />:</h5>
          <div className={classes.singleSearch}>
            <h5 className={classes.h5}><WrapperFormattedMessage id='processId' /></h5>
            <Select
              allowClear
              showSearch
              optionFilterProp="children"
              name='processId'
              style={{ width: 200 }}
              placeholder={intl.formatMessage({ id: 'pleaseSelect' })}
              onChange={this.props.handleChange('processId')}
            >
              {this.props.processList &&
                this.props.processList.map(item => (<Option
                  key={item.processId.toString()}
                  value={item.processId.toString()}
                >{item.processName}</Option>))
            }
            </Select>
          </div>
          <div className={classes.singleSearch}>
            <h5 className={classes.h5}><WrapperFormattedMessage id='productId' /></h5>
            <Select
              allowClear
              showSearch
              optionFilterProp="children"
              name='processId'
              style={{ width: 200 }}
              placeholder={intl.formatMessage({ id: 'pleaseSelect' })}
              onChange={this.props.handleChange('productId')}
            >
              {this.props.productList &&
                this.props.productList.map(item => (<Option
                  key={item.productId.toString()}
                  value={item.productId.toString()}
                >{item.productName}</Option>))}
            </Select>
          </div>
          <div className={classes.singleSearch}>
            <h5 className={classes.h5}><WrapperFormattedMessage id='serviceManagement.dialogFilter.model' /></h5>
            <Select
              allowClear
              showSearch
              optionFilterProp="children"
              name='processId'
              style={{ width: 200 }}
              placeholder={intl.formatMessage({ id: 'pleaseSelect' })}
              onChange={this.props.handleChange('modelId')}
            >
              { this.props.modelList &&
                this.props.modelList.map(item => (<Option
                  key={item.id.toString()}
                  value={item.id.toString()}
                >{item.name}</Option>))}
            </Select>
          </div>
          <button
            style={{ width: '80px' }}
            onClick={this.props.searchChange}
            type='button'
            disabled={this.props.isClick}
            className={'pt-button pt-intent-primary'}
          >
            <WrapperFormattedMessage id='search' />
          </button>
        </div>
      </div>
    )
  }
}

SearchCondition.propTypes = {
  processList: propTypes.array.isRequired,
  productList: propTypes.array.isRequired,
  modelList: propTypes.array.isRequired,
  handleChange: propTypes.func.isRequired,
  searchChange: propTypes.func.isRequired,
  isClick: propTypes.bool.isRequired,
  intl: propTypes.object.isRequired,
}
export default injectIntl(SearchCondition)
