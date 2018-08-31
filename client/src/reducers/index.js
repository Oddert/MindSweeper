import { combineReducers } from 'redux';

import cellsReducer from './cellsReducer'
import gameReducer from './gameReducer'
import scoresReducer from './scoresReducer'
import boardReducer from './boardReducer'

// const placeholder = (state = {}, action) => state

const rootReducer = combineReducers({
  cells: cellsReducer,
  game: gameReducer,
  board: boardReducer,
  scores: scoresReducer
})

export default rootReducer;
