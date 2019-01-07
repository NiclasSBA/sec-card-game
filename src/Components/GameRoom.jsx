import React, { Component } from "react";



import { css } from "emotion";
import SideMenu from "./UiComponents/SideMenu";
import Highscore from "./UiComponents/Highscore";

class GameRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: {},
      listOpen: false,
      highscoreOpen: false
    };
  }

  handleClick = () => {
    console.log(this.props);
    this.props.handleJoin("Game room");
  };
  toggleGameMenu = (event) => {
    // event.preventDefault()
    
    this.setState(prevState =>({
      listOpen: !prevState.listOpen,
      highscoreOpen: false
    }))
  }
  toggleHighscoreMenu = (event) => {
    // event.preventDefault()
    this.setState(prevState =>({
      listOpen: false,
      highscoreOpen: !prevState.highscoreOpen
    }))
  }
  // handleJoin = () => {
  //   console.log("game room")
  //   this.props.handleJoin("Game room")
  //   this.toggleGameMenu();
  // }
  render() {
    let {listOpen} = this.state;
  
    return (
      <div className={container()}>
        
          <div >
            <div style={{marginTop: "50px"}}></div>
      
        <SideMenu socket={this.props.socket} listOpen={this.state.listOpen} handleJoin={this.props.handleJoin} handleCreateRoom={this.props.handleCreateRoom} toggleGameMenu={this.toggleGameMenu}
        handleSetNickName={this.props.handleSetNickName} currentGame={this.props.currentGame} {...this.props}
        toggleHighscoreMenu={this.toggleHighscoreMenu} dealAllCardsAndStartGame={this.props.dealAllCardsAndStartGame}/>

        <Highscore highscoreOpen={this.state.highscoreOpen}  handleCreateRoom={this.props.handleCreateRoom} toggleHighscoreMenu={this.toggleHighscoreMenu}
         currentGame={this.props.currentGame} moveToNextUser={this.props.moveToNextUser} giveUserPoints={this.props.giveUserPoints} {...this.props} />
        </div>
      </div>
    );
  }
}
const container = () => css`
position: absolute;
top: 0;
right:0;
.menu-button-toggle{
  width: 50px;
  height: 50px;
  // It needs to be position: absolute, otherwise, the menu will blink in and out
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1
}

`;

const mapStateToProps = state => ({
  // ...
});



export default GameRoom;
