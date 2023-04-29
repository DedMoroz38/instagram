import styled from "styled-components";
import ModalWindowForPosts from "../../components/FollowingPostsComponents/ModalWindowForPosts";
import CircularProgress from '@mui/material/CircularProgress';
import { Scrollbar } from "../../components/Theme/globalStyles";
import { CircularLoaidng } from "../../components/StyledIcons";

const MainContainer = styled(Scrollbar)`
  width: 100vw;
  overflow-y: scroll;
  margin-bottom: auto;
`;

const Box = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  padding-bottom: 20px;
  width: fit-content;
  @media (max-width: 420px){
    margin-bottom: auto;
    margin-top: 60px;
  }
`;

const Message = styled.p`
  color: ${({theme}) => theme.color};
  font-size: 20px;
  margin-top: 20px;
`

interface Main {
  postsColumnState: Array<JSX.Element>,
  loading: boolean,
  modalProp: any,
  likingProp: any
}

const MainPresentational: React.FC<Main> = ({
  postsColumnState,
  loading,
  modalProp,
  likingProp
}) =>  {
  const isPosts = postsColumnState[0]?.props.columnPosts.length > 0;

  return (
    <>
      <MainContainer>
        <Box>
            {
              loading && <CircularLoaidng dimensions="40px" />
            }
            {
              isPosts ?
              postsColumnState.map(column => (
                column
              )) :
              <Message>Start following other people to see their posts</Message>
            }
        </Box>
      </MainContainer>
      <ModalWindowForPosts 
        modalProp={modalProp}
        likingProp={likingProp}
      />
    </>
  )
}

export default MainPresentational;


