import styled from "styled-components";
import ModalWindowForPosts from "../../components/FollowingPostsComponents/ModalWindowForPosts";
import CircularProgress from '@mui/material/CircularProgress';

const MainContainer = styled.div`
  position: relative;
  display: flex;
  padding: 16px 0;
  margin: 0 auto;
`;

interface Main {
  postsColumnState: Array<JSX.Element>,
  loading: boolean
}

const MainPresentational: React.FC<Main> = ({
  postsColumnState,
  loading
}) =>  {


  return (
    <>
      <MainContainer>
        {
          loading && <CircularProgress />
        }
        {         
          postsColumnState.map(column => (
            column
          ))
        }
      </MainContainer>
      <ModalWindowForPosts />
    </>
  )
}

export default MainPresentational;


