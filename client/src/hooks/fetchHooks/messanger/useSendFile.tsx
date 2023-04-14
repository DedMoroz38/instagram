import axios from "axios";
import { Dispatch, RefObject, SetStateAction, useContext, useEffect, useState } from "react"
import { useAppSelector } from "../../../app/hooks";
import { useErrorPopUpContext } from "../../../ContextProviders/ClienErrorHandlingProvider";
import { useFileLoadContext } from "../../../ContextProviders/FileLoadProvider";
import { Errors } from "../../../lib/errors/Errors";
import socket from "../../../socket";

export const useSendFile = (
  attachedFiles: any,
  setIsOpenFileModel: any,
  messagesInput: RefObject<HTMLInputElement>,
  conversationId: number,
  setFileMessage: React.Dispatch<React.SetStateAction<string>>,
  fileMessage: string
): {sendFiles: () => void} => {
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
  const {setPercentCompleted} = useFileLoadContext();
  const sendFiles = () => {
    setFileMessage(messagesInput.current!.value.trim());
  }
  useEffect(() => {
    if(fileMessage === '') return;
    setIsOpenFileModel(false);
    const attachedFilesData = new FormData();

    Object.keys(attachedFiles).forEach(key => {
      const item = attachedFiles.item(key);
      attachedFilesData.append(item.name, item);
    });
    attachedFilesData.append('message', messagesInput.current!.value.trim());
    attachedFilesData.append('conversationId', conversationId.toString());

    const config = {
      onUploadProgress: (progressEvent: {loaded: number, total: number}) => {
        const loaded = progressEvent.loaded;
        const total = progressEvent.total;
        setPercentCompleted(Math.floor((loaded / total) * 100));
      },
      withCredentials: true
    }


    axios.post(`messanger/sendFiles`,
      attachedFilesData,
      config
    )
    .then(res => {
      setFileMessage('');
      socket.emit('fm', {
        messageId: res.data.messageId,
      });
    })
    .catch(err => {
      setErrorMessage(Errors.default);
      setErrorPopUpIsOpen(true);
    })
  }, [fileMessage]);

  return {sendFiles}
}