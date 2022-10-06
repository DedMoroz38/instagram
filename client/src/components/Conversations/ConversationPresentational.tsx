import styled from "styled-components";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import React, { RefObject } from "react";

const MainContainer = styled.div`
  display: flex;
  border: 1px solid black;
  width: 70vw;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid rgb(207, 205, 202);
  align-items: center;
  border-radius: 100px;
  height: 40px;
  width: 600px;
  margin: 20px 0;
`;

const Input = styled.input`
  font-size: 15px;
  color: ${({ theme }) => theme.color};
  width: 500px;
  border: none;
  background: ${({ theme }) => theme.background};
  transition: all 0.3s linear; 
`;

const NameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 100%;
  color: ${({ theme }) => theme.color};
`;

const MessagesBox = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: end;
  padding: 10px;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 10px #000000;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
`;
const MessageBoxUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(207, 205, 202);
  border-radius: 20px;
  padding: 8px;
  margin-bottom: 7px;
  max-width: 70%;
  white-space: normal;
  word-break:break-all;
  margin-left: auto;
`;

const MessageBoxFriend = styled(MessageBoxUser)`
  margin-left: inherit;
  margin-right: auto;
  border: 1px solid black;
`;
const Message = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color};
`;

interface Conversations{
  messages: Array<{
    [x: string]: any;
    id?: string,
    message: string,
    messagefrom: string
    messageto: string
  }>,
  handleBlur: () => void,
  messagesInput: RefObject<HTMLInputElement>,
  handleKeypress: (e: { key: string; }) => void,
  sendMessage: () => void,
  friendName: string,
  friendId: string,
  bottomDiv: RefObject<HTMLDivElement>
}

const ConverationPresentational: React.FC<Conversations> = ({
    friendName,
    friendId,
    messages,
    handleBlur,
    messagesInput,
    handleKeypress,
    sendMessage,
    bottomDiv
  }) => {


  return (
    <MainContainer>
      <NameBox>{friendName}</NameBox>
      <MessagesBox>
        {
          messages
          .filter(msg => msg.messageto === friendId || msg.messagefrom === friendId)
          .map((message, index) => (
            message.messageto === friendId ?
            <MessageBoxUser key={index}>
              <Message>{message.message}</Message>
            </MessageBoxUser> :
            <MessageBoxFriend key={index}>
              <Message>{message.message}</Message>
            </MessageBoxFriend>
          ))
        }
        <div ref={bottomDiv}/>
      </MessagesBox>
      <InputContainer>
        <AttachFileIcon style={{color: `grey`}}/>
        <Input 
          onBlur={handleBlur}
          ref={messagesInput}
          autoFocus
          onKeyPress={handleKeypress}
        />
        <SendButton onClick={() => sendMessage()}><SendIcon /></SendButton>
      </InputContainer>
    </MainContainer>
  )
}
export default ConverationPresentational;
