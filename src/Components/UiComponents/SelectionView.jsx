import React, { Component } from "react";
import CheckboxList from "./CheckboxList";
import { connect } from "react-redux";
import { joinSocket, joinGameRoom } from "../../actions/index";

class SelectionView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabId: 0
    };
  }

 
  handleTabchange = cardSuit => {
    var cardSuits = { ...this.props.tabs };
    var cardSuitArray = Object.keys(this.props.tabs);
    var index = cardSuitArray.indexOf(cardSuit);

    this.setState({
      activeTabId: index
    });

    console.log(index);
  };

  createTab = cardSuit => (
    //    console.log(this.props.tabs[cardSuit])
    <CheckboxList
      style={{ display: "flex", flexDirection: "column" }}
      cardSuit={cardSuit}
      cards={this.props.tabs[cardSuit]}
    />
  );

  populateTabs = () => {
    // gives names of tabs
    var cardSuitArray = Object.keys(this.props.tabs);

    var currentIndex = this.state.activeTabId;

    //get current tab
    var tabs = { ...this.props.tabs };

    // Gives array placement number
    //    var indexNumber = cardSuitArray.indexOf(card)

    Object.keys(this.props.tabs).map((cardSuit, index) =>
      // console.log("current tab:" ,currentIndex, "index:", index)
      currentIndex === index ? this.createTab(cardSuit) : ""
    );
  };

  countCards = () => {
    let {
      dataValidationEncoding,
      authentication,
      sessionManagement,
      authorization,
      cryptography,
      wildCards
    } = this.props.tabs;
    var datavalidation_cards = [...dataValidationEncoding];
    var authentication_cards = [...authentication];
    var session_management_cards = [...sessionManagement];
    var authorization_cards = [...authorization];
    var cryptography_cards = [...cryptography];
    var wildCards_cards = [...wildCards];
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
    return countedCards;
  };

  findTab = index => {
    var countedCards = this.countCards();

    return countedCards[index];
  };

  
  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {Object.keys(this.props.tabs).map(
            (cardSuit, index) =>
              this.props.currentTab === index && (
                
                  <div>
                    <CheckboxList
                      cards={this.props.tabs[cardSuit]}
                      cardSuit={cardSuit}
                      toggleCheckbox={this.props.toggleCheckbox}
                      listOfSelectedCards={this.props.listOfSelectedCards}
                    />{" "}
                  </div>
              
              )
          )}
        </div>
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
)(SelectionView);
