import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import { BrowserRouter as Router,Route, Link, Switch} from "react-router-dom";
import Dashboard from "./Components/DashBoard";
import About from "./Components/About";
import Home from "./Components/Home";


class App extends Component {
  constructor(props) {
    super(props);
  

  };
  
  
  
  
  render() {
    
  
    return (
      <div className="App" style={{ marginLeft: "0 !important",
      marginRight: "0 !important"}}>
        <header className="App-header">
         
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}
          
         
          <nav>
          <div>
   
    
 
    <Router>
   
     

    
      <Switch >
      <Route exact path="/" component={Home} />
      <Route path="/DashBoard" component={Dashboard} />
      <Route path="/About" component={About} />
       
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
      
  
  </Router>
  
    </div>
 
    </nav>
        </header>
        <ul id="messages"></ul>
    {/* <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form> */}
   
 
    
      </div>
    );
  }
}

export default App;
