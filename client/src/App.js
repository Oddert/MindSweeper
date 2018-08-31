import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux'

import store from './store'

import Board from './components/Board';
import Control from './components/Control'
import ScoreBoard from './components/ScoreBoard'
import Interface from './components/Interface'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header>
            <h1>Welcome to MindSweeper!</h1>
            <h3>All the fun of Minesweeper but without any of the maths</h3>
          </header>
          <div className='gameFlex'>
            <Interface />
            <Board />
            <ScoreBoard />
          </div>
          <Control />
        </div>
      </Provider>
    );
  }
}

export default App;
