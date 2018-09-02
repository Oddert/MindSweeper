import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleReset, initCells, endGame } from '../actions'

import SizeButton from './SizeButton'
import About from './About'
import Background from './Background'
import Reveal from './Reveal'

import './styles/Interface.css'

class Interface extends React.Component {
  handleResetFunction () {
    if (this.props.game.status === 'ended') {
      this.props.toggleReset()
    } else {

      console.log('(Interface.js): Populating cells...')
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
      this.props.endGame()


    }
  }

  render() {
    const size = this.props.board.sizes[this.props.board.difficulty]

    return (
      <div className='interface'>

        <div className='interface-flex'>
          <div className='score'>{this.props.game.score}</div>
        </div>

        <div className='interface-flex'>
          <h3>Board Size:</h3>
          {this.props.board.sizes.map((each, idx) =>
            <SizeButton key={idx} index={idx} x={each.x} y={each.y} difficulty={this.props.board.difficulty} />
          )}
          <br />
          <br />
          <div>
            Number of Bombs: {Math.floor((size.x * size.y) * 0.12)}
          </div>
        </div>

        <br />

        <div className='interface-flex'>
          <About />
          <br />
          <button className='toggleReset' onClick={this.handleResetFunction.bind(this)}>Reset</button>
          <Reveal />
        </div>

        <div className='interface-flex'>
          <Background />
        </div>

      </div>
    )
  }
}

Interface.propTypes = {
  board: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  game: state.game,
  board: state.board
})

const mapDispatchToProps = dispatch => ({
  toggleReset: () => dispatch(toggleReset()),
  initCells: payload => dispatch(initCells(payload)),
  endGame: () => dispatch(endGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(Interface)
