import attachment from 'material-ui/svg-icons/file/attachment';
import React, { useState } from 'react'
import styled from 'styled-components';
import DownloadIcon from '@mui/icons-material/Download';
import { installFile } from '../../../../lib/messanger/installFile';
import ProgressCircle from '../../../ProgressCircle';
import File from '../File';

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


const RecievedFilesBox: React.FC<{attachment: any}> = ({attachment}) => {
  const [percentCompleted, setPercentCompleted] = useState<number | null>(null);

  return (
    <FileBox key={attachment.attachment_id}>
      <File
        file={{
          size: attachment.size,
          name: attachment.file_name
        }}
      />
        <InstallButton
          onClick={() => installFile(attachment, setPercentCompleted)}
        >
          <DownloadIcon />
        </InstallButton>
      {
        percentCompleted !== null ?
        <ProgressCircle percentCompleted={percentCompleted} /> :
        null
      }
    </FileBox>
  )
}

export default RecievedFilesBox;
