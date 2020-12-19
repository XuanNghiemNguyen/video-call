import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import io from 'socket.io-client'
import { useDispatch } from 'react-redux'
import ChatFrame from './components/chat'
import UserFrame from './components/user'
import { isMobile } from 'react-device-detect'
import VideoCall from './components/video-chat'

function App() {
  const socket = useRef()
  const dispatch = useDispatch()
  const [myName, setMyName] = useState('unknown')
  // const [remoteStream, setRemoteStream] = useState([])
  useEffect(() => {
    socket.current = io.connect('https://192.168.1.22:4000')
    socket.current.on('username', ({ username }) => {
      localStorage.setItem('myName', username)
      dispatch({ type: 'SET_USER_INFO', payload: { username } })
    })
    socket.current.on('clients', (clients) => {
      dispatch({ type: 'SET_FRIENDS', payload: { friends: clients } })
    })
    socket.current.on('message_is_coming', (data) => {
      dispatch({ type: 'PUSH_MESSAGE', payload: data })
    })
  }, [dispatch])
  return (
    <>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path='/video-call'>
              <VideoCall socket={socket} />
            </Route>
            <Route path='/chat'>
              <div
                style={{
                  background: '#A99985',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh'
                }}
              >
                <ChatFrame socket={socket} />
                {!isMobile && <UserFrame />}
              </div>
            </Route>
            <Route path='/'>
              <div>Hello I'm Xuan Nghiem</div>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App
