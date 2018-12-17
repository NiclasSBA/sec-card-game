 export function countCards ()  {

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
    return countedCards;
  }

 