// 引入action
// 配置store， 中间件
// 开始测试

import * as licenseManagement from 'routes/LicenseManagement/routes/License/modules'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import nock from 'nock'
import 'isomorphic-fetch'
import * as Utils from 'Utils'

global.__HOST__ = 'http://172.22.34.220:50080/api'
const mockStore = configureStore([thunk])

describe('trainingOrJudging', () => {
  it('success', () => {
    const store = mockStore()
    nock(__HOST__)
    .put('device/op_mode')
    .reply(200, {
      code: 200000,
      result: null,
    })
    const tmp = {}
    store.dispatch(licenseManagement.trainingOrJudging(tmp)).then(() => {
      expect(Utils.showMessage).toBeCalledWith({ text: 'OK' })
      const list = store.getState().licenseList
      const actions = store.getActions()
      expect(actions.length).toBe(1)
      expect(actions).toEqual([
        {
          type: licenseManagement.GET_LICENSE_LIST,
          list,
        },
      ])
    })
  })
})
describe('save', () => {
  it('success', () => {
    const store = mockStore()
    nock(__HOST__)
    .put('license/device')
    .reply(200, {
      code: 200000,
      result: null,
    })
    const tmp = {}
    store.dispatch(licenseManagement.save(tmp)).then(() => {
      expect(Utils.showMessage).toBeCalledWith({ text: 'OK' })
      const list = store.getState().licenseList
      const actions = store.getActions()
      expect(actions.length).toBe(1)
      expect(actions).toEqual([
        {
          type: licenseManagement.GET_LICENSE_LIST,
          list,
        },
      ])
    })
  })
})
describe('activate', () => {
  it('success', () => {
    const store = mockStore()
    nock(__HOST__)
    .put('license/activate')
    .reply(200, {
      code: 200000,
      result: null,
    })
    const tmp = {}
    store.dispatch(licenseManagement.activate(tmp)).then(() => {
      expect(Utils.showMessage).toBeCalledWith({ text: 'OK' })
      const list = store.getState().licenseList
      const actions = store.getActions()
      expect(actions.length).toBe(1)
      expect(actions).toEqual([
        {
          type: licenseManagement.GET_LICENSE_LIST,
          list,
        },
      ])
    })
  })
})
describe('getLicense', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
      .post('license/serial_number')
      .reply(200, {
        code: 200000,
        result: null,
      })
      const tmp = {}
      store.dispatch(licenseManagement.getLicense(tmp)).then(() => {
        expect(Utils.showMessage).toBeCalledWith({ text: 'OK' })
        const list = store.getState().licenseList
        const actions = store.getActions()
        expect(actions.length).toBe(1)
        expect(actions).toEqual([
          {
            type: licenseManagement.GET_LICENSE_LIST,
            list,
          },
        ])
      })
    })
})
describe('getUserList', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
      .post('license/serial_number')
      .reply(200, {
        code: 200000,
        result: null,
      })
      const tmp = {}
      store.dispatch(licenseManagement.getUserList(tmp)).then(() => {
        expect(Utils.showMessage).toBeCalledWith({ text: 'OK' })
        const data = { result: [] }
        const actions = store.getActions()
        expect(actions.length).toBe(1)
        expect(actions).toEqual([
          {
            type: licenseManagement.GET_USER_LIST,
            data,
          },
        ])
      })
    })
})
describe('createUser', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
      .post('user')
      .reply(200, {
        code: 200000,
        result: null,
      })
      const tmp = {}
      store.dispatch(licenseManagement.createUser(tmp)).then(() => {
        expect(Utils.showMessage).toBeCalledWith({ text: 'OK' })
        const data = { result: [] }
        const actions = store.getActions()
        expect(actions.length).toBe(1)
        expect(actions).toEqual([
          {
            type: licenseManagement.GET_USER_LIST,
            data,
          },
        ])
      })
    })
})
describe('updateUser', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
      .post('user')
      .reply(200, {
        code: 200000,
        result: null,
      })
      const tmp = {}
      store.dispatch(licenseManagement.updateUser(tmp)).then(() => {
        expect(Utils.showMessage).toBeCalledWith({ text: 'OK' })
        const data = { result: [] }
        const actions = store.getActions()
        expect(actions.length).toBe(1)
        expect(actions).toEqual([
          {
            type: licenseManagement.GET_USER_LIST,
            data,
          },
        ])
      })
    })
})
describe('deleteUser', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
      .delete('user')
      .reply(200, {
        code: 200000,
        result: null,
      })
      const tmp = {}
      store.dispatch(licenseManagement.deleteUser(tmp)).then(() => {
        expect(Utils.showMessage).toBeCalledWith({ text: 'OK' })
        const data = { result: [] }
        const actions = store.getActions()
        expect(actions.length).toBe(1)
        expect(actions).toEqual([
          {
            type: licenseManagement.GET_USER_LIST,
            data,
          },
        ])
      })
    })
})
describe('getLicenseList ', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
      .get('devices')
      .reply(200, {
        code: 200000,
        result: null,
      })
      store.dispatch(licenseManagement.getLicenseList()).then(() => {
        expect(Utils.showMessage).toBeCalledWith({ text: 'OK' })
        const data = { result: [] }
        const actions = store.getActions()
        expect(actions.length).toBe(1)
        expect(actions).toEqual([
          {
            type: licenseManagement.GET_USER_LIST,
            data,
          },
        ])
      })
    })
})
describe('reload  ', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
      .get('devices')
      .reply(200, {
        code: 200000,
        result: null,
      })
      store.dispatch(licenseManagement.reload()).then(() => {
        expect(Utils.showMessage).toBeCalledWith({ text: 'OK' })
        const data = { result: [] }
        const actions = store.getActions()
        expect(actions.length).toBe(1)
        expect(actions).toEqual([
          {
            type: licenseManagement.GET_USER_LIST,
            data,
          },
        ])
      })
    })
})
describe('getEmail', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
      .get('api/ojs/userEmail')
      .reply(200, {
        code: 200000,
        result: null,
      })
      store.dispatch(licenseManagement.getEmail()).then(() => {
        expect(Utils.showMessage).toBeCalledWith({ text: 'OK' })
        const data = { result: [] }
        const actions = store.getActions()
        expect(actions.length).toBe(1)
        expect(actions).toEqual([
          {
            type: licenseManagement.GET_USER_LIST,
            data,
          },
          {
            type: licenseManagement.CHANGE_STATUS,
            payload: true,
          },
        ])
      })
    })
})