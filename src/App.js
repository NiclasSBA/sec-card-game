import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import { BrowserRouter as Router,Route, Link, Switch} from "react-router-dom";
import Dashboard from "./Components/DashBoard";
import Home from "./Components/Home";


class App extends Component {
  constructor(props) {
    super(props);
  

  };
  
  
  
  
  render() {
    
  
    return (
      <div className="App">
        <header className="App-header">
         
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          
         
          <nav>
          <div>
    <nav>
    
    </nav>
    <div>
 
    <Router>
   
     

    
      <Switch >
      <Route exact path="/" component={Home} />
      <Route path="/DashBoard" component={Dashboard} />
       
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
      
  
  </Router>
  
    </div>
  </div>
    </nav>
        </header>
        <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
   
 
    
      </div>
    );
  }
}

export default App;
