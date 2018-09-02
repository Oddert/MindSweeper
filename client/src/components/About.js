import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { toggleAbout } from '../actions'

import './styles/About.css'
import game_screen_one from '../img/game_screen_one.PNG'
import game_screen_two from '../img/game_screen_two.PNG'
import game_screen_three from '../img/game_screen_three.gif'
import mindsweeper_skull from '../img/mindsweeper_skull.png'

class About extends React.Component {

  handleClick (e) {
    if (e.target.className === 'about-container' || e.target.className === 'about-container hidden' || e.target.className === 'close') {
      this.props.toggleAbout()
    }
  }

  render() {
    const classIn = this.props.game.aboutOpen ? 'about-container' : 'about-container hidden'

    return (
      <div>
        <button className='toggleAbout' onClick={() => this.props.toggleAbout()}>?</button>
        <div className={classIn} onClick={this.handleClick.bind(this)}>
          <div className='about-box'>
            <div className='aboutTitleBox'>
              <div className='aboutTitleBox-item'></div>
              <h1 className='aboutTitleBox-item title center'>What is MindSweeper?</h1>
              <div className='aboutTitleBox-item right'>
                <button className='close'>X</button>
              </div>
            </div>

            <h2>Do you love the <em>idea</em> of Minesweeper?</h2>
            <h2 className='right'>…but do you also hate maths?</h2>
            <br />
            <strong>For the longest time the classic Windows game has had one glaring flaw; it has rules and tactics. These rules are enforced by maths, making for quite a headache.</strong>
            <h3 className='center'>WORY NO LONGER FRIENDS</h3>
            <hr />
            <br />
            <h3>Introducing <em>MindSweeper</em>, the classic game’s more cerebral cousin, here to provide the mindless entertainment that the game should have been all along, without any pesky mathematics. (@ Microsoft plz no sue)</h3>
            <br />
            <h3 className='subhead'>The Betrayal</h3>
            <p>MindSweeper was first hypothesised about when Jen of Shaun Andjen was informed about the meaning of the numbers in minesweeper.</p>
            <div className='clip_container'>
              <iframe src="https://clips.twitch.tv/embed?clip=BombasticDarlingPheasantCoolCat&autoplay=false" frameBorder="0" allowFullScreen="true" height="378" width="620" title="twitch1"></iframe>
            </div>
            <br />
            <h3 className='subhead'>A Revolutionary Idea</h3>
            <p>Later, it was decided that maths is bad and that having to think about minesweeper is bad and thus MindSweeper was born.</p>
            <div className='clip_container'>
              <iframe src="https://clips.twitch.tv/embed?clip=ThirstyLivelyMochaWow&autoplay=false" frameBorder="0" allowFullScreen="true" height="378" width="620" title="twitch2"></iframe>
            </div>
            <h2 className='subhead'>Rules</h2>
            <div className='rules_grid'>
              <div className='line_1-left text'>
                <p>
                  Click on empty cells to reveal if there is a mine or not. If there is not, you get a point. If there is, you get, as we say, blown tae f***
                </p>
              </div>
              <div className='line_1-right'>
                <img src={game_screen_one} alt='game screen one' />
              </div>
              <div className='line_2-left'>
                <img src={game_screen_two} alt='game screen two' />
              </div>
              <div className='line_2-right text'>
                <p>
                  Just like the classic game, you can right click to place a flag. Doesn’t do anything but still
                </p>
              </div>
              <div className='line_3-left text'>
                <p>
                  Once the game is over, add your name to the score board for all the world to see and laugh at.
                </p>
              </div>
              <div className='line_3-right'>
                <img src={game_screen_three} alt='game screen three' />
              </div>
            </div>
            <br />
            <div className='footer-image'>
              <img src={mindsweeper_skull} alt="shaun's micro-son" />
            </div>
            <hr />
            <p className='center'>
              MindSweeper is a satirical game created for <a href='https://www.twitch.tv/shaunandjen' target='_blank' rel="noopener noreferrer">
                  Shaun and Jen
                </a> by <a href='https://oddert.github.io/' target='_blank' rel="noopener noreferrer">
                  Robyn V
                </a> (
                <a href='https://twitter.com/Oddert' target='_blank' rel="noopener noreferrer">
                  @ Oddert
                </a>
                ) who apologises.
              </p>
              <hr />
              <h3 className='subhead'>Image Credits</h3>
              <br />
              <p>Windows Vaporwave: <a href='https://wallpapertag.com/vaporwave-wallpaper-1920x1080'>https://wallpapertag.com/vaporwave-wallpaper-1920x1080</a></p>
              <p>'gay' uses a gradient scheme by <a href='https://twitter.com/deaths_cool'>Jen</a> of <a href='https://www.twitch.tv/shaunandjen'>ShaunAndJen</a>. The skull imagery is also a part of this branding.</p>
              <p>Windows XP and Windows 10 are commons images.</p>
          </div>
        </div>
      </div>
    )
  }
}

About.propTypes = {
  toggleAbout: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

const mapeDispatchToProps = dispatch => ({
  toggleAbout: () => dispatch(toggleAbout())
})

export default connect(mapStateToProps, mapeDispatchToProps)(About)
