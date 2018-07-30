import React from 'react'
import Chart from 're-echarts'
import { isEmpty } from 'lodash'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import classes from './ModelTrainingProgress.scss'

type Props = {
  lossRate: Array,
  accuracy: Array
};

const option = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Loss Rate', 'Accuracy'],
  },
  xAxis: [
    {
      type: 'category',
      data: [],
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Loss Rate',
      axisLabel: {
        formatter: '{value}',
      },
    },
    {
      type: 'value',
      name: 'Accuracy',
      axisLabel: {
        formatter: '{value}',
      },
    },
  ],
  series: [
    {
      name: 'Loss Rate',
      type: 'line',
      data: [],
    },
    {
      name: 'Accuracy',
      type: 'line',
      yAxisIndex: 1,
      data: [],
    },
  ],
}

export class ModelTrainingProgress extends React.Component {
  props: Props;

  render() {
    if (isEmpty(this.props.accuracy) || isEmpty(this.props.lossRate)) {
      return (
        <div className={classes['ModelTrainingProgress-container']}>
          <div style={{ color: '#337ab7', fontSize: '16px', fontWeight: 'bold' }}>
            <WrapperFormattedMessage id="labelingTool.dirTree.noData" />
          </div>
        </div>
      )
    }
    option.series[1].data = this.props.accuracy
    option.series[0].data = this.props.lossRate
    const tmp = []
    for (let i = 1; i <= this.props.lossRate.length; i += 1) {
      tmp.push(i)
    }
    option.xAxis[0].data = tmp
    return (
      <div className={classes['ModelTrainingProgress-container']}>
        <Chart option={option} style={{ height: '370px', overflow: 'none' }} />
      </div>
    )
  }
}

export default ModelTrainingProgress
