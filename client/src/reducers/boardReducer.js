import { CHANGE_BOARD } from '../actions/types'
import initialState from '../InitialState'

const boardReducer = (state = initialState.board, action) => {
  switch(action.type) {
    case CHANGE_BOARD:
      return Object.assign({}, state, { difficulty: action.payload })
    default:
      return state
  }
}

export default boardReducer
