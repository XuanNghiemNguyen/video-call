import React, { useEffect, useRef } from 'react'
import './App.css';
import io from "socket.io-client"
import { useDispatch } from 'react-redux'
import ChatFrame from './components/chat';
import UserFrame from './components/user';
import { isMobile } from 'react-device-detect'

function App() {
  const socket = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.current = io.connect('https://127.0.0.1:3000/');
    socket.current.on('username', ({ username }) => {
      dispatch({ type: 'SET_USER_INFO', payload: { username } })
    })
    socket.current.on('clients', (clients) => {
      dispatch({ type: 'SET_FRIENDS', payload: { friends: clients } });
    })
    socket.current.on("message_is_coming", (data) => {
      dispatch({ type: 'PUSH_MESSAGE', payload: data });
    })

  }, [dispatch])
  return (
    <div style={{ background: '#A99985', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ChatFrame socket={socket} />
      {!isMobile && <UserFrame />}
    </div>
  );
}

export default App;
