import { INIT_SCORES, ADD_SCORE, UPDATE_SCORE } from '../actions/types'

const scoresReducer = (state = [], action) => {
  switch(action.type) {
    case INIT_SCORES:
      return action.payload
    case ADD_SCORE:
      return [...state, action.payload]
    case UPDATE_SCORE:
      return action.payload
    default:
      return state
  }
}

export default scoresReducer
