import styled from 'styled-components'

const Frame = styled.div`
  background: white;
  width: 100vw;
  height: 100vh;
  border-radius: 10px; 
  display: 'flex';
  flex-direction: 'column';
  justify-content: 'flex-start'; 
`;

const ChatTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const ChatContentWrapper = styled.div`
  position: relative;
  height: calc(100vh - 50px);
  width: 100%;
`

const ChatContent = styled.div`
  height: calc(100vh - 50px - 40px - 15px);
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  overflow: overlay;
  &::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
  }
  /* Optional: show position indicator in red */
  &::-webkit-scrollbar-thumb {
      background: #FF0000;
  }
`
const ActionFrame = styled.div`
  width: 100%;
  height: 40px;
  background-color: white;
  position: absolute;
  bottom: 12px;
  left: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
export { Frame, ChatTab, ChatContent, ChatContentWrapper, ActionFrame }