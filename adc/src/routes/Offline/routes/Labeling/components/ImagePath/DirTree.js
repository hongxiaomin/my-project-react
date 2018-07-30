/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { Tree, Modal, Button } from 'antd'
import { connect } from 'react-redux'
import { getDirTree, getImageListByPath } from '../../modules'

const TreeNode = Tree.TreeNode

export class DirTree extends React.Component {
  constructor() {
    super()

    this.state = {
      isOpen: false,
      selectedKeys: [],
      path: '',
      autoExpandParent: false,
    }
  }

  componentDidMount() {
    this.props.dispatch(getDirTree())
  }

  onSelect = (selectedKeys) => {
    let tmp = []
    const obj = {
      selectedKeys,
      path: '',
    }
    if (selectedKeys.length) {
      tmp = selectedKeys[0].split('-')
    }
    if (tmp.length && tmp[1] === '1') {
      obj.path = tmp[0]
    }
    this.setState({
      ...obj,
    })
  }

  handleCancel = () => {
    this.setState({
      isOpen: false,
    })
  }

  handleOk = () => {
    this.props.dispatch(getImageListByPath({ path: [`${this.state.path}`] }, () => {
      this.toggle()
    }))
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  loop = (name, arr) => arr.map(item => (<TreeNode
    title={item.name}
    key={`${name}/${item.name}-${!item.children || !item.children.length ? 1 : 0}`}
  >
    {item.children && item.children.length && this.loop(`${name}/${item.name}`, item.children)}
  </TreeNode>))

  render() {
    let children = []
    try {
      children = this.loop('', this.props.data)
    } catch (e) {
      console.log(e)
    }
    return (<div>
      <a onClick={this.toggle}>
        <WrapperFormattedMessage id="labelingTool.dirTree.directoryTree" />
      </a>
      <Modal
        title={this.props.intl.formatMessage({ id: 'labelingTool.dirTree.directoryTree' })}
        visible={this.state.isOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="cancle" onClick={this.handleCancel}>
            <WrapperFormattedMessage id="cancel" />
          </Button>,
          <Button key="submit" type="primary" disabled={!this.state.path} onClick={this.handleOk}>
            <WrapperFormattedMessage id="submit" />
          </Button>,
        ]}
      >
        <div style={{ maxHeight: '300px', height: '300px', overflow: 'auto' }}>
          {(() => {
            if (children.length) {
              return (<Tree
                showLine={false}
                checkable={false}
                defaultExpandAll={false}
                autoExpandParent={this.state.autoExpandParent}
                defaultExpandedKeys={['/ARRAY-0']}
                checkedKeys={this.state.checkedKeys}
                selectedKeys={this.state.selectedKeys}
                onSelect={this.onSelect}
              >
                {children}
              </Tree>)
            }
            return <p><WrapperFormattedMessage id="labelingTool.dirTree.noData" /></p>
          })()}
        </div>
      </Modal>
    </div>)
  }
}

DirTree.propTypes = {
  intl: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ labelingTool, intl }) => ({
  intl,
  data: labelingTool.dirTree,
}))(injectIntl(DirTree))
