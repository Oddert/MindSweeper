import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { initScores } from '../actions'

import './styles/Leaderboard.css'

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      fetch('/api/scores', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.json())
      .then(res => {
        if (res.err) {
          console.error(res.err)
        } else {
          this.props.initScores(res.scores)
        }
      })
    }, 300)
  }

  toggle() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const limit = this.state.open ? undefined : 10
    return (
      <div className='leaderBoard'>
        <h3>Leaderboard:</h3>
        <ul>
          {this.props.scores ?
            this.props.scores
              .sort((a, b) => b.score - a.score)
              .slice(0, limit)
              .map((each, idx) =>
                <li key={each._id}>{idx + 1}) {each.username} <span className='leaderBoard-score'>{each.score}</span></li>
              ) :
            ''
          }
        </ul>
        <button onClick={this.toggle.bind(this)}>{this.state.open ? 'Show less' : 'Show all'}</button>
      </div>
    )
  }
}

ScoreBoard.propTypes = {
  scores: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  scores: state.scores
})

const mapDispatchToProps = dispatch => ({
  initScores: payload => dispatch(initScores(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard)
