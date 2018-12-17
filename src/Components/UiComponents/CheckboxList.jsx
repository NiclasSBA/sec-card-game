import React, { Component } from 'react';

import { connect } from 'react-redux'
import Checkbox from './Checkbox';
import { joinSocket, joinGameRoom } from '../../actions/index';


class CheckboxList extends Component {
    constructor(props) {
        super(props);
     
       
        this.state ={
          listOfSelectedCards: [],
          allSelected: false,
        }
      }

      

      createCheckbox = (card, index) => (
        <Checkbox
        key= {index}
                card={card}
                handleCheckboxChange={ this.props.toggleCheckbox}
                key={card.number}
            />
      )
    
        
      toggleCheckbox = (card) => {
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
        }
        
      handleSelectAll = () => {
        
          
        this.setState(({ allSelected }) => (
          {
            allSelected: !allSelected,
          }
        ));
        
      }
      //if this somehow fails, look at how you are populating cards into parent
      //I had small time trouble with componentdidmount(threw error), and componentwillmount(did work)
      createCheckboxes = card => (
         this.props.cards.map( card => this.createCheckbox({suit : this.props.cardSuit, ...card}))
       
      )
 
     
  render() {
    let{cards} = this.props;
    return (
      <div style={this.props.style}>
       { this.createCheckboxes()}
        <Checkbox
                card={"none"}
                handleCheckboxChange={this.handleSelectAll}
               
            /> 
          
     
  
    
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

export default connect(mapStateToProps,mapDispatchToProps)(CheckboxList)