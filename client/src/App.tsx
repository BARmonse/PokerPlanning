import { useEffect } from 'react';
import { io } from 'socket.io-client';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:5000/', {
      transports: ['websocket'],
    });

    socket.emit('test');

    socket.on('test', () => console.log('HOLAA'));

    return () => {
      socket.disconnect();
    };
  }, []);

  return <></>;
}

export default App;
