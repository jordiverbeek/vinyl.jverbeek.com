import { io } from "socket.io-client";

const socket = io("https://vinyl.jverbeek.com", {
  autoConnect: true,
});

export default socket;
