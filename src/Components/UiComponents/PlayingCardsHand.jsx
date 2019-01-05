import React, { Component, Fragment } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { io, openSocket } from "socket.io-client";
import colors from "../../base-styles/colors";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { joinSocket, joinGameRoom } from "../../actions/index";
import { css } from "emotion";
import posed, { PoseGroup } from "react-pose";

class PlayingCardsHand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: {},
      currentCardToBePlayed: {}
    };
  }

  setCurrentCard = card => {
    var currentCardToBePlayed = { ...this.state.currentCardToBePlayed };
    currentCardToBePlayed = card;
    if(!this.props.currentGame.currentPlayerHasPlayedCard && this.state.currentCardToBePlayed !== {} && this.props.currentGame.isCurrentPlayer){
    this.setState({
      currentCardToBePlayed
    });
    // console.log("this is the card displayed", card);
    this.props.setCardToPlay(card);
  }
  };

  countCardsInSuit = cs => {
    var csAmount = 0;
    this.props.cardsInHand.map(cardInHand => {
      if (cardInHand.suit === cs) {
        csAmount++;
      }
    });
    return csAmount;
  };
handleClick = () => {
let {currentGame} = this.props;
  var currentCardToBePlayed = {...this.state.currentCardToBePlayed}
if(currentGame.isCurrentPlayer && Object.keys(currentGame.currentCardInPlay).length > 0 && !this.props.currentGame.currentPlayerHasPlayedCard){
  // console.log(Object.keys(currentGame.currentCardInPlay).length === 0)
  this.props.sendCardToOtherSockets(currentCardToBePlayed)
}

}
  render() {
    return (
      <div className={container()}>
        <div >
          <div style={{ marginTop: "50px" }} />
          {/* This removes empty suits so we dont get confused */}
         <div className="cards-in-hand-header-suit"> {Object.keys(this.props.tabs).map((cs,index) =>
            this.countCardsInSuit(cs) > 0 && <h2 key={index} onClick={() => this.props.handleCardsInHandHeaderChange(cs)}>{cs}</h2>
          )}</div>
         <div  className="cards-in-hand-container" > <div className="cards-in-hand">
            {this.props.cardsInHand.map((card, index) => (
              card.suit === this.props.currentGame.currentCardHeader && <div  className="card-in-hand"  onClick={ (event => this.setCurrentCard(card))} key={index}>
              
                <div style={{display: "flex", flexDirection: "column", marginLeft: "1rem"}}><p>{`Number: ${card.number}`} </p>
                <p style={{margin: "0"}}>{`Description: `}</p></div>
                <p className="description">{card.description}</p>
              </div>
            ))}
          </div></div>
          <div className="footer"><p className="play-card-button" onClick={this.handleClick}>Play this card</p></div>
        </div>
      </div>
    );
  }
}
const container = () => css`
.cards-in-hand-header-suit{
display:flex;
justify-content: flex-start;
overflow:auto;
border-bottom: 1px solid white;
h2{
 padding: 0 0.5rem;
}
}
.description{
  overflow-y: scroll;
  position: relative;
  margin-right: 1rem;
  min-height: 50px;
}
.cards-in-hand-container{
    
    overflow:hidden;
    height: 50vh;
    position:relative;
}
  .cards-in-hand {
    display: flex;
    flex-direction: column;
    // flex-wrap: wrap;
    position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: -17px;
      overflow-y: scroll;
  }

  .card-in-hand{
    display:flex;
    width: 100vw;
    border-bottom: 1px solid white;
    min-height: 150px;
    overflow:hidden;
  }
  .menu-button-toggle {
    width: 50px;
    height: 50px;
    // It needs to be position: absolute, otherwise, the menu will blink in and out
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
  .play-card-button{
    border: none;
    color: ${colors.white};
    // padding: 15px 32px;
    max-height:100%;
    text-align: center;
  }
  .footer{
    display: flex;
    justify-content: center;
    align-items: center;
      position: fixed;
      bottom: 0;
      height: 30px;
      background-color: ${
        colors.navy
      };
      width: 100vw;
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
)(PlayingCardsHand);
