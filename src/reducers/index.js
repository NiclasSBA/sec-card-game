import {ADD_ARTICLE, JOIN_GAMEROOM, JOIN_SOCKET} from '../constants/action-types';

/*to describe state mutations you have
 to write a function that takes previous state 
 & the action being dispatched
and returns the next state of the app. */

//Reducers produce the state of the application.


/* The reducer calculates the next state depending on the action type.
 Moreover, it should return at least the initial state when no action type matches. */
const initialState = {
    articles: [],
    socket: {},
    gameRoom:{}

  };
 
  const rootReducer = (state = initialState, action) => {

    switch(action.type){

      // the ... is the spread operator, it returns a copy
      //instead of passing a reference to prev state
      case ADD_ARTICLE:
        return {...state, articles: state.articles.concat(action.payload)};
        

        //not sure if this is correct with socket.io
      case JOIN_SOCKET:
        return {...state, socket: Object.assign(action.payload)};
      case JOIN_GAMEROOM:
        return {...state, gameRoom: Object.assign(action.payload)};
    
        
      default:
        return state;
    }
  }
  export default rootReducer;