import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SizeButton from './SizeButton'
import './styles/Interface.css'

class Interface extends React.Component {
  render() {
    return (
      <div className='interface'>
        <div className='score'>{this.props.game.score}</div>
        {this.props.board.sizes.map((each, idx) =>
          <SizeButton key={idx} index={idx} x={each.x} y={each.y} difficulty={this.props.board.difficulty} />
        )}
        <br />
        <button>Reset</button>
        <div>
          Number of Bombs: {Math.floor((this.props.board.sizes[this.props.board.difficulty].x * this.props.board.sizes[this.props.board.difficulty].y) * 0.16)}
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

export default connect(mapStateToProps, null)(Interface)
