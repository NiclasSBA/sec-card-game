import React, { Component } from "react";

import { connect } from "react-redux";

import { joinSocket, joinGameRoom } from "../../actions/index";
import { css } from "emotion";
import HamburgerMenuIcon from "mdi-react/HamburgerMenuIcon";
import posed, { PoseGroup, Transition } from "react-pose";
import colors from "../../base-styles/colors";
import TextField from "./TextField";
import TextFieldCode from "./TextFieldCode";
class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: {},
      name: "",
      gameCode: ""
    };
  }

  handleMessageToOthers = event => {
    event.stopPropagation();
    this.props.toggleGameMenu();
    this.props.handleMessageToOthers("Game room");
  };

  handleMessage = event => {
    this.props.handleMessage("Game room test message");
  };

  handleLeave = event => {
    event.stopPropagation();
    this.props.toggleGameMenu();
    this.props.handleLeave("Game room");
  };

  handleJoin = event => {
    event.stopPropagation();
    this.props.handleJoin("Game room");
    this.props.toggleGameMenu();
  };
  handleInputFocus = event => {
    event.stopPropagation();
  };
  handleText = event => {
    event.stopPropagation();
    
   this.setState({
     name: event.target.value
   })
   
  };
  handleSetNickName = (name) => {
    
    this.setState({
      name
    })
    this.props.handleSetNickName(name)
    this.props.toggleGameMenu();
  }
  handleClick = (code) => {
    
    this.props.handleJoin(code)
    this.props.toggleGameMenu();
  }
  handleHighscore = (evt) =>{
    evt.stopPropagation()
    this.props.toggleGameMenu();
    this.props.toggleHighscoreMenu();

  }
  handleCreateRoom = () => {

    this.props.handleCreateRoom()
  }

  render() {
    let { listOpen } = this.props;
    const Menu = posed.div({
      enter: {
        x: "0%",
        visible: {
          opacity: 1,
          transition: { duration: 300 }
        }
      },
      exit: {
        x: "200%",
        visible: {
          opacity: 0
        },
        transition: { duration: 150 }
      }
    });
    return (
      <div className={container()}>
        <div style={{ position: "fixed" }}>
          <div
            className="menu-button-toggle"
            onClick={this.props.toggleGameMenu}
          >
            <HamburgerMenuIcon />
          </div>
          <div style={{ marginTop: "50px" }} />
          <PoseGroup>
            {listOpen && (
              <Menu className="menu" key="menu">
                <ul onClick={this.props.toggleGameMenu}>
                 {this.props.currentGame.nickName != "" && this.props.currentGame.gameId === "" && <li onClick={this.handleCreateRoom}> Create Room</li>}
                  {this.props.currentGame.gameId != "" && <li onClick={this.handleLeave}> Leave Room</li>}
                  {this.props.currentGame.isActive &&
                  <li
                  onClick={this.handleHighscore
                  }
                  >
                    {" "}
                    Game Leaderboard
                  </li>}
                  {/* <li onClick={this.handleMessage}> send message</li> */}
                  {/* <li onClick={this.handleMessageToOthers}>
                    {" "}
                    send message to others
                  </li> */}
                  {this.props.currentGame.isActive && <li onClick={this.handleInputFocus}>
                    {" "}
                  <TextFieldCode onChange={this.handleText} handleClick={this.handleClick}  />
                    
                    
                  </li>}
                    {!this.props.currentGame.isActive  && !this.props.currentGame.gameId  &&
                  <li onClick={this.handleInputFocus}>
                    {" "}
                  <TextField onChange={this.handleText} handleClick={this.handleSetNickName} currentGame={this.props.currentGame} />
                    
                    
                  </li>}
    
                  {(this.props.currentGame.isAdmin === this.props.socket.id) && !this.props.currentGame.isActive && (
                    <li
                      onClick={() =>
                        this.props.dealCardsAndStartGame("Game room")
                      }
                    >
                      {" "}
                      Deal cards and start game
                    </li>
                  )}
                  {(this.props.currentGame.isAdmin === this.props.socket.id) && !this.props.currentGame.isActive && (
                    <li
                      onClick={() =>
                        this.props.dealAllCardsAndStartGame("Game room")
                      }
                    >
                      {" "}
                      Play with all cards and start game
                    </li>
                  )}
                
                </ul>
              </Menu>
            )}
          </PoseGroup>
        </div>
      </div>
    );
  }
}
const container = props => css`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  .menu-button-toggle {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 1rem;
    cursor: pointer;
  }
  ul {
    //viewheight and viewwidth fefers to device height and width
    width: 100vw;
    height: 100vh;
    position: relative;
    right: 0;
    background-color: ${colors.lightBlue};
    list-style: none;
    padding-top: 0.5rem;
    border-top: 1px solid ${colors.tapestry};
    li {
      border-bottom: 1px solid ${colors.tapestry};
      padding-bottom: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      cursor: pointer;
    }
  }
  .menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50px;
    right: 0px;
    z-index: 1;
  }
`;

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
)(SideMenu);
