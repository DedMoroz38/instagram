import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import File from './File';
import DownloadIcon from '@mui/icons-material/Download';
import { installFile } from '../../../lib/messanger/installFile';
import ProgressCircle from '../../ProgressCircle';
import RecievedFilesBox from './RecievedFilesBox/RecievedFilesBox';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  max-width: calc(100% - 30px);
  @media (max-width: 420px){
    padding: 0;
  }
`

const FileBox = styled.div`
  transition: all 0.3s;
  position: relative;
  width: 90%;
`;

const InstallButton = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  right: -55px;
  top: 5px;
  color: white;
  cursor: pointer;
  @media (max-width: 420px){
    right: -60px;
  }
`;
const MessageText = styled.p`
  margin-left: 5px;
  margin-bottom: 10px;
`;

interface RecievedFileMessage {
  attachments: Array<{
    attachment_id: number;
    file_name: string;
    size: number;
  }>,
  text: string
}

const RecievedFileMessage: React.FC<RecievedFileMessage> = ({attachments, text}) => {

  return (
    <MainContainer>
    {
      attachments.map((attachment, index) => (
        <RecievedFilesBox attachment={attachment}/>
        // const [percentCompleted, setPercentCompleted] = useState<number | null>(null);

        // return (
        //   <FileBox key={attachment.attachment_id}>
        //     <File
        //       file={{
        //         size: attachment.size,
        //         name: attachment.file_name
        //       }}
        //     />
        //       <InstallButton
        //         onClick={() => installFile(attachment, setPercentCompleted)}
        //       >
        //         <DownloadIcon />
        //       </InstallButton>
        //     {
        //       percentCompleted !== null ?
        //       <ProgressCircle percentCompleted={percentCompleted} /> :
        //       null
        //     }
        //   </FileBox>
        
      ))
    }
    <MessageText>{text}</MessageText>
    </MainContainer>
  )
}

export default RecievedFileMessage;
