import React, { Component } from "react";
import logo from "../logo.svg";
import { BrowserRouter, Link } from "react-router-dom";
import { io, openSocket } from "socket.io-client";
import { subscribeToTimer } from "../api";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";
import { joinSocket, joinGameRoom } from "../actions/index";
import GameRoom from "./GameRoom";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: {},
      messages: [],
      currentChatRoom: "",
      initialCards: {}
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.setInitialCardsForSelection();
    if (!this.props.socket) {
      var io = require("socket.io-client");
      var socket = io.connect("localhost:3001");
      var room = "DashBoard";
      socket.on("connect", function() {
        console.log(socket);
        // socket.emit("join room", "DashBoard");
      });
      this.setState({
        socket
      });

      socket.on("message send", function(data) {
        console.log(data);
      });
      socket.on("message send2", function(data) {
        console.log(data);
      });
      socket.on("game: dealing cards", function(data) {
        console.log(data);
      });
      socket.on("game: ready to start", function(data) {
        socket.emit("game: ready to start", "Game room" )
      });

      // the next 3 functions will be fired automatically on a disconnect.
      // the disconnect (the first function) is not required, but you know,
      // you can use it make some other good stuff.

      socket.on("disconnect", function() {
        console.log("Disconnected");
      });

      socket.on("reconnect", function() {
        // do not rejoin from here, since the socket.id token and/or rooms are still
        // not available.
        console.log("Reconnecting");
      });

      socket.on("chat", this.handleData);
    }
  }

  setInitialCardsForSelection = () => {
    var cards = require("../dummy-data/cornucopia-cards.json");
    this.setState({
      initialCards: cards
    });
    console.log(cards);
  };

  handleData = data => {
    var messages = [...this.state.messages];
    messages.push(data);
    this.setState({
      messages
    });
    console.log(messages)
  };
  //Currently only takes all available cards, and puts then together for dealing out to sockets
  dealCardsAndStartGame = room => {
    var datavalidation_cards = [
      ...this.state.initialCards.cards.dataValidationEncoding
    ];
    var authentication_cards = [
      ...this.state.initialCards.cards.authentication
    ];
    var session_management_cards = [
      ...this.state.initialCards.cards.sessionManagement
    ];
    var authorization_cards = [...this.state.initialCards.cards.authorization];
    var cryptography_cards = [...this.state.initialCards.cards.cryptography];
    var wildCards_cards = [...this.state.initialCards.cards.wildCards];
    var countedCards = [];
    datavalidation_cards.map(card =>
      countedCards.push({ suit: "datavalidation_encoding", ...card })
    );
    authentication_cards.map(card => {
      countedCards.push({ suit: "authentication", ...card });
    });
    session_management_cards.map(card => {
      countedCards.push({ suit: "session_management", ...card });
    });
    authorization_cards.map(card => {
      countedCards.push({ suit: "authorization", ...card });
    });
    cryptography_cards.map(card => {
      countedCards.push({ suit: "crypthography", ...card });
    });
    wildCards_cards.map(card => {
      countedCards.push({ suit: "wildcard", ...card });
    });
    var dealtCards = [];
    
    var countedCardsInitLength = countedCards.length;
    for(var i = countedCards.length - 1; i> 0; i--){
  
       var card = countedCards.splice(Math.floor(Math.random() * countedCards.length), 1);
         
       dealtCards.push(card[0]);
      
    };
    console.log(dealtCards);
    var socket = this.state.socket;
    socket.emit("game:deal cards", dealtCards)
  };

  handleJoin = room => {
    var socket = this.state.socket;
    socket.emit("join room", room);

    this.setState({
      currentChatRoom: room
    });
  };
  handleLeave = room => {
    var socket = this.state.socket;
    socket.emit("leave room", room);
    this.setState({
      currentChatRoom: "",
      messages: []
    });
    console.clear();
  };
  handleMessage = msg => {
    msg = "testing mongodb";
    var socket = this.state.socket;
    //command to send the message to other connected sockets
    socket.emit("message", msg, this.state.currentChatRoom);

    //We add the message locally instead of waiting for a server side event to be emitted
    var messages = [...this.state.messages];
    messages.push(msg);
    this.setState({
      messages
    });
  };
  handleMessageToOthers = room => {
    var socket = this.state.socket;
    socket.emit("message notself", room);
  };
  render() {
    return (
      <div>
        <GameRoom
          test={this.state.socket}
          handleJoin={this.handleJoin}
          handleLeave={this.handleLeave}
          handleMessage={this.handleMessage}
          handleMessageToOthers={this.handleMessageToOthers}
          dealCardsAndStartGame={this.dealCardsAndStartGame}
        />
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Dashboard</p>
        <p>This is the timer value: </p>
        <nav>
          <div>
            <nav />
          </div>
        </nav>

        <ul id="messages" />
        <form action="">
          <input id="m" autocomplete="off" />
          <button>Send</button>
        </form>
        <script src="/socket.io/socket.io.js" />
        <script src="https://code.jquery.com/jquery-1.11.1.js" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // ...
});

const mapDispatchToProps = dispatch => ({
  joinSocket: socket => dispatch(joinSocket(socket)),
  joinGameRoom: socket => dispatch(joinGameRoom(socket))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
