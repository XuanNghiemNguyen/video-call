import React from 'react'
import { useSelector } from 'react-redux'
import { Frame, OnlineUser } from './index.style'
import { Divider, Avatar } from 'antd'
import * as randomColor from 'randomcolor'

const UserFrame = () => {
	const user = useSelector(state => state.user)
	const friends = useSelector(state => state.friends)
	return (
		<Frame>
			<Divider orientation='center'>Hi {user?.username || "unknown"}</Divider>
			<div >
				{
					Object.entries(friends)?.filter(i => i[0] !== user?.username)?.map((user, index) => (
						<OnlineUser key={index}>
							<Avatar size={"small"} style={{ color: 'white', backgroundColor: randomColor() }}>{user[0].charAt(0).toUpperCase(0)}</Avatar>&nbsp;
							{user[0]}
						</OnlineUser>
					))
				}
			</div>
		</Frame>
	)
}

export default UserFrame;