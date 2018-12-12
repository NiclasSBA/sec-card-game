import {ADD_ARTICLE, JOIN_GAMEROOM, JOIN_SOCKET} from '../constants/action-types';

export const addArticle = article => ({ type: ADD_ARTICLE, payload: article });
export const joinGameRoom = data => ({ type: JOIN_GAMEROOM, payload: data });
export const joinSocket = socket => ({ type: JOIN_SOCKET, payload: socket });


/*Since strings are prone to typos and duplicates it’s better to have action types declared as constants. */

