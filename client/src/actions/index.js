import {
  INIT_CELLS,
  OPEN_CELL,
  ADD_POINT,
  END_GAME,
  RESET_BOARD,
  INIT_SCORES,
  ADD_SCORE,
  UPDATE_SCORE,
  CHANGE_BOARD
 } from './types'

export const initCells = payload => ({
  type: INIT_CELLS,
  payload
})

export const openCell = payload => ({
  type: OPEN_CELL,
  payload
})

export const addPoint = payload => ({
  type: ADD_POINT,
  payload
})

export const endGame = () => ({
  type: END_GAME
})

export const resetBoard = payload => ({
  type: RESET_BOARD,
  payload
})

export const initScores = payload => ({
  type: INIT_SCORES,
  payload
})

export const addScore = payload => ({
  type: ADD_SCORE,
  payload
})

export const updateScore = payload => ({
  type: UPDATE_SCORE,
  payload
})

export const changeBoard = payload => ({
  type: CHANGE_BOARD,
  payload
})
