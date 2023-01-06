import styled from "styled-components";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import React, { RefObject } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Emoji from "../Emoji/EmojiPicker";
import AttachedFilesModal from "./FilesModal/AttachedFilesModal";
import FilesBox from "./FilesModal/FilesBox";
import FileMessage from "./FileMessage";

const MainContainer = styled.div`
  position: relative;
  transition: all 0.3s linear;
  margin-top: 20px;
  display: flex;
  flex-grow: 4;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px 0 0 0;
  background: ${({ theme }) => theme.messageBoxBackground};
`;

const NameBox = styled.div`
  border-radius: 20px 0 0 0;
  background: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 100%;
  color: ${({ theme }) => theme.color};
`;

const MessagesBox = styled.div` 
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  padding: 15px 15px 30px 15px;
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
const ButtonsContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.iconColor};
  width: 90px;
  justify-content: space-between;
`;

const SendButton = styled.button`
  color: ${({ theme }) => theme.iconColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
`;
const MessageBoxUser = styled.div`
  background: ${({ theme }) => theme.message};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px 12px 0 12px;
  min-height: 44px;
  padding: 0 8px;
  margin-bottom: 7px;
  max-width: 70%;
  white-space: normal;
  word-break:break-all;
  margin-left: auto;
  flex-shrink: 0;
  color: white;
`;

const MessageBoxFriend = styled(MessageBoxUser)`
  background: ${({ theme }) => theme.messageFriend};
  margin-left: inherit;
  margin-right: auto;
  border-radius: 0 12px 12px 12px;
  color: ${({ theme }) => theme.messageColor};
`;

const Message = styled.p`
  margin-right: 10px;
  font-size: 16px;
`;

const MessageTimeContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  height: 100%;
  padding-bottom: 5px;
`;

const MessageTimeUser = styled.p`
  color: white;
  bottom: 0;
  font-size: 10px;
`;

const MessageTimeFriend = styled(MessageTimeUser)`
  color: #96989d;
`;

const InputContainer = styled.div`
  transition: all 0.3s linear;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  padding: 0 20px;
  height: 70px;
  width: calc(100% - 30px);
  margin-bottom: 20px;
  background: ${({ theme }) => theme.textInput};
`;

const Input = styled.input`
  font-size: 15px;
  color: ${({ theme }) => theme.color};
  border: none;
  width: 100%;
  background: transparent;
  transition: all 0.3s linear; 
  &::placeholder {
    padding-left: 5px;
  }
`;

const AddFilelabel = styled.label`
  cursor: pointer;
`;


interface Conversations{
  filteredMessages: Array<{
    id: number,
    conversation_id: number,
    message: string,
    created_at: string,
    sender_id: number
  }>,
  handleBlur: () => void,
  messagesInput: RefObject<HTMLInputElement>,
  handleKeypress: (e: { key: string; }) => void,
  send: () => void,
  friendName: string,
  bottomDiv: RefObject<HTMLDivElement>,
  userId: number,
  lastMessageRef: any,
  filteredPrevMessages: Array<{
    id: number,
    conversation_id: number,
    message: string,
    created_at: string,
    sender_id: number
  }>,
  loading: boolean,
  attachFiles: (event: any) => void,
  isOpenFileModel: boolean,
  attachedFiles: Array<{
    name: string,
    type: string,
    size: number
  }>,
  setIsOpenFileModel: any,
  setAttachedFiles: any,
  conversationId: number,
  sendMessageWithFiles: () => void,
  percentCompleted: number
}

const ConverationPresentational: React.FC<Conversations> = ({
    friendName,
    filteredMessages,
    handleBlur,
    messagesInput,
    handleKeypress,
    send,
    bottomDiv,
    userId,
    lastMessageRef,
    filteredPrevMessages,
    loading,
    attachFiles,
    isOpenFileModel,
    attachedFiles,
    setIsOpenFileModel,
    setAttachedFiles,
    conversationId,
    sendMessageWithFiles,
    percentCompleted
  }) => {
  

  return (
    <MainContainer>
      <NameBox>{friendName}</NameBox>
      <MessagesBox>
        <div ref={bottomDiv}/>
        <FileMessage attachedFiles={attachedFiles} percentCompleted={percentCompleted} />
        {
          filteredMessages
          .map((message, index) => {
            let createdAt = new Date(message.created_at).toLocaleTimeString();
            createdAt = createdAt.slice(0, 5);
            if(message.sender_id === userId){
              return(
                <MessageBoxUser ref={filteredMessages.length === index + 1 ? lastMessageRef : null} key={index}>
                  <Message>{message.message}</Message>
                  <MessageTimeContainer>
                    <MessageTimeUser>{createdAt}</MessageTimeUser>
                  </MessageTimeContainer>
                </MessageBoxUser>
              )
            } else { 
              return(
                <MessageBoxFriend ref={filteredMessages.length === index + 1 ? lastMessageRef : null} key={index}>
                  <Message>{message.message}</Message>
                  <MessageTimeContainer>
                    <MessageTimeFriend>{createdAt}</MessageTimeFriend>
                  </MessageTimeContainer>
                </MessageBoxFriend>
              )
            }
          })
        }
        {
          filteredPrevMessages.length > 0 ?
          filteredPrevMessages
          .map((message, index) => {
            let createdAt = new Date(message.created_at).toLocaleTimeString();
            createdAt = createdAt.slice(0, 5);
            if(message.sender_id === userId){
              return(
                <MessageBoxUser ref={filteredPrevMessages.length === index + 1 ? lastMessageRef : null} key={index}>
                  <Message>{message.message}</Message>
                  <MessageTimeContainer>
                    <MessageTimeUser>{createdAt}</MessageTimeUser>
                  </MessageTimeContainer>
                </MessageBoxUser>
              )
            } else { 
              return(
                <MessageBoxFriend ref={filteredPrevMessages.length === index + 1 ? lastMessageRef : null} key={index}>
                  <Message>{message.message}</Message>
                  <MessageTimeContainer>
                    <MessageTimeFriend>{createdAt}</MessageTimeFriend>
                  </MessageTimeContainer>
                </MessageBoxFriend>
              )
            }
          }) :
          null
        }
        {
          loading ? 
            <CircularProgress style={{
              color: 'white',
              margin: '0 auto'
            }} /> :
          null
        }
      </MessagesBox>
      <InputContainer>
        <Input
          placeholder="Write a message..."
          onBlur={handleBlur}
          ref={messagesInput}
          autoFocus
          onKeyPress={handleKeypress}
        />
        <ButtonsContainer>
          <AddFilelabel htmlFor='addFile'>
            <AttachFileIcon />
          </AddFilelabel>
          <Emoji 
            messagesInput={messagesInput}
          />
          <SendButton
            onClick={() => send()}
          ><SendIcon /></SendButton>
          <input 
            style={{display: "none"}}
            onChange={attachFiles}
            multiple
            accept=''
            type='file'
            id='addFile'
          />
        </ButtonsContainer>
      </InputContainer>
      {
        <AttachedFilesModal 
          attachedFiles={attachedFiles}
          setIsOpenFileModel={setIsOpenFileModel}
          isOpenFileModel={isOpenFileModel}
          setAttachedFiles={setAttachedFiles}
          conversationId={conversationId}
          sendMessageWithFiles={sendMessageWithFiles}
        />
      }
    </MainContainer>
  )
}
export default ConverationPresentational;
