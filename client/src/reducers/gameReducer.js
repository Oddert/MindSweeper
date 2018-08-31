import { ADD_POINT, END_GAME } from '../actions/types'

const gameReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_POINT:
      if (action.payload) {
        return Object.assign({}, state, {status: 'ended'})
      }
      return Object.assign({}, state, {score: state.score += 1})
    case END_GAME:
      return Object.assign({}, state, {score: 0, status: 'playing'})
    default:
      return state
  }
}

export default gameReducer
