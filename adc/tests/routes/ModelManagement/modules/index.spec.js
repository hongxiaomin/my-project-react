// 引入action
// 配置store， 中间件
// 开始测试

import * as modelManagement from 'routes/ModelManagement/routes/ModelManagement/modules'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import nock from 'nock'
import 'isomorphic-fetch'

global.__HOST__ = 'http://172.22.34.220:50080/api'
const mockStore = configureStore([thunk])

describe('(Redux module) ModelManagement', () => {
  describe('(Action)', () => {
    const initState = {}
    it('imageListCheck success', () => {
      const store = mockStore(initState)
      nock(__HOST__)
      .post('labeling/label/search')
      .reply(200, {
        code: 200000,
        result: [
          {
            targetCode: [{ defectId: '1' }],
            othersCode: [{ defectId: '2' }],
          },
        ],
      })
      const tmp = {
        dateRange: { startTime: '2018-04-03 13:50:46', endTime: '2018-04-18 13:50:46' },
        othersCode: { defectId: [] },
        processId: 2,
        productId: ['1', '2'],
        targetCode: { defectId: ['1', '2'] },
      }
      store.dispatch(modelManagement.imageListCheck(tmp))
      .then(() => {
        const actions = store.getActions()
        const data = [
          {
            targetCode: [{ defectId: '1' }],
            othersCode: [{ defectId: '2' }],
          },
        ]
        expect(actions.length).toBe(1)
        expect(actions).toEqual([
          {
            type: modelManagement.ALL_DEFCTCODE,
            data,
          },
        ])
      })
    })
    it('getImageByPath success', () => {
      const store = mockStore(initState)
      nock(__HOST__)
      .post('model/images')
      .reply(200, {
        code: 200000,
        result: {
          total: 10,
        },
      })
      const tmp = {
        id: 1,
        sourceType: 'path',
        imageSource: 'sfsfsfdf',
      }
      store.dispatch(modelManagement.getImageByPath(tmp))
      .then(() => {
        const actions = store.getActions()
        const data = {
          total: 10,
        }
        expect(actions.length).toBe(1)
        expect(actions).toEqual([
          {
            type: modelManagement.TESTING_TOTAL_COUNT,
            data,
          },
        ])
      })
    })
  })
  describe('action getModelList', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .get('models')
        .reply(200, {
          code: 200000,
          result: [{}],
        })

      store.dispatch(modelManagement.getModelList())
      .then(() => {
        expect(store.getActions()).toEqual([{
          type: modelManagement.MODEL_LIST,
          data: [{}],
        }])
      })
    })
  })
  describe('action createModel', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .post('model')
        .reply(200, {
          code: 200000,
          result: null,
        })
      const state = {}
      const cb = jest.fn()
      const cb2 = jest.fn()
      const getModelList = jest.fn()
      store.dispatch(modelManagement.createModel(state, cb, cb2))
      .then(() => {
        store.dispatch(getModelList())
      })
    })
  })
  describe('action updateModel', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .post('model')
        .reply(200, {
          code: 200000,
          result: null,
        })
      const data = {}
      const getModelList = jest.fn()
      store.dispatch(modelManagement.updateModel(data))
      .then(() => {
        store.dispatch(getModelList())
      })
    })
  })
  describe('action importModel', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .post('model/default')
        .reply(200, {
          code: 200000,
          result: null,
        })
      const data = { name: 'model1' }
      const getModelList = jest.fn()
      store.dispatch(modelManagement.importModel(data))
      .then(() => {
        store.dispatch(getModelList())
      })
    })
  })
  describe('action model', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .put('model')
        .reply(200, {
          code: 200000,
          result: null,
        })
      const data = { actionType: 'delete' }
      const getModelList = jest.fn()
      store.dispatch(modelManagement.actionModel(data))
      .then(() => {
        store.dispatch(getModelList())
      })
    })
  })
  describe('default model', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .put('model/default')
        .reply(200, {
          code: 200000,
          result: null,
        })
      const data = {}
      const getModelList = jest.fn()
      store.dispatch(modelManagement.defaultModel(data))
      .then(() => {
        store.dispatch(getModelList())
      })
    })
  })
  describe('delete model', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .delete('model')
        .reply(200, {
          code: 200000,
          result: null,
        })
      const data = {}
      const getModelList = jest.fn()
      store.dispatch(modelManagement.deleteModel(data))
      .then(() => {
        store.dispatch(getModelList())
      })
    })
  })
  describe('action train model', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .post('model/progress')
        .reply(200, {
          code: 200000,
          result: null,
        })
      const data = {}
      store.dispatch(modelManagement.actionTrainModel(data))
    })
  })
  describe('getLicenseList', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .get('devices')
        .reply(200, {
          code: 200000,
          result: null,
        })
      store.dispatch(modelManagement.getLicenseList())
      .then(() => {
        expect(store.getActions()).toEqual([{
          type: modelManagement.GET_LICENSE_LIST,
          data: [{}],
        }])
      })
    })
  })
  describe('getModelDetail', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .get('model?modelId=1')
        .reply(200, {
          code: 200000,
          result: null,
        })
      store.dispatch(modelManagement.getModelDetail())
      .then(() => {
        expect(store.getActions()).toEqual([{
          type: modelManagement.MODEL_DETAIL,
          data: [{}],
        }])
      })
    })
  })
  describe('getModelTrainDetail', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .get('model/progress?modelId=1&state=training')
        .reply(200, {
          code: 200000,
          result: null,
        })
      store.dispatch(modelManagement.getModelTrainDetail())
      .then(() => {
        expect(store.getActions()).toEqual([{
          type: modelManagement.UPDATE_MODELLIST_TRAIN,
          data: [{}],
        }])
      })
    })
  })
  describe('getModelTestDetail', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .get('model/progress?modelId=1&state=testing')
        .reply(200, {
          code: 200000,
          result: null,
        })
      store.dispatch(modelManagement.getModelTestDetail())
      .then(() => {
        expect(store.getActions()).toEqual([{
          type: modelManagement.UPDATE_MODELLIST_TEST,
          data: [{}],
        }])
      })
    })
  })
  describe('getSelectInfo', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .get('users')
        .reply(200, {
          code: 200000,
          result: null,
        })
      store.dispatch(modelManagement.getSelectInfo())
      .then(() => {
        expect(store.getActions()).toEqual([{
          type: modelManagement.PRODUCT_PROCESS_CODE,
          data: [{}],
        }])
      })
    })
  })
  describe('getTestResultList', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .get('model/testing/result?modelId=1')
        .reply(200, {
          code: 200000,
          result: null,
        })
      store.dispatch(modelManagement.getTestResultList())
      .then(() => {
        expect(store.getActions()).toEqual([{
          type: modelManagement.TEST_RESULT_LIST,
          data: [{}],
        }])
      })
    })
  })
  describe('getTestResultType', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .get('model/defect?modelId=1')
        .reply(200, {
          code: 200000,
          result: null,
        })
      store.dispatch(modelManagement.getTestResultType())
      .then(() => {
        expect(store.getActions()).toEqual([{
          type: modelManagement.GET_MODEL_TEST_RESULT_TYPE,
          data: [{}],
        }])
      })
    })
  })
  describe('updateConfidence', () => {
    it('success', () => {
      const store = mockStore()
      nock(__HOST__)
        .put('model/defect')
        .reply(200, {
          code: 200000,
          result: null,
        })
      store.dispatch(modelManagement.updateConfidence())
    })
  })
})
