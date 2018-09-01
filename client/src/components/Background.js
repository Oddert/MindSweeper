import React from 'react'
import { connect } from 'react-redux'

import { background } from '../actions'

class Background extends React.Component {
  render() {
    const data = [
      'gay',
      'Windows XP',
      'Windows Vapor',
      'Windows 10',
      'White'
    ]

    return (
      <div className='back_slider'>
        <h3>Background:</h3>
        {data.map((each, idx) =>
          <button key={each} onClick={() => this.props.background(idx)}>
            {each}
          </button>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game
})

const mapDispatchToProps = dispatch => ({
  background: payload => dispatch(background(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Background)
