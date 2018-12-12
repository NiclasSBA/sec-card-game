import { JOIN_SOCKET } from "../constants/action-types";

export function joinSocket(index) {
    return { type: JOIN_SOCKET, index }
  }