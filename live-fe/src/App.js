import React, {useEffect, useState, useRef} from 'react'
import './App.css';
import io from "socket.io-client"

function App() {
  const socket = useRef();
  const [onlineClient, setOnlineClient]= useState([]);
  const [myName, setMyName]= useState("user_unknown");
  useEffect(() => {
    socket.current = io.connect('https://127.0.0.1:4000/');
    socket.current.on('username', ({username}) => {
      setMyName(username);
    })
    socket.current.on('clients', (clients) => {
      setOnlineClient(clients);
    })
  }, [])
  

  return (
    <div className="App">
      <header className="App-header">
        <h4>
          Hello <code>{myName}!</code>
        </h4>
        <p>list online friends:</p>
        <ul>
          {
            onlineClient && Object.entries(onlineClient)?.filter(user => user[0] !== myName)?.map(user => (
              <li>
                {user[0]}
              </li>
            ))
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
