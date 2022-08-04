import styled from "styled-components";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import React from "react";

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
`;

const NameBox = styled.div`
  display: flex;
  justify-content: center;
  height: 55px;
  width: 100%;
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
`;

const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
`;
const MessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(207, 205, 202);
  border-radius: 20px;
  padding: 8px;
  margin-bottom: 7px;
`;
const Message = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color};
`;

interface Conversations{
  messages: string[],
  handleBlur: any,
  messagesInput: any,
  handleKeypress: any,
  sendMessage: any
}

const ConverationPresentational: React.FC<Conversations> = ({
    messages,
    handleBlur,
    messagesInput,
    handleKeypress,
    sendMessage
  }) => {
  return (
    <MainContainer>
      <NameBox></NameBox>
      <MessagesBox>
        {messages.map((message) => (
            <MessageBox>
              <Message>{message}</Message>
            </MessageBox>
          ))}
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
