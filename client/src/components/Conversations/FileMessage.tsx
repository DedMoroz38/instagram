import React from 'react';
import styled from 'styled-components';
import File from './File';

const MainContainer = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
  border: 1px solid red;
`

const ImageFile = styled.img`
  max-width: 200px;
`;

interface FileMessage {
  attachedFiles: any,
  percentCompleted: number
}

const FileMessage: React.FC<FileMessage> = ({attachedFiles, percentCompleted}) => {
  const files: Array<{
    name: string,
    type: string,
    size: number
  }> = Array.from(attachedFiles);

  return (
    <MainContainer>
    {
      files.map((file, index) => {
        if(file.type.startsWith('image/')){
          return( 
            <>
              <ImageFile key={index} src={URL.createObjectURL(file)} alt='' />
            </>
          )
        }else{
          return (
            <>
              <File key={index} file={file} />
              <label htmlFor="progress-bar">{percentCompleted}%</label>
              <progress id="progress-bar" value={percentCompleted} max={100}></progress>
            </>
          )
        }
      })
    }
    </MainContainer>
  )
}

export default FileMessage;
