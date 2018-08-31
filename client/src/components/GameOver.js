import React from 'react'
import { connect } from 'react-redux'

import { endGame, resetBoard, addScore, updateScore } from '../actions'

class GameOver extends React.Component {
  userReset() {
    this.props.endGame()
    // make a new table for state
    const width = this.props.board.sizes[this.props.board.difficulty].x
    const height = this.props.board.sizes[this.props.board.difficulty].y

    var constrTable = []
    for (var i=0; i<height; i++) {
      var row = []
      for (var j=0; j<width; j++) {
        row.push({
          type: 'empty',
          status: 'closed'
        })
      }
      constrTable.push(row)
    }
    // populate table with bombs
    var bombs = Math.floor((width * height) * 0.16);
    console.log('This many bombs: ', bombs)
    while (bombs > 0) {
      function addBomb() {
        var x = Math.floor(Math.random() * height)
        var y = Math.floor(Math.random() * width)
        if (constrTable[x][y].type === 'empty') {
          constrTable[x][y].type = 'bomb'
        } else {
          addBomb()
        }
      }
      addBomb()
      bombs -= 1
    }
    // send new table to state
    this.props.resetBoard(constrTable)
  }

  handleSubmit(e) {
    e.preventDefault()
    const username = /\S/.test(this.username.value) ? this.username.value : 'Anon'
    fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        score: this.props.score
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.err) {
        throw res.err
      } else {
        console.log(res)
        if (res.createdScore) {
          this.props.addScore(res.createdScore)
        } else if (res.updatedScore) {
          const payload = [...this.props.scores]
          var updateIdx = 0;
          payload.forEach((each, index) => {
            if (each.username === res.updatedScore.username) { updateIdx = index }
          })
          payload[updateIdx] = res.updatedScore
          this.props.updateScore(payload)
        }
        this.userReset()
      }
    })
  }

  render() {
    return (
      <div>
        <p>Game Over!</p>
        <p>You got exploded. No amount of mathematics could have prevented this.</p>
        <p>F to pay respects.</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type='text' name='username' placeholder='Username for score board' ref={e => this.username = e} />
          <button>Add Score and Reset</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  scores: state.scores,
  board: state.board
})

const mapDispatchToProps = dispatch => ({
  endGame: () => dispatch(endGame()),
  resetBoard: payload => dispatch(resetBoard(payload)),
  addScore: payload => dispatch(addScore(payload)),
  updateScore: payload => dispatch(updateScore(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)
