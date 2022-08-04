import axios from "axios";
import config  from "../config.json";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { createUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

interface PrivateRouteInterface {
  children: any
}

interface LocationState {
  state: any
}


const PrivateRoute: React.FC<PrivateRouteInterface> = ({children}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { state } = location as LocationState;
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate()

  useEffect(() => {
    if (state === null || !state.loginStatus) {
      axios.get(`${config.serverUrl}users/me`, 
        { withCredentials: true }
      )
      .then(res => {
        if(res.status === 200){
          dispatch(createUser({...res.data.data}));
          setLoading(false);
        }
      })
      .catch(err => {
        navigate('/signin');
      })
    } else {
      setLoading(false);
    } 
  }, []);
  return (
    <>
      {
        loading ? 
        <CircularProgress style={{margin: '0 auto', color: 'white'}} /> :
        children
      }
    </>
  )
  
}

export default PrivateRoute;
