import styled from "styled-components";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import React, { RefObject, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Emoji from "../Emoji/EmojiPicker";
import AttachedFilesModal from "./FilesModal/AttachedFilesModal";
import Messages from "./Messages/Messages";
import WestIcon from '@mui/icons-material/West';
import { useWidthContext } from "../../ContextProviders/WidthProivder";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  flex-shrink: 0;
  position: relative;
  transition: all 0.3s linear;
  display: flex;
  flex: 6;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px 0 0 0;
  background: ${({ theme }) => theme.messageBoxBackground};
  @media (max-width: 420px){
    padding-bottom: 50px;
  }
`;

const NameBox = styled.div`
  position: relative;
  border-radius: 20px 0 0 0;
  background: ${({ theme }) => theme.conversations.topBar.background};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 100%;
  color: ${({ theme }) => theme.conversations.topBar.color};
  @media (max-width: 420px){
    border-radius: 0;
    margin-top: 55px;
  }
`;
const Name = styled(Link)`
  color: ${({ theme }) => theme.conversations.topBar.color};
  text-decoration: none;
`;

const GoBack = styled(WestIcon)`
  position: absolute;
  left: 10px;
`;

const MessagesBox = styled.div` 
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  padding: 15px 15px 30px 15px;
  @media (max-width: 420px){
    padding-bottom: 0;
    height: calc(100vh - 225px);
  }
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
  background: ${({ theme }) => theme.input.background};
  @media (max-width: 420px){
    margin-bottom: 5px;
    height: 60px;
  }
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
    color: ${({ theme }) => theme.input.placeholderColor};
  }
`;

const AddFilelabel = styled.label`
  cursor: pointer;
`;


interface Conversations{
  filteredMessages: Array<{
    message_id: number,
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
    message_id: number,
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
  goBack: () => void
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
    goBack
  }) => {
  const [fileMessage, setFileMessage] = useState('');
  const {isMobile} = useWidthContext();
  const messages = [...filteredMessages, ...filteredPrevMessages];

  const lastSentFileIndex = 
    messages
    .filter((message) => {
      return message.sender_id == 168 && message.message_type == 'file'
    }).length;
  

  return (
    <MainContainer>
      <NameBox>
        <Name to={`/${userId}`}>{friendName}</Name>
        {
          isMobile &&
          <GoBack onClick={() => goBack()} />
        }
      </NameBox>
      <MessagesBox>
        <div ref={bottomDiv}/>
        <Messages
          lastSentFileIndex={lastSentFileIndex}
          messages={filteredMessages}
          userId={userId}
          lastMessageRef={filteredPrevMessages.length === 0 ? lastMessageRef : null}
        />
        {
          filteredPrevMessages.length > 0 ?
          <Messages
            lastSentFileIndex={lastSentFileIndex}
            messages={filteredPrevMessages}
            userId={userId}
            lastMessageRef={lastMessageRef}
          /> :
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
            onChange={(e) => attachFiles(e)}
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
          setFileMessage={setFileMessage}
          fileMessage={fileMessage}
        />
      }
    </MainContainer>
  )
}
export default ConverationPresentational;
