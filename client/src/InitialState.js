const initialState = {
  cells: [[]],
  game: {
    status: 'playing',
    score: 0,
    resetOpen: false,
    time: 0,
    timerRunning: false,
    timerToReset: false,
    aboutOpen: true,
    background: 0
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

export default initialState
