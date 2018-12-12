import React, { Component } from 'react';
import logo from '../logo.svg';
import { BrowserRouter, Link} from "react-router-dom";


class Home extends Component {
  constructor(props) {
    super(props);
//     subscribeToTimer((err, timestamp) => this.setState({ 
//       timestamp
//     }));
//   }
//   state = {
//     timestamp: 'no timestamp yet'
 };

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Home</p>
          <nav>
          <div>
    <nav>
      
    </nav>
    
  </div>
    </nav>
        </header>
        <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>

    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
    
      </div>
    );
  }
}

export default Home;
