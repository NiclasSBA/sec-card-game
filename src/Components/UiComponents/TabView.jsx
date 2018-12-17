import React, { Component } from 'react';
import CheckboxList from "./CheckboxList";
import { connect } from 'react-redux'
import { joinSocket, joinGameRoom } from '../../actions/index';


class TabView extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          activeTabId: 0
        };
      }
    //   {Object.keys(this.state.initialCards.cards).map((cardSuit,index) =>
         
    //     <CheckboxList style={{display : "flex", flexDirection : "column"}} cardSuit={cardSuit} cards={this.state.initialCards.cards[cardSuit]}/>)}
 
   handleTabchange =  (cardSuit) => {
        
    
    var cardSuits = {...this.props.tabs}
     var cardSuitArray = Object.keys(this.props.tabs)
        var index = cardSuitArray.indexOf(cardSuit)

        this.setState({
            activeTabId: index
        })

     console.log(index
        
     )
     this.props.handleTabchange(index);
   }
 
   createTab = (cardSuit) =>  (
//    console.log(this.props.tabs[cardSuit])
    <CheckboxList style={{display : "flex", flexDirection : "column"}} cardSuit={cardSuit} cards={this.props.tabs[cardSuit]}/>
   )

   populateTabs = () => {
       // gives names of tabs
       var cardSuitArray = Object.keys(this.props.tabs) 
       
        var currentIndex = this.state.activeTabId

        //get current tab
        var tabs = {...this.props.tabs}



       // Gives array placement number
    //    var indexNumber = cardSuitArray.indexOf(card)
      
       
    Object.keys(this.props.tabs).map((cardSuit,index) => (
        // console.log("current tab:" ,currentIndex, "index:", index)
         currentIndex === index ? this.createTab(cardSuit) : ""
    )
         

    
    
    )
   }

  render() {
    return (
      <div>
          <div  style={{ display: "flex"}}>
          {Object.keys(this.props.tabs).map((cardSuit,index) => 
            <label for={cardSuit} onClick={ () => this.handleTabchange(cardSuit)}><div >{cardSuit} </div></label> )}</div>
        <div>{this.populateTabs}</div>
          
         
     
  
    
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

export default connect(mapStateToProps,mapDispatchToProps)(TabView)