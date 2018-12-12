import store from "../store/store";
import { addArticle, joinSocket,joinGameRoom } from "../actions/index";

window.store = store;
window.addArticle = addArticle;
window.joinSocket = joinSocket;
window.joinGameRoom = joinGameRoom;