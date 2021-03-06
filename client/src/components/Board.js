import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './styles/Board.css'

import Cell from './Cell';
import GameOver from './GameOver'
import Banner from './Banner'


class Board extends React.Component {
  generateCols(rowIdx) {
    let height = this.props.board.sizes[this.props.board.difficulty].x
    const cols = []
    for (var i=0; i<height; i++) {
      cols.push(<Cell key={'row_'+i} row={rowIdx} col={i} />)
    }
    return cols
  }

  generateRows() {
    let length = this.props.board.sizes[this.props.board.difficulty].y
    const rows = []
    for (var i=0; i<length; i++) {
      rows.push(<tr key={'col_'+i}>{this.generateCols(i)}</tr>)
    }
    return rows
  }

  render() {
    return (
      <div className='board-container'>
        {this.props.game.status === 'ended' && this.props.game.resetOpen ?
          <GameOver score={this.props.game.score} /> :
          ''
        }
        <Banner />
        <table>
          <tbody>
            {this.generateRows()}
          </tbody>
        </table>
      </div>
    )
  }
}

Board.propTypes = {
  board: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
}

const matchStateToProps = state => ({
  game: state.game,
  board: state.board
})

export default connect(matchStateToProps, null)(Board)
