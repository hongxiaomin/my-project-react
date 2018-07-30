import React from 'react'
import { shallow } from 'enzyme'
import { SearchImages } from 'routes/ModelManagement/routes/ModelManagement/components/Test/SearchImages'

describe('(Component) SearchImages', () => {
  const dispatch = jest.fn()
  const rowDetail = 1
  const props = {
    process: { processId: 1, processName: '1' },
    product: { productId: 1, productName: '1' },
    defect: { defectId: 1, defectCode: '1' },
  }
  const { process, product, defect } = props
  const wrapper = shallow(
    <SearchImages
      dispatch={dispatch}
      rowDetail={rowDetail}
      process={process}
      product={product}
      defect={defect}
    />,
  )
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
