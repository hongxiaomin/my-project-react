/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import classes from './DataList.scss'

export class DataList extends React.Component {
  constructor(props) {
    super(props)

    this.input = null
    this.state = {
      text: '',
      select: false,
    }
  }

  onBlur = () => {
    this.setState({
      select: false,
    })
  }

  onDoubleClick = () => {
    this.setState({
      select: true,
    })
  }

  caretDownClick = () => {
    this.setState({
      select: !this.state.select,
    })
  }

  liClick = defect => () => {
    this.props.onChange(defect, () => {
      this.setState({
        select: true,
      })
    })
  }

  handleInputChange = (e) => {
    this.setState({
      text: this.input.value,
      select: true,
    })

    // this.props.onChange(value, () => {
    //   this.setState({
    //     select: true,
    //   })
    // })
  }

  cleanInput = () => {
    this.setState({
      text: '',
    })
    this.props.onChange('')
  }

  render() {
    let ul = ''
    const { selectedData, onFocus, onBlur, data, intl } = this.props
    const { text: stateText } = this.state
    const liList = []
    let inputIcon = (<span
      className={`pt-icon-standard pt-icon-small-cross ${classes['input-icon']}`}
      onClick={this.cleanInput}
    />)

    data.forEach((defect) => {
      if (!stateText || new RegExp(stateText.replace(/(\*|-)/g, '\\$1'), 'i').test(defect.defectCode)) {
        liList.push(<li className={`${classes.li}${selectedData.some(item => item.defectId === defect.defectId) ? ` ${classes.active}` : ''}`} key={defect.defectId} onClick={this.liClick(defect)}>{defect.defectCode}</li>)
      }
    })
    if (data.length && this.state.select) {
      if (!liList.length) liList.push(<li className={classes.li} key="no-data"><WrapperFormattedMessage id="labelingTool.dirTree.noData" /></li>)
      ul = (<ul className={classes.ul}>{liList}</ul>)
    }

    if (stateText === '') {
      inputIcon = (<span
        className={`pt-icon-standard pt-icon-caret-down ${classes['input-icon']}`}
        onClick={this.caretDownClick}
      />)
    }


    return (
      <div className={classes['DataList-container']}>
        {data.length && this.state.select
          ? <div className={classes['search-bg']} onClick={this.onBlur} />
          : ''
        }
        <div className={classes['input-div']}>
          <input
            ref={x => (this.input = x)}
            type="text"
            className="pt-input"
            value={this.state.text}
            onChange={this.handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onDoubleClick={this.onDoubleClick}
            placeholder={intl.formatMessage({ id: 'pleaseSelect' })}
            style={{
              position: 'relative',
              width: '93%',
              border: 'none',
              height: '20px',
              lineHeight: '20px',
              padding: 0,
              boxShadow: 'none',
            }}
          />
          {inputIcon}
        </div>
        {ul}
      </div>
    )
  }
}

DataList.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
}

DataList.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedData: PropTypes.array.isRequired,
  intl: PropTypes.object.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default injectIntl(DataList)
