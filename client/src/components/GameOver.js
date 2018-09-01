import React from 'react'
import { connect } from 'react-redux'

import { endGame, resetBoard, addScore, updateScore, toggleReset } from '../actions'

import './styles/GameOver.css'

class GameOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cover: true
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ cover: false })
    }, 1000)
  }

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
    var bombs = Math.floor((width * height) * 0.12);
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
      <div className='gameOver-container'>
        <div className='gameOver'>
          <div className='gameOver-header'>
            <div className='gameOver-flex'></div>
            <h2 className='gameOver-flex title'>Game Over!</h2>
            <div className='gameOver-flex'>
              <button className='close' onClick={() => this.props.toggleReset()}>X</button>
            </div>
          </div>
          <h4>Score: {this.props.score}</h4>
          <h3>You got exploded. No amount of mathematics could have prevented this.</h3>
          <h4 className='f'>F to pay respects.</h4>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type='text' name='username' placeholder='Username for score board' ref={e => this.username = e} />
            <button className='submit'>Add Score and Reset</button>
          </form>
          <button className='submit reset' onClick={this.userReset.bind(this)}>Reset Board (dont add name)</button>
        </div>
        {this.state.cover ? <div className='gameOver-spam-cover'></div> : ''}
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
  updateScore: payload => dispatch(updateScore(payload)),
  toggleReset: () => dispatch(toggleReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)
