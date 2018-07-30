import React from 'react'
import { shallow, mount } from 'enzyme'
import { EditUser } from 'routes/LicenseManagement/routes/License/components/Edit/Edit'

describe('(Component) EditUser', () => {
  const isOpen = false
  const dispatch = jest.fn()
  const toggleDialog = jest.fn()
  const defaultValue = {}
  it('render normally', () => {
    const wrapper = mount(
      <EditUser
        isOpen={isOpen}
        dispatch={dispatch}
        toggleDialog={toggleDialog}
        defaultValue={defaultValue}
      />,
    )
    // expect(wrapper.ref('f').prop('dialogTitle')).to.equal('Edit User')
    expect(wrapper).toMatchSnapshot()
  })
//   it('render button click', () => {
//     const wrapper = shallow(
//       <EditUser
//         isOpen={isOpen}
//         dispatch={dispatch}
//         toggleDialog={toggleDialog}
//         defaultValue={defaultValue}
//       />,
//     )
//     wrapper.find('button').at(0).simulate('click')
//     expect(wrapper.state('isOpen')).toEqual(true)
//     wrapper.find('Dialog').at(0).simulate('change')
//     // expect(wrapper.state('isOpen')).toEqual(true)
//     expect(wrapper).toMatchSnapshot()
//   })
})
