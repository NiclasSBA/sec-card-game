import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


//REDUX STORE

// 
// import server from './server';
import http from 'http';
// import socketServer from './server/socket-server';
 





ReactDOM.render(
    <App />, document.getElementById('root'));

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
