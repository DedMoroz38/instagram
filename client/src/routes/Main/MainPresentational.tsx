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


  return (
    <>
      <MainContainer>
        <Box>
            {
              loading && <CircularLoaidng dimensions="40px" />
            }
            {         
              postsColumnState.map(column => (
                column
              ))
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


