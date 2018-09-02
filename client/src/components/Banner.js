import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { updateTime, timerToReset } from '../actions'

import './styles/Banner.css'
import mindsweeper_smiley from '../img/mindsweeper_simley.png'
import mindsweeper_sad from '../img/mindsweeper_sad.png'

class Banner extends React.Component {
  componentDidUpdate () {
    if (!this.props.game.timerRunning || this.props.game.status === 'ended') {
      clearInterval(this.time);
    } else if (this.props.game.timerToReset) {
      this.time = setInterval(() => {
        this.props.updateTime(this.props.game.time + 1)
      }, 1000)
      this.props.timerToReset()
    }
  }

  render() {
    const totalCells = (this.props.board.sizes[this.props.board.difficulty].x * this.props.board.sizes[this.props.board.difficulty].y) - this.props.game.score
    const score = totalCells > 999
                    ? '999'
                    : totalCells > 99
                        ? totalCells
                        : totalCells < 10
                            ? '00' + totalCells
                            : '0' + totalCells

    const time = this.props.game.time > 999
                    ? '999'
                    : this.props.game.time > 99
                        ? this.props.game.time
                        : this.props.game.time < 10
                            ? '00' + this.props.game.time
                            : '0' + this.props.game.time

    return (
      <div className='banner'>
        <div className='numScreen banner-score'>{score}</div>
        <button className='banner-cheese'>
          {this.props.game.status === 'playing'
            ? <img src={mindsweeper_smiley} alt='Shut up react, im the dev, not u' />
            : <img src={mindsweeper_sad} alt='Shut up react, im the dev, not u' />
          }
        </button>
        <div className='numScreen banner-time'>{time}</div>
      </div>
    )
  }
}

Banner.propTypes = {
  board: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  timerToReset: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game,
  board: state.board
})

const mapDispatchToProps = dispatch => ({
  updateTime: payload => dispatch(updateTime(payload)),
  timerToReset: () => dispatch(timerToReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
