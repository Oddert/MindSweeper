import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { openCell, addPoint } from '../actions'

import mine from '../img/mine.png'
import flag from '../img/flag.png'

class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFlag: false
    }
    this.toggleFlag = this.toggleFlag.bind(this)
  }

  handleClick() {
    const row = this.props.row
    const col = this.props.col
    console.log(`You clicked cell in row: ${row}, col: ${col}`)
    console.log(this.props.cells[row][col])
    if (this.props.cells[row] && this.props.cells[row][col].status !== 'open' && this.props.game.status === 'playing') {
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

  toggleFlag (e) {
    e.preventDefault();
    const payload = [...this.props.cells]
    const status = this.props.cells[this.props.row][this.props.col].status
    if (!(status === 'open')) {
      payload[this.props.row][this.props.col].status = status === 'flag' ? 'empty' : 'flag'
      this.props.openCell(payload)
    }
  }

  render() {
    const row = this.props.row
    const col = this.props.col
    var classIn = ''
    var showIcon = false
    var showFlag = false

    if (this.props.cells &&  this.props.cells[row] && this.props.cells[row][col]) {
      if (this.props.cells[row][col].status === 'open') {
        switch (this.props.cells[row][col].type) {
          case 'bomb':
            classIn = 'open bomb'
            showIcon = true
            break
          case 'empty':
            classIn = 'open empty'
            break
          default:
            break
        }
      } else if (this.props.cells[row][col].status === 'flag') {
        showFlag = true;
      }
    }

    return (
      <td onClick={this.handleClick.bind(this)} className={classIn} onContextMenu={this.toggleFlag.bind(this)}>
        {showIcon ? <img style={{height: '20px'}} className='cell_icon' src={mine} alt='mine icon' /> : ''}
        {showFlag ? <img style={{height: '16px'}} className='cell_icon' src={flag} alt='flag icon' /> : ''}
      </td>
    )
  }
}

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired,
  game: PropTypes.object.isRequired,
  openCell: PropTypes.func.isRequired,
  addPoint: PropTypes.func.isRequired
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
