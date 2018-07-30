// 引入action
// 配置store， 中间件
// 开始测试

import * as labeling from 'routes/Offline/routes/Labeling/modules'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import nock from 'nock'
import 'isomorphic-fetch'
import * as Utils from 'Utils'

global.__HOST__ = 'http://172.22.34.220:50080/api'
const mockStore = configureStore([thunk])

describe('(Recux module) Labeling', () => {
  describe('(Action)', () => {
    const initState = {}

    it('getImageListByPath', () => {
      const store = mockStore(initState)
      nock(__HOST__)
      .post('labeling/images')
      .reply(200, {
        code: 200000,
        result: [
          {
            defectcode: [],
            isLabeled: false,
            path: '/test/test.jpg',
          },
        ],
      })
      store.dispatch(labeling.getImageListByPath([]))
      .then(() => {
        const actions = store.getActions()
        const data = [
          {
            index: 0,
            defectcode: [],
            isLabeled: false,
            path: '/test/test.jpg',
          },
        ]
        expect(actions.length).toBe(2)
        expect(actions).toEqual([
          {
            type: labeling.UPDATE_IMAGE_LIST_REMOVE_DEFECT_INFO,
            data,
          },
          {
            type: labeling.ISLABELED_LIST,
            data: {
              labeledType: 'all',
              imageList: data,
            },
          },
        ])
      })
    })

    // 可以测试一下失败后 getDirTree 有么有被调用
    describe('action getDirTree', () => {
      it('success', () => {
        const store = mockStore(initState)
        nock(__HOST__)
          .post('labeling/dirtree')
          .reply(200, {
            code: 200000,
            result: JSON.stringify({
              name: 'ARRAY',
            }),
          })

        store.dispatch(labeling.getDirTree())
          .then(() => {
            expect(store.getActions()).toEqual([
              {
                type: labeling.DIRTREE,
                data: [
                  {
                    name: 'ARRAY',
                  },
                ],
              },
            ])
          })
      })
      it('fault', () => {
        const store = mockStore(initState)
        nock(__HOST__)
          .post('labeling/dirtree')
          .reply(200, {
            code: 500000,
            message: 'error',
            result: null,
          })

        store.dispatch(labeling.getDirTree())
          .then(() => {
            expect(store.getActions().length).toBe(0)
          })
      })
    })

    //
    describe('action getImageListBySearch', () => {
      const initState = {}

      it('params', () => {
        const store = mockStore(initState)
        expect(store.dispatch(labeling.getImageListBySearch({}))).toBe(undefined)
        expect(store.dispatch(labeling.getImageListBySearch([]))).toBe(undefined)
        expect(store.dispatch(labeling.getImageListBySearch(123))).toBe(undefined)
      })

      it('success', () => {
        const store = mockStore(initState)
        nock(__HOST__)
          .get('labeling/image/filter?startTime=2018-04-1610:08:21&endTime=2018-04-1610:08:21&processId=processId&productId=productId&defectCode=defectCode')
          .reply(200, {
            code: 200000,
            result: [
              {
                isJudged: false,
                imagePath: 'a.jpg',
              },
            ],
          })

        store.dispatch(labeling.getImageListBySearch({
          startTime: { format: () => ('2018-04-1610:08:21') },
          endTime: { format: () => ('2018-04-1610:08:21') },
          defectCode: 'defectCode',
          processId: 'processId',
          productId: 'productId',
        }))
          .then(() => {
            expect(store.getActions()).toEqual([{
              type: labeling.SEARCH_IMAGE_LIST,
              data: [
                {
                  index: 0,
                  isJudged: false,
                  imagePath: 'a.jpg',
                  path: 'a.jpg',
                  isfilter: true,
                  isLabeled: false,
                },
              ],
            }])
          })
      })
    })

    // setSelectedImage

    it('action setSelectedImage', () => {
      const store = mockStore({
        labelingTool: {
          imageList: [
            {
              path: 'test.jpg',
              index: 0,
              isLabeled: false,
            },
          ],
        },
      })
      const info = {
        path: 'test.jpg',
        index: 0,
        isLabeled: false,
        defectInfo: [1, 2],
      }
      store.dispatch(labeling.setSelectedImage(info))
      const actions = store.getActions()
      expect(actions.length).toBe(2)
      expect(actions[0]).toEqual({
        type: labeling.SELECTED_IMAGE_INFO,
        data: info,
      })
      expect(actions[1]).toEqual({
        type: labeling.IMAGE_LIST,
        data: [
          {
            path: 'test.jpg',
            index: 0,
            isLabeled: true,
          },
        ],
      })
    })

    // getSelectInfo
    describe('action getSelectInfo', () => {
      it('fault', () => {
        const store = mockStore({})
        nock(__HOST__)
          .get('labeling/image/search')
          .reply(200, {
            code: 500000,
            message: '',
            result: null,
          })

        store.dispatch(labeling.getSelectInfo())
          .then(() => {
            expect(store.getActions().length).toBe(0)
          })
      })
      it('success', () => {
        const store = mockStore({
          labelingTool: {
            defaultDefectCode: ['1-1'],
          },
        })
        const defectList = [
          {
            defectId: 1,
            defectCode: '1',
          },
          {
            defectId: 2,
            defectCode: '2',
          },
        ]
        const product = []
        const process = []

        nock(__HOST__)
          .get('labeling/image/search')
          .reply(200, {
            code: 200000,
            result: {
              defect: defectList,
              process,
              product,
            },
          })

        store.dispatch(labeling.getSelectInfo())
          .then(() => {
            const actions = store.getActions()
            expect(actions.length).toBe(2)
            expect(actions[0]).toEqual({
              type: labeling.DEFAULT_DEFECT_CODE,
              data: ['1-1'],
            })
            expect(actions[1]).toEqual({
              type: labeling.PRODUCT_PROCESS_DEFECTCODE,
              data: {
                defect: defectList,
                product,
                process,
              },
            })
          })
      })
    })


    // setDefaultDefectCode
    describe('action setDefaultDefectCode', () => {
      const initState = {
        labelingTool: {
          defaultDefectCode: [
            '1-1',
          ],
        },
      }
      it('fault', () => {
        const store = mockStore(initState)

        store.dispatch(labeling.setDefaultDefectCode(''))
        expect(store.getActions().length).toBe(0)

        store.dispatch(labeling.setDefaultDefectCode('1-1'))
        expect(store.getActions().length).toBe(0)
      })

      it('callback', () => {
        const store = mockStore(initState)
        const mockFunc = jest.fn()
        store.dispatch(labeling.setDefaultDefectCode('1-1', 'add', mockFunc))
        expect(mockFunc).toBeCalled()
      })

      it('add success', () => {
        const store = mockStore(initState)
        store.dispatch(labeling.setDefaultDefectCode('1-2'))
        expect(store.getActions()).toEqual([{
          type: labeling.DEFAULT_DEFECT_CODE,
          data: ['1-1', '1-2'],
        }])
      })

      it('delete success', () => {
        const store = mockStore(initState)
        store.dispatch(labeling.setDefaultDefectCode('1-1', 'del'))
        expect(store.getActions()).toEqual([{
          type: labeling.DEFAULT_DEFECT_CODE,
          data: [],
        }])
      })
    })

    describe('action addDefectCode', () => {
      const initState = {
        labelingTool: {
          defectCodeList: [
            {
              defectId: 1,
              defectCode: 'Code_1',
            },
          ],
        },
      }
      it('fault', () => {
        const store = mockStore(initState)
        store.dispatch(labeling.addDefectCode(''))
        expect(store.getActions().length).toBe(0)
      })

      it('success', () => {
        const store = mockStore(initState)
        nock(__HOST__)
          .post('labeling/defect')
          .reply(200, {
            code: 200000,
            result: 2,
          })

        store.dispatch(labeling.addDefectCode('test'))
          .then(() => {
            expect(store.getActions()).toEqual([{
              type: labeling.DEFECT_CODE_LIST,
              data: [
                {
                  defectId: 1,
                  defectCode: 'Code_1',
                },
                {
                  defectId: 2,
                  defectCode: 'test',
                },
              ],
            }])
          })
      })
    })

    it('action updateControlPanel', () => {
      const store = mockStore(initState)
      store.dispatch(labeling.updateControlPanel({}))
      expect(store.getActions()).toEqual([{
        type: labeling.UPDATE_CONTROLPANEL,
        data: {},
      }])
    })

    describe('action changeSelectedImageByButton', () => {
      let initState = {
        labelingTool: {
          selectedImageInfo: {
            path: '1.jpg',
            index: 0,
          },
          isLabedList: {
            imageList: [
              {
                path: '1.jpg',
                index: 0,
              },
              {
                path: '2.jpg',
                index: 1,
              },
              {
                path: '3.jpg',
                index: 2,
              },
            ],
          },
        },
      }

      it('next', () => {
        const store = mockStore(initState)
        nock(__HOST__)
        .get('labeling/image/defect/info?imagePath=2.jpg')
        .reply(200, {
          code: 500000,
          message: '',
          result: null,
        })
        store.dispatch(labeling.changeSelectedImageByButton('next'))
        expect(store.getActions()[0]).toEqual({
          type: labeling.IS_BUTTON_DISABLED,
          data: {
            nextDisabled: false,
            prevDisabled: false,
          },
        })
      })

      it('next end', () => {
        nock(__HOST__)
        .get('labeling/image/defect/info?imagePath=3.jpg')
        .reply(200, {
          code: 500000,
          message: '',
          result: null,
        })
        initState.labelingTool.selectedImageInfo.path = '2.jpg'
        initState.labelingTool.selectedImageInfo.index = 1

        const store = mockStore(initState)
        store.dispatch(labeling.changeSelectedImageByButton('next'))
        expect(store.getActions()[0]).toEqual({
          type: labeling.IS_BUTTON_DISABLED,
          data: {
            nextDisabled: true,
            prevDisabled: false,
          },
        })
      })

      it('prev end', () => {
        nock(__HOST__)
        .get('labeling/image/defect/info?imagePath=1.jpg')
        .reply(200, {
          code: 500000,
          message: '',
          result: null,
        })
        initState.labelingTool.selectedImageInfo.path = '2.jpg'
        initState.labelingTool.selectedImageInfo.index = 1
        const store = mockStore(initState)

        store.dispatch(labeling.changeSelectedImageByButton('prev'))
        expect(store.getActions()[0]).toEqual({
          type: labeling.IS_BUTTON_DISABLED,
          data: {
            nextDisabled: false,
            prevDisabled: true,
          },
        })
      })

      it('prev', () => {
        nock(__HOST__)
        .get('labeling/image/defect/info?imagePath=2.jpg')
        .reply(200, {
          code: 500000,
          message: '',
          result: null,
        })
        initState.labelingTool.selectedImageInfo.path = '3.jpg'
        initState.labelingTool.selectedImageInfo.index = 2
        const store = mockStore(initState)

        store.dispatch(labeling.changeSelectedImageByButton('prev'))
        expect(store.getActions()[0]).toEqual({
          type: labeling.IS_BUTTON_DISABLED,
          data: {
            nextDisabled: false,
            prevDisabled: false,
          },
        })
      })
    })

    describe('action updateKeyCode', () => {
      it('success', () => {
        const store = mockStore({})
        nock(__HOST__, {
          reqheaders: {
            'Content-Type': 'application/json',
          },
        })
          .put('labeling/shortcuts')
          .reply(200, {
            code: 200000,
            message: '',
            result: null,
          })

        const fn = jest.fn()
        store.dispatch(labeling.updateKeyCode({}, fn))
          .then(() => {
            expect(fn).toBeCalledWith(true)
            expect(store.getActions()).toEqual([{
              type: labeling.UPDATE_KEY_CODE,
              data: {},
            }])
          })
      })
    })

    describe('action initKeyCode', () => {
      it('success', () => {
        const store = mockStore()
        nock(__HOST__)
          .get('labeling/shortcuts')
          .reply(200, {
            code: 200000,
            result: {},
          })

        store.dispatch(labeling.initKeyCode())
          .then(() => {
            expect(store.getActions()).toEqual([{
              type: labeling.UPDATE_KEY_CODE,
              data: {},
            }])
          })
      })
    })

    it('action updateResetKeyCodeStatus', () => {
      const store = mockStore(initState)
      store.dispatch(labeling.updateResetKeyCodeStatus(false))
      expect(store.getActions()).toEqual([{
        type: labeling.UPDATE_RESET_KEYCODE_STATUS,
        data: false,
      }])
    })

    it('action updateAddLabeling', () => {
      const store = mockStore(initState)
      store.dispatch(labeling.updateAddLabeling({}))
      expect(store.getActions()).toEqual([{
        type: labeling.UPDATE_ADD_LABELING,
        data: {},
      }])
    })

    it('action updateStoreState', () => {
      const store = mockStore(initState)
      store.dispatch(labeling.updateStoreState({}))
      expect(store.getActions()).toEqual([{
        type: labeling.UPDATE_STORE_STATE,
        data: {},
      }])
    })

    it('action updateStoreState', () => {
      const store = mockStore(initState)
      store.dispatch(labeling.setSelectedDefectCode({}))
      expect(store.getActions()).toEqual([{
        type: labeling.SELECTED_DEFECT_CODE,
        data: {},
      }])
    })

    describe('action saveLabel', () => {
      it('lack of defectCode addLabeilng', () => {
        const store = mockStore({
          labelingTool: {
            selectedImageInfo: { defectInfo: [] },
            addLabeling: { path: 'test.jpg' },
            imageList: [],
            isLabedList: {
              labeledType: 'all',
            },
          },
        })

        store.dispatch(labeling.saveLabel())
        expect(Utils.showMessage).toBeCalledWith({ text: Utils.stringToFirstUpperCase('please select defect code'), type: 'warning' })
      })

      it('save success', () => {
        const store = mockStore({
          labelingTool: {
            selectedImageInfo: { defectInfo: [] },
            addLabeling: {
              path: 'test.jpg',
              x: 0,
              y: 0,
              endX: 10,
              endY: 10,
              defectCode: '1',
              defectId: 1,
              num: 11,
              preview: '',
            },
            imageList: [],
            isLabedList: {
              labeledType: 'all',
            },
          },
        })

        labeling.updateStoreState = jest.fn()

        nock(__HOST__)
          .put('labeling/label')
          .reply(200, {
            code: 200000,
            message: 'OK',
            result: true,
          })

        store.dispatch(labeling.saveLabel())
          .then(() => {
            expect(Utils.showMessage).toBeCalledWith({ text: 'OK' })
            expect(store.getActions()).toEqual([
              {
                type: labeling.UPDATE_STORE_STATE,
                data: { addLabeling: {}, selectedImageInfo: { defectInfo: [] } },
              },
              {
                type: labeling.IMAGE_LIST,
                data: [],
              },
              {
                type: labeling.ISLABELED_LIST,
                data: {
                  labeledType: 'all',
                  imageList: [],
                },
              },
            ])
          })

      })

      it('response code 500000', () => {
        const store = mockStore({
          labelingTool: {
            selectedImageInfo: { defectInfo: [] },
            addLabeling: {
              path: 'test.jpg',
              x: 0,
              y: 0,
              endX: 10,
              endY: 10,
              defectCode: '1',
              defectId: 1,
              num: 11,
              preview: '',
            },
            imageList: [],
            isLabedList: {
              labeledType: 'all',
            },
          },
        })
        nock(__HOST__)
          .put('labeling/label')
          .reply(200, {
            code: 500000,
            message: 'savelabel error',
            result: null,
          })

        store.dispatch(labeling.saveLabel())
          .then(() => {
            expect(Utils.showMessage).toBeCalledWith({
              text: Utils.stringToFirstUpperCase('savelabel error'),
              type: 'error',
            })
          })

      })

    })


    describe('action getDefectInfoByPath', () => {
      beforeEach(() => {
        Utils.showMessage = jest.fn()
      })
      it('same path', () => {
        const store = mockStore({
          labelingTool: {
            selectedImageInfo: {
              path: 'test.jpg',
            },
          },
        })

        expect(store.dispatch(labeling.getDefectInfoByPath({
          path: 'test.jpg',
        }))).toBeUndefined()
      })

      it('image info', () => {
        const store = mockStore({
          labelingTool: {
            selectedImageInfo: {
              path: 'test2.jpg',
            },
          },
        })

        expect(store.dispatch(labeling.getDefectInfoByPath({
          path: 'test.jpg',
          defectId: 1,
          defectCode: '1',
          defectCoordinate: '0,0,10,10',
          isfilter: true,
          isLabeled: false,
        }))).toBeUndefined()

        expect(store.getActions()).toEqual([
          {
            type: labeling.SELECTED_IMAGE_INFO,
            data: {},
          },
          {
            type: labeling.UPDATE_ADD_LABELING,
            data: {},
          },
          {
            type: labeling.UPDATE_CONTROLPANEL,
            data: { add: 0, zoom: 1 },
          },
          {
            type: labeling.SELECTED_IMAGE_INFO,
            data: {
              path: 'test.jpg',
              defectId: 1,
              defectCode: '1',
              defectCoordinate: '0,0,10,10',
              isfilter: true,
              isLabeled: false,
              defectInfo: [{
                num: 1,
                id: 'defectinfo_0',
                defectCode: '1',
                defectId: 1,
                coordinate: '0_0_10_10',
              }],
            },
          },
        ])
      })

      it('result null', () => {
        const store = mockStore({
          labelingTool: {
            selectedImageInfo: {
              path: 'test2.jpg',
            },
          },
        })

        const info = {
          path: 'test.jpg',
          defectId: 1,
          defectCode: '1',
          defectCoordinate: '0,0,10,10',
          isfilter: false,
          isLabeled: false,
        }

        nock(__HOST__)
          .get('labeling/image/defect/info?imagePath=test.jpg')
          .reply(200, {
            code: 200000,
            message: '',
            result: null,
          })

        store.dispatch(labeling.getDefectInfoByPath(info))
          .then(() => {
            const actions = store.getActions()
            expect(actions[actions.length - 1]).toEqual({
              type: labeling.SELECTED_IMAGE_INFO,
              data: {
                ...info,
                defectInfo: [],
              },
            })
          })
      })

      it('response code 500000', () => {
        const store = mockStore({
          labelingTool: {
            selectedImageInfo: {
              path: 'test2.jpg',
            },
          },
        })

        const info = {
          path: 'test.jpg',
          defectId: 1,
          defectCode: '1',
          defectCoordinate: '0,0,10,10',
          isfilter: false,
          isLabeled: false,
        }

        nock(__HOST__)
          .get('labeling/image/defect/info?imagePath=test.jpg')
          .reply(200, {
            code: 500000,
            message: 'getDefectInfoByPath error',
            result: null,
          })

        store.dispatch(labeling.getDefectInfoByPath(info))
          .then((data) => {
            expect(Utils.showMessage).toBeCalledWith({ text: Utils.stringToFirstUpperCase('getDefectInfoByPath error'), type: 'error' })
            expect(data).toBeUndefined()
          })
      })

      it('success 200000', () => {
        const store = mockStore({
          labelingTool: {
            selectedImageInfo: {
              path: 'test2.jpg',
            },
          },
        })

        const info = {
          path: 'test.jpg',
          defectId: 1,
          defectCode: '1',
          defectCoordinate: '0,0,10,10',
          isfilter: false,
          isLabeled: false,
        }

        Utils.defectInfoSplit = jest.fn(() => [])
        nock(__HOST__)
          .get('labeling/image/defect/info?imagePath=test.jpg')
          .reply(200, {
            code: 200000,
            message: '',
            result: {
              defectInfo: '{}',
            },
          })

        store.dispatch(labeling.getDefectInfoByPath(info))
          .then(() => {
            const actions = store.getActions()
            expect(actions[actions.length - 1]).toEqual({
              type: labeling.SELECTED_IMAGE_INFO,
              data: {
                ...info,
                defectInfo: [],
              },
            })
            expect(Utils.defectInfoSplit).toBeCalled()
          })
      })
    })
  })
})
