import React, { Component } from 'react';
import './App.css';
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

   
 
    
      </div>
    );
  }
}

export default App;
