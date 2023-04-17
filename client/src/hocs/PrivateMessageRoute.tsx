import CircularProgress from '@mui/material/CircularProgress';
import { ElementType, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { useCreateConversation } from '../hooks/fetchHooks/messanger/useCreateConversation';
import { CircularProgressContainer } from './PrivateRoute';

interface PrivateRouteInterface {
  Content: ElementType
}

type LocationState = {
  state: {
    conversation_id: number;
  }
}

const PrivateMessageRoute: React.FC<PrivateRouteInterface> = ({Content}) => {
  const location = useLocation();
  const { state } = location as LocationState;
  const { conversation_id } = state;
  const senderId = useAppSelector(state => state.userInfo.id);
  const {userId} = useParams();
  const {loading, converationId} = useCreateConversation(senderId, +userId, conversation_id);

  return (
    <>
      {
        loading ? 
        <CircularProgressContainer>
          <CircularProgress />
        </CircularProgressContainer> :
        <Content converationId={conversation_id ? conversation_id : converationId} />
      }
    </>
  )
  
}

export default PrivateMessageRoute;

