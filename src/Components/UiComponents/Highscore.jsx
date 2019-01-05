import React, { Component } from "react";

import { connect } from "react-redux";

import { joinSocket, joinGameRoom } from "../../actions/index";
import { css } from "emotion";
import HamburgerMenuIcon from "mdi-react/HamburgerMenuIcon";
import FormatListNumbersIcon from "mdi-react/FormatListNumbersIcon";
//This should be podiumgoldIcon
import posed, { PoseGroup, Transition } from "react-pose";
import colors from "../../base-styles/colors";
import TextField from "./TextField";
import TextFieldCode from "./TextFieldCode";
class Highscore extends Component {
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
    this.props.toggleHighscoreMenu();
    this.props.handleMessageToOthers("Game room");
  };

  handleMessage = event => {
    this.props.handleMessage("Game room test message");
  };

  handleLeave = event => {
    event.stopPropagation();
    this.props.toggleHighscoreMenu();
    this.props.handleLeave("Game room");
  };

  handleJoin = event => {
    event.stopPropagation();
    this.props.handleJoin("Game room");
    this.props.toggleHighscoreMenu();
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

  handleClick = (code) => {
    
    this.props.handleJoin(code)
    this.props.toggleHighscoreMenu();
  }

  handleCreateRoom = () => {

    this.props.handleCreateRoom()
  }

  render() {
    let { highscoreOpen } = this.props;
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
            onClick={this.props.toggleHighscoreMenu}
          >
            <FormatListNumbersIcon />
          </div>
          <div style={{ marginTop: "50px" }} />
          <PoseGroup>
            {highscoreOpen && (
              <Menu className="menu" key="menu">
                <ul onClick={this.props.toggleHighscoreMenu}>
            
                  <li
                  // onClick={this.handleMessage
                  // }
                  >
                    {" "}
                    Game Leaderboard
                  </li>
                  {this.props.currentGame.players.map(player =>
                    <li className="player-score"><p>{player.user}</p><p>{player.points}</p></li>)}
                     {this.props.currentGame.isActive && (this.props.currentGame.isAdmin === this.props.socket.id) && <li><p className="correct-button" onClick={this.props.giveUserPoints}>Good answer</p> 
                  <p className="wrong-button" onClick={this.props.moveToNextUser}>Bad answer</p></li> }
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
  bottom: 0;
  right: 0;
  z-index: 1;
  .wrong-button{    border: none;
    background-color: red;
    padding: 15px 32px;
    max-height:100%;
    text-align: center;}
  .correct-button{    border: none;
    background-color: green;
    padding: 15px 32px;
    max-height:100%;
    text-align: center;}
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
    // border-top: 1px solid ${colors.tapestry};
    li {
      // border-bottom: 1px solid ${colors.tapestry};
      // padding-bottom: 0.5rem;
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
)(Highscore);
