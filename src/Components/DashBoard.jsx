import React, { Component, Fragment } from "react";


import GameRoom from "./GameRoom";
import PlayingCardsHand from "./UiComponents/PlayingCardsHand";
import SelectionView from "./UiComponents/SelectionView";
import TabView from "./UiComponents/TabView";
import { css } from "emotion";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: {},
      messages: [],
      currentChatRoom: "",
      initialCards: {},
      activeTabId: 0,
      listOfSelectedCards: [],
      lastClickedCard: {},
      playerPoints: 0,
      cardsInHand: [],
      currentGame: {
        isActive: false,
        isAdmin: "",
        isCurrentPlayer: false,
        currentPlayer: "",
        currentPlayerHasPlayedCard: false,
        currentCardInPlay: {},
        gameId: "",
        nickName: "",
        players: [],
        currentCardHeader: ""
      }
    };
  }

  componentWillMount() {
    this.setInitialCardsForSelection();
  }

  componentDidMount() {
    if (!this.props.socket) {
      var io = require("socket.io-client");
       var socket = io.connect("159.89.13.185");
      // var socket = io.connect("localhost:3001");
      var room = "DashBoard";
      socket.on("connect", function() {
        console.log(socket);
        // socket.emit("join room", "DashBoard");
      });
      this.setState({
        socket
      });
      socket.on("user joined room", this.handleUserJoinFromServer);
      socket.on("game: set admin", this.handleAdmin);
      socket.on("game: giving points", user => this.handleUserPoints(user));
      socket.on("game: playing card", game =>
        this.handleCardSentFromOtherSocket(game)
      );
      socket.on("game: moving to next user", data =>
        this.handleMoveToNextUser(data)
      );
      socket.on("game: game is started", this.handleGameStatus);
      socket.on("created game room", this.setCurrentGameId);

      socket.on("message send2", function(data) {
        console.log(data);
      });
      socket.on("game: dealing cards", this.handleCardsFromServer);
      socket.on("game: ready to start", this.handleStartGame);

      //make socketio even that listens for game start, and sets socket as host. when the socket.on('disconnect') fires, check if the socket was host, if it was, emit socket.emit('game: host left) to signal game end, and free up the room

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
  handleCardSentFromOtherSocket = currentGame => {
    currentGame = { ...currentGame, currentPlayerHasPlayedCard: true };

    this.setState({
      currentGame
    });
  };
  sendCardToOtherSockets = card => {
    var socket = this.state.socket;
    var cardsInHand = [...this.state.cardsInHand];
    var currentGame = { ...this.state.currentGame };
    currentGame.currentCardInPlay = card;
    // now you cant select a card
    var inx = -1;
    cardsInHand.map((c, index) => {
      if (c.description === card.description) {
        inx = index;
      }
    });
    console.log(inx)
    //  We want to remove the card, we just played, so it cant be played again
    // currently, we are not keeping track of previously played cards
    if (inx > -1) 
      {cardsInHand.splice(inx, 1);
      }
    this.setState({
      cardsInHand: cardsInHand,
      currentGame: { ...currentGame, currentPlayerHasPlayedCard: true }
    });
    socket.emit("game: play card", currentGame);
  };
  handleMoveToNextUser = user => {
    var socket = this.state.socket;
    var currentGame = { ...this.state.currentGame };
    var lastClickedCard = { ...this.state.lastClickedCard };
    lastClickedCard = {};
    currentGame.players.map((pUser, index) => {
      // User should refer to each socketusername, currently it doesnt
      // console.log("user from server side", user);
      if (socket.id === "" + user.id) {
        console.log("found current user client side");
        // currentGame.players[index] ={id: socket.id,user: pUser, points: +1}

        currentGame = {
          ...currentGame,
          currentPlayer: user,
          isCurrentPlayer: true,
          currentPlayerHasPlayedCard: false,
          currentCardInPlay: {}
        };
      } else {
        currentGame = {
          ...currentGame,
          currentPlayer: user,
          isCurrentPlayer: false,
          currentPlayerHasPlayedCard: false,
          currentCardInPlay: {}
        };
      }
    });

    this.setState({
      currentGame: currentGame,
      lastClickedCard: lastClickedCard
    });
  };
  moveToNextUser = () => {
    var socket = this.state.socket;
    var currentGame = { ...this.state.currentGame };
    // currentGame.currentPlayer = (currentGame.currentPlayer) ? currentGame.currentPlayer : currentGame.currentPlayers[0]
    // console.log("move to next user, client side", currentGame);
    socket.emit("game: move to next user", currentGame);
    // socket.emit("game: move to next user",currentGame.currentPlayer,currentGame.gameId);
  };
  giveUserPoints = () => {
    var socket = this.state.socket;
    var currentGame = { ...this.state.currentGame };
    // currentGame.players.map(player => {});
    socket.emit("game: give points", currentGame);
  };
  handleUserPoints = user => {
    var socket = this.state.socket;
    var currentGame = { ...this.state.currentGame };
    // console.log("event received from server", socket.id);

    currentGame.players.map((pUser, index) => {
      // User should refer to each socketusername, currently it doesnt

      // console.log("map", pUser);
      // console.log("map userid from server", userId);

      currentGame.players[index] = { ...pUser };
      if (pUser.id === user.id) {
        // var res = currentGame.players[index];
        pUser.points = pUser.points + 1;
        currentGame.players[index] = pUser;
      } else {
        currentGame.players[index] = pUser;
      }
    });
    this.setState(
      {
        currentGame: { ...currentGame }
      },
      this.moveToNextUser()
    );
  };

  handleUserJoinFromServer = (user, prevUsers) => {
    var socket = this.state.socket;
    var currentGame = { ...this.state.currentGame };
   
    currentGame.players = [];
    if (prevUsers.length > 0) {
      Object.keys(prevUsers.sockets).map((pUser, index) =>
        // User should refer to each socketusername, currently it doesnt
        currentGame.players.push({ id: pUser, user: user, points: 0 })
      );
    } 

    this.setState({
      currentGame
    });
  };
  handleGameStatus = game => {
    var currentGame = { ...game };
    var firstPlayer = currentGame.players[0];
    var socket = this.state.socket;
    // console.log(firstPlayer);
    // console.log(currentGame);
    // console.log(game);
    this.setState({
      currentGame: {
        ...currentGame,
        currentPlayer: firstPlayer,
        isActive: true
      }
    });

    if (socket.id === firstPlayer.id) {
      this.setState({
        currentGame: {
          ...currentGame,
          isActive: true,
          currentPlayer: firstPlayer,
          isCurrentPlayer: true
        }
      });
    }
  };
  handleStartGame = () => {
    var socket = this.state.socket;
    var game = { ...this.state.currentGame };
    socket.emit("game: start game", game);
  };
  handleCardsFromServer = cards => {
    var cardsInHand = [...this.state.cardsInHand];
    cardsInHand = cards;
    this.setState({
      cardsInHand
    });
  };
  setCurrentGameId = data => {
    var socket = this.state.socket;
    var currentGame = { ...this.state.currentGame };
    // We are setting the game id, that should be unique, or atleast very close to it, after that, we join the room.
    this.setState({
      currentGame: {
        ...currentGame,
        gameId: data
      }
    });
    // console.log(this.state)
    socket.emit("join room", data);
  };
  handleAdmin = () => {
    var currentGame = { ...this.state.currentGame };
    var socket = { ...this.state.socket };
    //... spread operator needs to be first, otherwise, initial values overwrites what we want to set
    currentGame = { ...currentGame, isAdmin: socket.id };
    this.setState({
      currentGame
    });
  };
  // You could probably do this a smarter way, perhaps with redux, but for now, this works
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
    // console.log(messages);
  };

  //Deals cards based on selected cards in state
  dealCardsAndStartGame = room => {
    var countedCards = [...this.state.listOfSelectedCards];
    var dealtCards = [];

    for (var i = countedCards.length; i > 0; i--) {
      var card = countedCards.splice(
        Math.floor(Math.random() * countedCards.length),
        1
      );

      dealtCards.push(card[0]);
    }
    console.log(dealtCards);
    var socket = this.state.socket;
    var gameId = this.state.currentGame.gameId;
    if (gameId != "") {
      socket.emit("game:deal cards", dealtCards, gameId);
    }
  };
  dealAllCardsAndStartGame = room => {
    var initialCards = { ...this.state.initialCards };

    var countedCards = [];
    Object.keys(initialCards.cards).map(suit =>
      initialCards.cards[suit].map(card => {
        return countedCards.push({ suit: suit, ...card });
      })
    );
    var dealtCards = [];

    for (var i = countedCards.length; i > 0; i--) {
      var card = countedCards.splice(
        Math.floor(Math.random() * countedCards.length),
        1
      );

      dealtCards.push(card[0]);
    }
    var socket = this.state.socket;
    var gameId = this.state.currentGame.gameId;
    if (gameId != "") {
      socket.emit("game:deal cards", dealtCards, gameId);
    }
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
      messages: [],
      cardsInHand: [],

      currentGame: {
        nickName: "",
        isActive: false,
        isAdmin: "",
        isCurrentPlayer: false,
        gameId: "",
        currentCardHeader: ""
      }
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

  handleTabchange = index => {
    this.setState({
      activeTabId: index
    });
  };
  handleSetNickName = name => {
    // console.log(name)
    var currentGame = { ...this.state.currentGame };
    var socket = this.state.socket;
    this.setState({
      currentGame: {
        ...currentGame,
        nickName: name
      }
    });

    // we tell the server that the player has  changed nickname
    socket.emit("add nickname", name);
  };
  toggleAllCheckboxes = (cards, cardSuit) => {
    var listOfSelectedCards = [...this.state.listOfSelectedCards];
    //IT TOOK ME AGES TO FIGURE OUT HOW TO GET CORRECT INDEX

    var addedCards = [];
    cards.map(card => {
      var number = card.number;
      var index = listOfSelectedCards.findIndex(
        card => card.suit === cardSuit && card.number === number
      );

      // if found in state array
      if (index > -1) {
        // console.log(card, index)

        this.setState({
          listOfSelectedCards
        });
      } else {
        addedCards.push({ suit: cardSuit, ...card });
        listOfSelectedCards.push({ suit: cardSuit, ...card });
        // console.log(card, index);
        this.setState({
          listOfSelectedCards
        });
      }
    });
    // console.log("added cards", addedCards);
    if (addedCards.length === 0) {
      // console.log("all cards was already added")
      cards.map((card, i) => {
        // var listOfSelectedCards = [...this.state.listOfSelectedCards];
        // var suit = cards[i].suit;
        var number = card.number;
        var index = listOfSelectedCards.findIndex(
          card => card.suit === cardSuit && card.number === number
        );
        // console.log(cardSuit, number)
        // console.log("card array number", index);
        if (index > -1) {
          listOfSelectedCards.splice(index, 1);
          // console.log("card was already in state, so it gets removes", listOfSelectedCards)
        }
      });
      this.setState({
        listOfSelectedCards
      });
    }
  };

  toggleCheckbox = card => {
    //IT TOOK ME AGES TO FIGURE OUT HOW TO GET CORRECT INDEX
    //
    var listOfSelectedCards = [...this.state.listOfSelectedCards];
    var suit = card.suit;
    var number = card.number;
    var index = listOfSelectedCards.findIndex(
      card => card.suit === suit && card.number === number
    );

    if (index > -1) {
      listOfSelectedCards.splice(index, 1);

      this.setState({
        listOfSelectedCards
      });
    } else {
      listOfSelectedCards.push(card);
      this.setState({
        listOfSelectedCards: listOfSelectedCards,
        lastClickedCard: card
      });
    }
  };
  setCardToPlay = card => {
    this.setState({
      lastClickedCard: card
    });
  };
  handleCreateRoom = () => {
    var socket = this.state.socket;

    socket.emit("create game room");
  };
  handleGameJoinCode = code => {};
  handleCardsInHandHeaderChange = cs => {
    var currentGame = { ...this.state.currentGame };
    currentGame.currentCardHeader = cs;
    this.setState({
      currentGame
    });
  };
  render() {
    return (
      <div className={container()}>
        <div className="current-card">
          <Fragment>
            {this.state.lastClickedCard.description &&
              !this.state.currentGame.currentPlayerHasPlayedCard && (
                <p>{this.state.lastClickedCard.description}</p>
              )}
            {this.state.currentGame.isActive &&
              this.state.currentGame.currentPlayerHasPlayedCard && (
                <p>{this.state.currentGame.currentCardInPlay.description}</p>
              )}
          </Fragment>
        </div>
        <GameRoom
          socket={this.state.socket}
          handleJoin={this.handleJoin}
          handleCreateRoom={this.handleCreateRoom}
          handleLeave={this.handleLeave}
          handleMessage={this.handleMessage}
          handleMessageToOthers={this.handleMessageToOthers}
          handleSetNickName={this.handleSetNickName}
          currentGame={this.state.currentGame}
          dealCardsAndStartGame={this.dealCardsAndStartGame}
          dealAllCardsAndStartGame={this.dealAllCardsAndStartGame}
          giveUserPoints={this.giveUserPoints}
          moveToNextUser={this.moveToNextUser}
        />

        <div className="list-wrapper">
          {this.state.currentGame.isAdmin === this.state.socket.id &&
            !this.state.currentGame.isActive && (
              <Fragment>
                <TabView
                  tabs={this.state.initialCards.cards}
                  handleTabchange={this.handleTabchange}
                />
                <SelectionView
                  currentTab={this.state.activeTabId}
                  tabs={this.state.initialCards.cards}
                  toggleAllCheckboxes={this.toggleAllCheckboxes}
                  toggleCheckbox={this.toggleCheckbox}
                  listOfSelectedCards={this.state.listOfSelectedCards}
                  currentGame={this.state.currentGame}
                />
              </Fragment>
            )}
        </div>
        {this.state.currentGame.isActive && (
          <PlayingCardsHand
            handleTabchange={this.handleTabchange}
            handleCardsInHandHeaderChange={this.handleCardsInHandHeaderChange}
            tabs={this.state.initialCards.cards}
            setCardToPlay={this.setCardToPlay}
            cardsInHand={this.state.cardsInHand}
            currentGame={this.state.currentGame}
            sendCardToOtherSockets={this.sendCardToOtherSockets}
          />
        )}
        <nav>
          <div>
            <nav />
          </div>
        </nav>
        <div>
          {this.state.currentGame.nickName === "" &&
            "Set your nickname in the top menu in the upperight corner"}
        </div>
        <div>
          {this.state.currentGame.currentPlayer.id === this.state.socket.id &&
            this.state.currentGame.isActive &&
            "You are the current player"}
        </div>
        <div>
          {this.state.currentGame.nickName !== "" &&
            !this.state.currentGame.isAdmin === this.state.socket.id &&
            "Wait for the game to start"}
        </div>
        <div>
          {this.state.currentGame.isAdmin === this.state.socket.id &&
            this.state.currentGame.isActive === false &&
            this.state.currentGame.gameId}
        </div>
      </div>
    );
  }
}
const container = () => css`
  .current-card {
    padding: 0 3rem;
    max-height: 200px;
    min-height: 200px;
    overflow: hidden;
    position: relative;
    p {
      padding: 0 5rem;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: -17px;
      overflow-y: scroll;
    }
  }
`;
const mapStateToProps = state => ({
  // ...
});



export default Dashboard;
