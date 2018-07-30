import { createActions, handleActions } from 'redux-actions'
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE = 'COUNTER_DOUBLE'

// ------------------------------------
// Actions
// ------------------------------------
// increment()  => { type: 'COUNTER_INCREMENT' }
// increment(3) => { type: 'COUNTER_INCREMENT', payload: 3 }
export const { counterIncrement, counterDouble } = createActions(
  COUNTER_INCREMENT,
  COUNTER_DOUBLE,
)

// ------------------------------------
// Async actions
// ------------------------------------
/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export const doubleAsync = () => dispatch => new Promise((resolve) => {
  setTimeout(() => {
    dispatch(counterDouble())
    resolve()
  }, 200)
})

/*

*/
const initialState = 1
export const counterReducer = handleActions({
  [counterIncrement](state, action) {
    return state + action.payload
  },
  [counterDouble](state) {
    return state * 2
  },
}, initialState)
