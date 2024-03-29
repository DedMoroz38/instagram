import { io } from 'socket.io-client';

const socket = io(`http://${process.env.REACT_APP_IP}:4000`, {
  autoConnect: false,
  withCredentials: true
});

export default socket;