import axios from "axios";
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react"
import { useAppSelector } from "../../../app/hooks";
import socket from "../../../socket";

export const useSendFile = (
  setPercentCompleted: Dispatch<SetStateAction<number>>,
  attachedFiles: any,
  setIsOpenFileModel: any,
  messagesInput: RefObject<HTMLInputElement>,
  conversationId: number,
  setFileMessage: React.Dispatch<React.SetStateAction<string>>,
  fileMessage: string
): {sendFiles: () => void} => {

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
      socket.emit('fm', {
        messageId: res.data.messageId,
      });
    })
    .catch(err => {
      console.log(err);
    })
  }, [fileMessage]);

  return {sendFiles}
}