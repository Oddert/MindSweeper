import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { background } from '../actions'

import './styles/Background.css'

class Background extends React.Component {
  render() {
    const data = [
      'gay',
      'Windows XP',
      'Windows Vaporwave',
      'Windows 10',
      'White',
      'Black'
    ]

    return (
      <div className='back_slider'>
        <h3>Background:</h3>
        <div className='back_slider-flex'>
          {data.map((each, idx) =>
            <button
              key={each}
              onClick={() => this.props.background(idx)}
              className={this.props.game.background === idx ? 'background-button active' : 'background-button'}
            >
              {each}
            </button>
          )}
        </div>
      </div>
    )
  }
}

Background.propTypes = {
  background: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

const mapDispatchToProps = dispatch => ({
  background: payload => dispatch(background(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Background)
