import React, { useEffect, useRef, useState } from 'react'
import { checkDeviceSupport } from '../../helper/deviceSupport'
import Background from './background.png'
import Peer from 'simple-peer'
import { useSelector } from 'react-redux'
let isSet = false
const VideoCall = ({ socket }) => {
  const myVideoRef = useRef(null)
  const partnerVideoRef = useRef(null)
  const commonScreenRef = useRef(null)

  const listPartner = useRef([])
  const myPeer = useRef()
  const [friends, setFriends] = useState([])
  const [stream, setStream] = useState([])
  const [isSharingScreen, setIsSharingScreen] = useState(false)
  // const { username } = useSelector((state) => state.user)
  // const [remoteStream, setRemoteStream] = useState([])
  const switchToCommonScreen = (stream) => {
    commonScreenRef.current.srcObject = stream
  }
  function stopStreamedVideo(videoElem) {
    const stream = videoElem.srcObject
    const tracks = stream.getTracks()

    tracks.forEach(function (track) {
      track.stop()
    })

    videoElem.srcObject = null
  }

  const toggleShareScreen = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        video: true,
        audio: true
      })
      .then((screenStream) => {
        myPeer.current.replaceTrack(
          stream.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          stream
        )
        myVideoRef.current.srcObject = screenStream
        screenStream.getTracks()[0].onended = () => {
          myPeer.current.replaceTrack(
            screenStream.getVideoTracks()[0],
            stream.getVideoTracks()[0],
            stream
          )
          myVideoRef.current.srcObject = stream
        }
      })
  }

  useEffect(() => {
    const requestDeviceSupport = () => {
      if (window !== undefined && navigator) {
        const { isLoading, camera, microphone } = checkDeviceSupport(
          window,
          navigator
        )
        if (isLoading === false) {
          if (camera === false) return alert('Thiết bị của bạn không có camera')
          if (microphone === false)
            return alert('Thiết bị của bạn không có microphone')
        }
        navigator.mediaDevices
          ?.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setStream(stream)
            if (myVideoRef && stream) {
              myVideoRef.current.srcObject = stream
            }
            const peer = new Peer({
              initiator: true,
              trickle: false,
              // config: {
              //   iceServers: [
              //     {
              //       urls: 'stun:numb.viagenie.ca',
              //       username: 'sultan1640@gmail.com',
              //       credential: '98376683'
              //     },
              //     {
              //       urls: 'turn:numb.viagenie.ca',
              //       username: 'sultan1640@gmail.com',
              //       credential: '98376683'
              //     }
              //   ]
              // },
              stream: stream
            })
            myPeer.current = peer

            peer.on('signal', (data) => {
              socket.current.emit('join_video', {
                signalData: data,
                my_name: localStorage.getItem('myName')
              })
            })

            peer.on('stream', (stream) => {
              console.log('data stream: ', stream)
              if (listPartner.current && stream) {
                listPartner.current = [
                  ...listPartner.current,
                  { srcObject: stream }
                ]
              }
              if (partnerVideoRef.current && stream) {
                partnerVideoRef.current.srcObject = stream
              }
              console.log(listPartner.current, 'Nghiem')
            })

            // peer.on('error', (err) => {})
            peer.on('error', (error) => {
              console.log(error)
            })
            socket.current.on('join_accepted', ({ from, signal }) => {
              if (from !== localStorage.getItem('myName') && !isSet) {
                isSet = true
                console.log(friends)
                if (!friends.some((fr) => fr === from)) {
                  setFriends((state) => [...state, from])
                  console.log('user-join:', from)
                  peer.signal(signal)
                }
              }
            })
          })
          .catch(() => {
            console.log('Please camera and microphone permission')
          })
      }
    }
    requestDeviceSupport()
  }, [])

  // useEffect(() => {
  //   if (remoteStream?.length > 1) {
  //     console.log(remoteStream)
  //     setRemoteStream(remoteStream[1])
  //   }
  // }, [remoteStream])

  const setRemoteStream = (stream) => {
    if (partnerVideoRef && stream) {
      partnerVideoRef.current.srcObject = stream
    }
  }
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundImage: `url(${Background})`
      }}
    >
      <div
        style={{
          height: '94%',
          width: '99%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            height: '96%',
            width: '20%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            overflow: 'overlay',
            backgroundColor: '#5e5b521a',
            borderRadius: 10,
            padding: 10
          }}
        >
          <video
            ref={myVideoRef}
            onClick={() => switchToCommonScreen(myVideoRef.current.srcObject)}
            id='myVideo'
            width='100%'
            autoPlay
            playsInline
            style={{ paddingBottom: 10, position: 'relative' }}
          >
            <div style={{ position: 'absolute', bottom: 5, right: 5 }}>
              asdasd
            </div>
          </video>
          <video
            ref={partnerVideoRef}
            onClick={() =>
              switchToCommonScreen(partnerVideoRef.current.srcObject)
            }
            id='partnerVideo'
            width='100%'
            autoPlay
            playsInline
            style={{ paddingBottom: 10, position: 'relative' }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 50,
                right: 50,
                color: 'white',
                zIndex: 9990
              }}
            >
              asdasd
            </div>
          </video>
        </div>
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            overflowY: 'hidden'
          }}
        >
          <video
            ref={commonScreenRef}
            id='partnerVideo'
            height='100%'
            src={'https://www.w3schools.com/tags/movie.ogg'}
            autoPlay
            playsInline
          ></video>
        </div>
      </div>
      <div
        style={{
          height: '6%',
          width: '100%',
          background: '#5e5b5254',
          marginBottom: 5,
          borderRadius: 10,
          overflowY: 'scroll'
        }}
      >
        <button onClick={() => toggleShareScreen()}>share screen</button>
      </div>
    </div>
  )
}

export default VideoCall
