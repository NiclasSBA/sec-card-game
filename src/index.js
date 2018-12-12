import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
 import rootReducer from './reducers/index'
import * as types from './constants/action-types'
//REDUX STORE
 import index from "./js/index";
// 
// import server from './server';
import http from 'http';
// import socketServer from './server/socket-server';
 



const store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


// let nextMessageId = 0
// const nextUserId = 0

// export const addMessage = (message, author) => ({
//   type: types.ADD_MESSAGE,
//   id: nextMessageId++,
//   message,
//   author
// })

// export const addUser = name => ({
//   type: types.ADD_USER,
//   id: nextUserId++,
//   name
// })

// export const messageReceived = (message, author) => ({
//   type: types.MESSAGE_RECEIVED,
//   id: nextMessageId++,
//   message,
//   author
// })

// export const populateUsersList = users => ({
//   type: types.USERS_LIST,
//   users
// })
