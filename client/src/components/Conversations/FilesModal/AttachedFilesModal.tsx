import React, { useRef } from 'react';
import styled from 'styled-components';
import Emoji from '../../Emoji/EmojiPicker';
import FilesBox from './FilesBox';
import ModalWindow from '../../ModalWindow/ModalWindow';
import { useSendFile } from '../../../hooks/fetchHooks/messanger/useSendFile';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addMessage } from '../../../features/messages/messagesSlice';

const MainContainer = styled.div`
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background: ${({theme}) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 30px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  transition: all 0.3s linear;
  z-index: 2;
`;

const Header = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: start;
  color: ${({theme}) => theme.color};
  padding-left: 10px;
  width: 100%;
`;

const Heading = styled.p`

`;

const FilesContainer = styled.div`
  padding: 5px 5px;
  border: 1px solid black;
  height: 70%;
  width: 100%;
  overflow-y: scroll;
  flex-shrink: 0;
  border-radius: 5px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
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

const InputBox = styled.div`
  padding-right: 5px;
  width: 80%;
  display: flex;
  align-items: center;
  height: 10%;
  border-bottom: 1px solid white;
  color: ${({ theme }) => theme.iconColor};
`;

const MessageInput = styled.input`
  height: 100%;
  color: ${({theme}) => theme.color};
  font-size: 1em;
  border: none;
  background: transparent;
  width: 100%;
  padding-left: 5px;
  width: 100%;
`;  

const Footer = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 10px;
`;

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: ${({theme}) => theme.color};
  padding: 6px 6px;
  border-radius: 6px;
  font-size: 16px;
  margin-left: 10px;
  &:hover {
    background: black;
  }
`;

interface AttachedFiles{
  attachedFiles: any,
  setIsOpenFileModel: any,
  isOpenFileModel: boolean,
  setAttachedFiles: any,
  conversationId: number,
  setFileMessage: React.Dispatch<React.SetStateAction<string>>,
  fileMessage: string
}

const AttachedFilesModalComponent: React.FC<AttachedFiles> = ({
  attachedFiles,
  setIsOpenFileModel,
  setAttachedFiles,
  conversationId,
  setFileMessage,
  fileMessage
}) => {
  const files: Array<{
    name: string,
    type: string,
    size: number
  }> = Array.from(attachedFiles);
  const messagesInput = useRef<HTMLInputElement>(null);

  const {sendFiles} = useSendFile(
    attachedFiles, 
    setIsOpenFileModel, 
    messagesInput, 
    conversationId,
  );
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.userInfo.id);


  const handleKeypress = (e: { key: string; }): void => {
    if (e.key === "Enter") {
      send();
    }
  }

  const send = () => {
    sendFiles();
    let attachments: {file_name: string, size: number} = [];
      files.forEach(file => {
        attachments.push({
          file_name: file.name,
          size: file.size
        });
      });
      dispatch(addMessage({
        message_type: 'file',
        message_id: null,
        conversation_id: conversationId,
        created_at: new Date().toISOString(),
        sender_id: userId,
        message: messagesInput.current!.value.trim(),
        attachments: attachments
      }))
  }

  const cancel = () => {
    setAttachedFiles([]);
    setIsOpenFileModel(false);
  }

  return (
    <MainContainer>
      <Header>
        <Heading>{files.length} file{files.length === 1 ? '' : 's' } selected</Heading>
      </Header>
      <FilesContainer>
        <FilesBox files={files} />
      </FilesContainer>
      <InputBox
        onKeyPress={handleKeypress}
      >
        <MessageInput
          ref={messagesInput}
          placeholder='Comment'
        />
        <Emoji
            messagesInput={messagesInput}
        />
      </InputBox>
      <Footer>
        <Button onClick={() => cancel()}>Cancel</Button>
        <Button onClick={() => send()}>Send</Button>
      </Footer>
    </MainContainer>
  )
}

const AttachedFilesModal: React.FC<AttachedFiles> = ({
  attachedFiles,
  setIsOpenFileModel,
  setAttachedFiles,
  isOpenFileModel,
  conversationId,
  setFileMessage,
  fileMessage
}) => {

  if(!isOpenFileModel) return null;

  return (
    <ModalWindow>
      <AttachedFilesModalComponent
        attachedFiles={attachedFiles}
        setIsOpenFileModel={setIsOpenFileModel}
        isOpenFileModel={isOpenFileModel}
        setAttachedFiles={setAttachedFiles}
        conversationId={conversationId}
        setFileMessage={setFileMessage}
        fileMessage={fileMessage}
      />
    </ModalWindow>
  )
}

export default AttachedFilesModal;
