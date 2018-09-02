import { INIT_CELLS, OPEN_CELL, RESET_BOARD } from '../actions/types'
import initialState from '../InitialState'

const cellReducer = (state = initialState.cells, action) => {
  switch(action.type) {
    case INIT_CELLS:
      return action.payload
    case OPEN_CELL:
      return action.payload
    case RESET_BOARD:
      return action.payload
    default:
      return state
  }
}

export default cellReducer
