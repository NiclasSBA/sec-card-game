import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import {joinSocket} from '../actions';
import socketIO from "socket.io-client";
import socketIoMiddleware from 'redux-socket.io-middleware'
//createStore is the function for creating the Redux store.
//The redux store is the brain of everything in redux.

//You could pass initial state to it
//But that should be done with reducers, since they produce the state
//the state must return entirely from reducers.

//the state of the application lives as a single, immutable object within the store

//A reducer is just a Javascript function.
// A reducer takes two parameters: the current state and an action
const reducers  = (rootReducer);
// const io = socketIO.connect("localhost:3001")
// const store = createStore(reducers,applyMiddleware(
//     ) +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     );
const store = createStore(reducers 
);



export default store;