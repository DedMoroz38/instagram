import axios from "axios";
import config  from "../config.json";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { createUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components";

interface PrivateRouteInterface {
  children: any
}

interface LocationState {
  state: any
}

const CircularProgressContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > span{
    color: ${({ theme }) => theme.color} !important;
  }
`;

const PrivateRoute: React.FC<PrivateRouteInterface> = ({children}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { state } = location as LocationState;
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate()

  // TODO - handle needless protection after signin, login
  useEffect(() => {
    if (state === null || !state.loginStatus) {
      axios.get(`${config.serverUrl}users/me`, 
        { withCredentials: true }
      )
      .then(res => {
        if(res.status === 200){
          const user = res.data.data;
          if (user.is_confirmed) {
            dispatch(createUser({...user}));
            setLoading(false);
          } else {
            navigate('/emailconfirmation');
          }
        } else {
          setErrorMessage("Something went wrong:( Please try later. We will sort the problem out!");
          setErrorPopUpIsOpen(true);
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401){
          navigate('/signin');
        } else {
          setErrorMessage("Something went wrong:( Please try later. We will sort the problem out!");
          setErrorPopUpIsOpen(true);
        }
      })
    } else {
      setLoading(false);
    } 
  }, []);
  return (
    <>
      {
        loading ? 
        <CircularProgressContainer>
          <CircularProgress 
          />
        </CircularProgressContainer> :
        children
      }
    </>
  )
  
}

export default PrivateRoute;
function setErrorMessage(message: any) {
  throw new Error("Function not implemented.");
}

function setErrorPopUpIsOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}

