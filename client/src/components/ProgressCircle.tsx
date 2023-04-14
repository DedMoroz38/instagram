import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const Outer = styled.div`
  position: absolute;
  top: 5px;
  left: 0;
  place-items: center;
`

const Inner = styled.div`
  position: relative;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  &:before {
    content: "";
    position: absolute;
    height: 84%;
    width: 84%;
    background-color: ${({theme}) => theme.message};
    border-radius: 50%;
  }
`;

const Value = styled.p`
  position: relative;
  font-size: 10px;
  color: ${({ theme }) => theme.messageColor};
`


interface ProgressCircle {
  percentCompleted: number;
}

const ProgressCircle: React.FC<ProgressCircle> = ({percentCompleted}) => {
  const [progressValue, setProgressValue] = useState<number>(0);

  useEffect(() => {
    setProgressValue(percentCompleted);
  }, [percentCompleted])

  return (
    <>
      <Outer>
        <Inner style={{
          background: `conic-gradient(
            rgba(70,163,232,1) ${progressValue * 3.6}deg,
            #cadcff ${progressValue * 3.6}deg
          )`
        }}>
          <Value>{percentCompleted}%</Value>
        </Inner>
      </Outer>
    </>
  )
}

export default ProgressCircle;
