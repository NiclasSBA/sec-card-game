import React, { Component } from "react";

import { connect } from "react-redux";
import Checkbox from "./Checkbox";
import { joinSocket, joinGameRoom } from "../../actions/index";
import { css } from 'emotion'
class CheckboxList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfSelectedCards: this.props.listOfSelectedCards,
      allSelected: false
    };
  }

  handleInitial = card => {
    var suit = card.suit;
    var number = card.number;
    if (
      this.props.cards.findIndex(
        card => card.suit === suit && card.number === number
      ) > -1
    ) {
      return true;
    }
    console.log(
      "checklist",
      this.props.cards.findIndex(
        card => card.suit === suit && card.number === number
      )
    );
  };
  createCheckbox = (suppliedCard, index) =>
  {  
    if(this.props.listOfSelectedCards.findIndex((card) =>   card.suit === suppliedCard.suit && card.number === suppliedCard.number) > -1){
   return   <Checkbox
        key={index}
        card={suppliedCard}
        handleCheckboxChange={this.props.toggleCheckbox}
        key={suppliedCard.number}
        isChecked={true}
      />}
      else{
        return   <Checkbox
        key={index}
        card={suppliedCard}
        handleCheckboxChange={this.props.toggleCheckbox}
        key={suppliedCard.number}
        isChecked={false}
      />

      }
  
  }
  toggleCheckbox = card => {
    // let{ listOfSelectedCards} = this.props
    // // console.log(listOfSelectedCards.includes(card))
    // // console.log(listOfSelectedCards)
    // console.log(card)
    // var index = listOfSelectedCards.indexOf(card)
    // if (listOfSelectedCards.includes(card)) {
    //   listOfSelectedCards.slice(index,1);
    //   // this.props.toggleCheckbox(listOfSelectedCards)
    // } else {
    //   // console.log("does not contain",listOfSelectedCards.indexOf(card))
    //   listOfSelectedCards.push(card)
    // }
    //  this.props.toggleCheckbox(card)
  };

  handleSelectAll = () => {
    this.setState(({ allSelected }) => ({
      allSelected: !allSelected
    }));
    
    
  };
  //if this somehow fails, look at how you are populating cards into parent
  //I had small time trouble with componentdidmount(threw error), and componentwillmount(did work)
  createCheckboxes = card =>
    this.props.cards.map(card => {
      return this.createCheckbox({ suit: this.props.cardSuit, ...card });
    });

    findAmountSelectedCards = () => {
      let {cardSuit, cards, listOfSelectedCards} = this.props
      var alreadyAddedCards =[]
      cards.map(card =>{
        var number = card.number;
        var index = listOfSelectedCards.findIndex(
          card => card.suit === cardSuit && card.number === number
        );
        if (index > -1) {
          alreadyAddedCards.push({cardSuit,...card});
        }    

      })
      // console.log(alreadyAddedCards)
      // console.log(alreadyAddedCards.length)
      return alreadyAddedCards.length
    }

  render() {
    let { cards } = this.props;
    return (
      <div style={this.props.style} className={container()}>
        {this.createCheckboxes()}
{/*im returning the length of an array that contains already added card, if that length matches the amount of cards in this.props.cards, all cards is added, and selectall should be = true*/}
       <Checkbox  card={"none"} isChecked={cards.length === this.findAmountSelectedCards() && true} text={"Select All"}  toggleAllCheckboxes={this.props.toggleAllCheckboxes} cards={cards} cardSuit={this.props.cardSuit}/>
        {/* <div> {   "true"}</div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // ...
});
const container = () => css `
display: flex;
//  justify-content: center;
// flex-direction: column;

 width: 100vw;
 flex-wrap: wrap;
 align-content: center;
 div {
   display:flex;

  //  flex: 1 0 calc(33.333% - 20px);
}
div:nth-child(3n){
  
}
`
const mapDispatchToProps = dispatch => ({
  joinSocket: socket => dispatch(joinSocket(socket)),
  joinGameRoom: socket => dispatch(joinGameRoom(socket))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxList);
