import React from 'react'
import { Icon } from 'antd'
import './LabelingTool.scss'
import ImagePath from '../ImagePath'
import ImageList from '../ImageList'
import LabelingList from '../LabeledList'
import HotKeys from '../HotKeys'
import ControlPanel from '../ControlPanel'
import ImageZone from '../ImageZone'
import DefectCode from '../DefectCode'
import LabelingToolExpand from '../LabelingToolExpand'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'

export class LabelingTool extends React.Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (<div styleName="labeling-tool">
      <div styleName="labeling-tool-left">
        <ImagePath />
        <ImageList />
        <LabelingList />
      </div>
      <div styleName="labeling-tool-right">
        <HotKeys />
        <div styleName="default-code">
          <DefectCode />
        </div>
        <div styleName="image-zone">
          <ControlPanel />
          <ImageZone />
          <p
            style={{ color: '#FAAD14', paddingTop: '10px' }}
          >
            <Icon
              type="exclamation-circle-o"
              style={{
                color: '#FAAD14',
                fontSize: 18,
                verticalAlign: 'bottom',
              }}
            />
            <span>
              <WrapperFormattedMessage
                id="labelingTool.note"
              />
            </span></p>
        </div>
      </div>
      <LabelingToolExpand />
    </div>)
  }
}

export default LabelingTool
