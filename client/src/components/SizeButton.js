import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { changeBoard } from '../actions'

class SizeButton extends React.Component {
  render() {
    const classInput = this.props.index === this.props.difficulty ? 'sizeButton active' : 'sizeButton'
    return (
      <button className={classInput} onClick={() => this.props.changeBoard(this.props.index)}>{this.props.x} x {this.props.y}</button>
    )
  }
}

SizeButton.propTypes = {
  changeBoard: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
}

const mapDispatchToProps = dispatch => ({
  changeBoard: payload => dispatch(changeBoard(payload))
})

export default connect(null, mapDispatchToProps)(SizeButton)
