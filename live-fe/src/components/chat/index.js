import React, { useState, useMemo } from 'react'
import { Frame, ChatTab, ActionFrame, ChatContentWrapper, ChatContent } from './index.style'
import { Divider, Input, Button } from 'antd'
import Background from './background.png'
import Message from '../message'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
const ChatFrame = ({ socket }) => {
	const [currMess, setCurrMess] = useState("");
	const messages = useSelector(state => state.messages)
	const { username } = useSelector(state => state.user)
	const sendMessage = () => {
		if (currMess) {
			socket.current.emit('message', { username, message: currMess })
			setCurrMess("");
		}
	}
	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			sendMessage()
		}
	}
	const handleChangeText = (e) => {
		const text = e.target.value
		setCurrMess(text)
	}
	console.log("asdadad")

	useMemo(() => {
		console.log(currMess)
	}, [currMess])
	return (
		<Frame style={{ backgroundImage: `url(${Background})` }}>
			<ChatTab>
				<Divider orientation='center'>XuanNghiem@hcmus</Divider>
			</ChatTab>
			<ChatContentWrapper >
				<ChatContent>
					{
						messages.map((mess, index) => (
							<Message key={index} time={mess.time} name={mess.username} message={mess.message} />
						))
					}
				</ChatContent>
				<ActionFrame>
					<Input size='large' value={currMess} onChange={handleChangeText} style={{ height: '100%', margin: 10, borderRadius: 10 }} placeholder="type" onKeyPress={handleKeyPress} />
					<Button onClick={() => sendMessage()} type='primary' style={{ height: '100%', margin: 10, borderRadius: 10 }}>SEND</Button>
				</ActionFrame>
			</ChatContentWrapper>
		</Frame>
	)
}

export default ChatFrame;