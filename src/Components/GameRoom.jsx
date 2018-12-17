import React, { Component } from 'react';
import logo from '../logo.svg';
import { BrowserRouter, Link} from "react-router-dom";
import {io, openSocket} from "socket.io-client";
import {subscribeToTimer} from '../api';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import  * as actions from '../actions';
import { joinSocket, joinGameRoom } from '../actions/index';


class GameRoom extends Component {
    constructor(props) {
        super(props);
     
       
        this.state ={
          socket: {}
        }
      }
   
 
   handleClick =  () => {
     console.log(this.props)
     this.props.handleJoin("Game room")
   }
 

  render() {
    return (
      <div>
        
          
          <button onClick={ () => this.props.handleJoin("Game room")}> Join Room</button>
          <button onClick={ () => this.props.handleLeave("Game room")}> Leave Room</button>
          <button onClick={ () => this.props.handleMessage("Game room test message")}> send message</button>
          <button onClick={ () => this.props.handleMessageToOthers("Game room")}> send message to others</button>
          {this.props.user.isAdmin && <button onClick={ () => this.props.dealCardsAndStartGame("Game room")}> Deal cards and start game</button>}
     
  
    
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // ...
});


const mapDispatchToProps = dispatch => ({
   joinSocket: socket => dispatch(joinSocket(socket)),
   joinGameRoom: socket => dispatch(joinGameRoom(socket))
  
})

export default connect(mapStateToProps,mapDispatchToProps)(GameRoom)