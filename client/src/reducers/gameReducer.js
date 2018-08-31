import {
  ADD_POINT,
  END_GAME,
  TOGGLE_RESET,
  UPDATE_TIME,
  TIMER_TO_RESET,
  TOGGLE_ABOUT
} from '../actions/types'

const gameReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_POINT:
      return action.payload ? Object.assign({}, state, {
        status: 'ended', resetOpen: true, timerRunning: false, timerToReset: true
      }) : Object.assign({}, state, {
        score: state.score + 1, timerRunning: true
      })
    case END_GAME:
      return Object.assign({}, state, {score: 0, time: 0, timerRunning: false, status: 'playing'})
    case TOGGLE_RESET:
      return Object.assign({}, state, { resetOpen: !state.resetOpen })
    case UPDATE_TIME:
      return Object.assign({}, state, { time: action.payload })
    case TIMER_TO_RESET:
      return Object.assign({}, state, { timerToReset: false })
    case TOGGLE_ABOUT:
      return Object.assign({}, state, { aboutOpen: !state.aboutOpen })
    default:
      return state
  }
}

export default gameReducer
