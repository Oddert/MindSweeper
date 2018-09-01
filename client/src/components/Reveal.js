import React from 'react'
import { connect } from 'react-redux'

import { openCell }  from '../actions'

class Reveal extends React.Component {
  handleClick () {
    var payload = [...this.props.cells]
    for (var i=0; i< payload.length; i++) {
      for (var j=0; j<payload[i].length; j++) {
        payload[i][j].status = 'open'
      }
    }
    this.props.openCell(payload)
  }

  render() {
    if (this.props.game.status === 'playing') {
      return (
        <div />
      )
    }
    return (
      <button className='toggleReset' onClick={this.handleClick.bind(this)}>Reveal Board</button>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game,
  cells: state.cells
})

const mapDispatchToProps = dispatch => ({
  openCell: payload => dispatch(openCell(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reveal)
