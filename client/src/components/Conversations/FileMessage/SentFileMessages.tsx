import React from 'react';
import styled from 'styled-components';
import { useFileLoadContext } from '../../../ContextProviders/FileLoadProvider';
import File from './File';
import { MainContainer } from './RecievedFileMessage';



const ProgressBarOuter = styled.div`
  height: 5px;
  width: 100%;
  position: relative;
  border-radius: 5px;
  background: #A05BF4;
`
const ProgressBarInner = styled.div`
  background: rgba(70,163,232,1);
  position: absolute;
  height: 3px;
  border-radius: 4px;
  top: 1px;
  left: 1px;
`

const FileBox = styled.div`
  transition: all 0.3s;
  position: relative;
`;

const MessageText = styled.p`
  margin-left: 10px;
  margin-bottom: 10px;
`;

interface SentFileMessages {
  attachments: Array<{
    file_name: string;
    size: number;
  }>,
  text: string,
  isLast: boolean
}

const SentFileMessages: React.FC<SentFileMessages> = ({attachments, text, isLast}) => {
  const {percentCompleted} = useFileLoadContext();

  return (
    <MainContainer>
      {
        isLast && percentCompleted !== 100 && percentCompleted !== -1 &&
        <ProgressBarOuter>
          <ProgressBarInner style={{
            width: `calc(${percentCompleted}% - 2px)`
          }} />
        </ProgressBarOuter>
      }
      {
        attachments.map((attachment, index) => (
            <FileBox key={index}>
              <File
                file={{
                  size: attachment.size,
                  name: attachment.file_name
                }}
              />
            </FileBox>
          )
        )
      }
      <MessageText>{text}</MessageText>
    </MainContainer>
  )
}

export default SentFileMessages;
