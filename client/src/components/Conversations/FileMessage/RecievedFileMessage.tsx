import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import File from './File';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { installFile } from '../../../lib/messanger/installFile';
import { CircularProgress } from 'material-ui';
import ProgressCircle from '../../ProgressCircle';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  max-width: 500px;
`

const FileBox = styled.div`
  transition: all 0.3s;
  position: relative;
`;

const InstallButton = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  z-index: 1;
  right: -20px;
  top: 8px;
  color: white;
  cursor: pointer;
`;
const MessageText = styled.p`
  margin-left: 10px;
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
      attachments.map((attachment, index) => {
        const [percentCompleted, setPercentCompleted] = useState<number | null>(null);

        return (
          <FileBox>
            <File
              key={attachment.attachment_id}
              file={{
                size: attachment.size,
                name: attachment.file_name
              }}
            />
            {
              percentCompleted === null &&
              <InstallButton
                onClick={() => installFile(attachment, setPercentCompleted)}
              >
                <DownloadIcon />
              </InstallButton>
            }
            {
              percentCompleted !== null ?
              <ProgressCircle percentCompleted={percentCompleted} /> :
              null
            }
          </FileBox>
        )
      })
    }
    <MessageText>{text}</MessageText>
    </MainContainer>
  )
}

export default RecievedFileMessage;
