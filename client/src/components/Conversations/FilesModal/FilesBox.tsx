import React from 'react';
import styled from 'styled-components';
import File from '../File';

const ImageFile = styled.img`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
`;

interface FileBox {
  files: Array<{
    name: string,
    type: string,
    size: number
  }>
}

const FilesBox: React.FC<FileBox> = ({
  files
}) => {


  return (
    <>
      {
        files.map((file, index) => {
          if(file.type.startsWith('image/')){
            return( 
              <>
                <ImageFile key={index} src={URL.createObjectURL(file)} alt='' />
              </>
            )
          }else{
            return <File key={index} file={file} />
          }
        })
      }
    </>
  )
}

export default FilesBox;