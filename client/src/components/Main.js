import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Board from './Board';
import Control from './Control'
import ScoreBoard from './ScoreBoard'
import Interface from './Interface'

class Main extends React.Component {
  render() {
    const classIn = this.props.game ? `App back_${this.props.game.background}` : 'App'

    return (
      <div className={classIn}>
        <header>
          <h1>Welcome to MindSweeper!</h1>
          <h3>All the fun of Minesweeper but without any of the maths</h3>
          <div className='codeLinks'>
            <a href='https://glitch.com/edit/#!/oddert-mindsweeper?path=app.js:1:0'><i className='fa fa-edit'></i> Switch to edit mode</a>
            <a href='https://github.com/Oddert/MindSweeper'><i className='fa fa-github'></i> View code on GitHub</a>
          </div>
        </header>
        <div className='gameFlex'>
          <Interface />
          <Board />
          <ScoreBoard />
        </div>
        <Control />
      </div>
    )
  }
}

Main.propTypes = {
  game: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(mapStateToProps, null)(Main)
