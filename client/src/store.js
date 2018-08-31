import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const middleware = [thunk]

const initialState = {
  cells: [[]],
  game: {
    status: 'playing',
    score: 0,
    resetOpen: false,
    time: 0,
    timerRunning: false,
    timerToReset: false,
    aboutOpen: false
  },
  board: {
    difficulty: 1,
    sizes: [
      {x: 9, y: 9},
      {x: 16, y: 16},
      {x: 30, y: 16},
      {x: 30, y: 30}
    ]
  },
  scores: [{
    date: "2018-08-17T18:41:55.272Z",
    score: 10,
    username: "placeholder",
    _id: "5b701b1ec7d449bb993"
  }]
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store;
