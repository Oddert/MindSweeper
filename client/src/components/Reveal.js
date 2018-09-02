import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { openCell }  from '../actions'

import './styles/Reveal.css'

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
      <button className='revealButton' onClick={this.handleClick.bind(this)}>Reveal Board 🔎</button>
    )
  }
}

Reveal.propTypes = {
  cells: PropTypes.array.isRequired,
  game: PropTypes.object.isRequired,
  openCell: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game,
  cells: state.cells
})

const mapDispatchToProps = dispatch => ({
  openCell: payload => dispatch(openCell(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reveal)
