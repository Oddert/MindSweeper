import React from 'react';
import { connect } from 'react-redux'

import { openCell, addPoint } from '../actions'

class Cell extends React.Component {
  handleClick() {
    const row = this.props.row
    const col = this.props.col
    console.log(`You clicked cell in row: ${row}, col: ${col}`)
    console.log(this.props.cells[row][col])
    if (this.props.cells[row] && this.props.cells[row][col].status === 'closed' && this.props.game.status === 'playing') {
      const payload = [...this.props.cells]
      payload[row][col].status = 'open'
      this.props.openCell(payload)
      if (payload[row][col].type === 'bomb') {
        console.log('Game over!')
        this.props.addPoint(true)
      } else {
        this.props.addPoint(false)
      }
    }
  }

  render() {
    const row = this.props.row
    const col = this.props.col
    var style = {}

    if (this.props.cells &&  this.props.cells[row] && this.props.cells[row][col]) {
      if (this.props.cells[row][col].status === 'open') {
        switch (this.props.cells[row][col].type) {
          case 'bomb':
            style = {backgroundColor: 'steelblue'}
            break
          case 'empty':
            style = {backgroundColor: 'lightgray'}
            break
          default:
            break
        }
      }
    }

    return (
      <td onClick={this.handleClick.bind(this)} style={style}></td>
    )
  }
}

const mapStateToProps = state => ({
  cells: state.cells,
  game: state.game
})

const mapDispatchToProps = dispatch => ({
  openCell: payload => dispatch(openCell(payload)),
  addPoint: payload => dispatch(addPoint(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cell)
