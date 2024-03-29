import React from 'react';
import styled from 'styled-components';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ProgressCircle from '../../ProgressCircle';

const FileContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px 5px 0;
  border-radius: 5px;
`;

const FileIcon = styled(InsertDriveFileIcon)`
  padding: 4px;
  height: 40px !important;
  width: 40px !important;
  border-radius: 50%;
  background: ${({theme}) => theme.message};
  color: white;
`

const FileInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  height: 85%;
  width: 100%;
`;

const FileName = styled.p`
  color: ${({theme}) => theme.color};
  font-size: 15px;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.p`
  color: ${({theme}) => theme.color};
  font-size: 12px;
`;


const File: React.FC<{
  file: {
    size: number,
    name: string,
  },
  percentCompleted?: number
}> = ({
  file,
  percentCompleted
}) => {
  let fileSizeInBytes = file.size;
  let unit: "Bytes" | "MB" | "KB" = 'Bytes';
  if(fileSizeInBytes / 1024 > 1){
    if(fileSizeInBytes / 1048576 > 1){
      unit = "MB";
      fileSizeInBytes = fileSizeInBytes / 1048576;
    } else {
      unit = "KB";
      fileSizeInBytes = fileSizeInBytes / 1024;
    }
  }
  fileSizeInBytes = +fileSizeInBytes.toFixed(1);


  return (
    <>
      <FileContainer>
        <FileIcon />
        <FileInfoBox>
          <FileName>{file.name}</FileName>
          <FileSize>{fileSizeInBytes} {unit}</FileSize>
        </FileInfoBox>
        {percentCompleted && <ProgressCircle percentCompleted={percentCompleted} />}
      </FileContainer>
    </>
  )
}

export default File;
