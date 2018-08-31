import { CHANGE_BOARD } from '../actions/types'

const boardReducer = (state = {
  difficulty: 1,
  sizes: [
    {x: 9, y: 9},
    {x: 16, y: 16},
    {x: 30, y: 16}
  ]
}, action) => {
  switch(action.type) {
    case CHANGE_BOARD:
      return Object.assign({}, state, { difficulty: action.payload })
    default:
      return state
  }
}

export default boardReducer
