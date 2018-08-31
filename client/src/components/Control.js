import React from 'react'
import { connect } from 'react-redux'

import { initCells, endGame } from '../actions'

class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevDifficulty: 1
    }
  }

  componentDidUpdate() {
    if (this.props.game && this.props.game.status === 'ended') {
      console.log('Control component vows to end this game and reset')
    }
    if (this.props.board.difficulty !== this.state.difficulty) {
      this.setState({ difficulty: this.props.board.difficulty }, () => this.populateCells())
      this.props.endGame()
    }
  }

  componentWillMount() {
    this.populateCells()
  }

  populateCells() {
    console.log('Populating cells...')
    const width = this.props.board.sizes[this.props.board.difficulty].x
    const height = this.props.board.sizes[this.props.board.difficulty].y
    console.log('#=#=#=#=#=#=#=#=#=#')
    console.log(width, height)

    var constrTable = [];
    for (var i=0; i<height; i++) {
      const row = [];
      for (var j=0; j<width; j++) {
        row.push({
          type: 'empty',
          status: 'closed'
        })
      }
      constrTable.push(row)
    }

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
    this.props.initCells(constrTable)
    console.log(this.props.cells)
  }

  render() {
    return (
      <div />
    )
  }
}

const mapStateToProps = state => ({
  cells: state.cells,
  game: state.game,
  board: state.board
})

const mapDispatchToProps = dispatch => ({
  initCells: payload => dispatch(initCells(payload)),
  endGame: () => dispatch(endGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(Control)
