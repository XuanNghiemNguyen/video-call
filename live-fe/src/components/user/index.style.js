import React from 'react'
import styled from 'styled-components'

const Frame = styled.div`
  background: white;
  width: 15vw;
  margin-left: 20px;
  height: 100vh;
  border-radius: 10px; 
  display: flex;
  flex-direction: column;
`;

const OnlineUser = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
export { Frame, OnlineUser }