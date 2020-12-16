import Avatar from 'antd/lib/avatar/avatar'
import { useSelector } from 'react-redux'
import React from 'react'
import * as randomColor from 'randomcolor'

const avatar_color = randomColor()
const Message = ({ name, message, time }) => {
	const { username } = useSelector(state => state.user)
	const isMine = username === name;
	return (
		<div style={{ marginBottom: 5 }}>
			{
				isMine ? (<div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
					<div style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: '#3A6EA5', padding: 5, borderRadius: 5, color: 'white' }}>
						{/* <div style={{ fontSize: '0.7rem', display: 'flex', justifyContent: 'flex-end' }}>
							{name}:
						</div> */}
						<div style={{ fontSize: '1rem', overflowWrap: 'break-word' }}>
							{message}
						</div>
					</div>
				</div>) : (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Avatar size='default' style={{ color: 'white', backgroundColor: avatar_color, marginRight: 5 }}>{name?.charAt(0)?.toUpperCase()}</Avatar>
					<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: '#3A6EA5', paddingRight: 20, paddingLeft: 15, borderRadius: 5, color: 'white', position: 'relative' }}>
						<div style={{ fontSize: '0.6rem' }}>
							{name}:
						</div>
						<div style={{ fontSize: '1rem', overflowWrap: 'break-word' }}>
							{message}
						</div>
					</div>
				</div >)
			}
		</div >
	)
}

export default Message;