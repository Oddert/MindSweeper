import React from 'react'
import { connect } from 'react-redux'

import { toggleAbout } from '../actions'

class About extends React.Component {
  render() {
    return (
      <div>
        <button className='toggleReset' onClick={() => this.props.toggleAbout()}>About</button>
        {this.props.game.aboutOpen
          ? <div>
              <h3>What is MindSweeper?</h3>
              <p>idk mate</p>
              <p>idk mate</p>
            </div>
          : ''
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game
})

const mapeDispatchToProps = dispatch => ({
  toggleAbout: () => dispatch(toggleAbout())
})

export default connect(mapStateToProps, mapeDispatchToProps)(About)
