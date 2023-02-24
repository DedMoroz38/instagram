import axios from "axios";
import config  from "../config.json";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { createUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components";
import { useIsLogedIn } from "../hooks/fetchHooks/authorization/useIsLogedIn";

interface PrivateRouteInterface {
  children: JSX.Element
}

export const CircularProgressContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > span{
    color: ${({ theme }) => theme.color} !important;
  }
`;

const PrivateRoute: React.FC<PrivateRouteInterface> = ({children}) => {

  // TODO - handle needless protection after signin, login
  const {loading} = useIsLogedIn()
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


