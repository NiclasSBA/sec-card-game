import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {subscribeToTimer} from './api';

class App extends Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp
    }));
  }
  state = {
    timestamp: 'no timestamp yet'
  };

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          This is the timer value: {this.state.timestamp}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
    
      </div>
    );
  }
}

export default App;
