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
          <ul style={{listStyle:"none"}}><li><a style={{textDecoration: "none", color: "white"}} href="/Dashboard">Game room</a></li><li><a style={{textDecoration: "none", color: "white"}} href="/About">About this project</a></li></ul>
          <nav>
          <div>
    <nav>
      
    </nav>
    
  </div>
    </nav>
        </header>
     

    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
    
      </div>
    );
  }
}

export default Home;
