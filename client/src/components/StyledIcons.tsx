import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const CircularLoaidngContainer = styled(CircularProgress)`
  color: ${({ theme }) => theme.color} !important;
`;

export const CircularLoaidng: React.FC<{
  dimensions: string
}> = ({
  dimensions
}) => {

  return (
    <CircularLoaidngContainer style={{
      height: `${dimensions}`,
      width: `${dimensions}`,
    }} />
  )
}

const IdentityIconContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.identityIcon};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
`;

const Icon = styled(PermIdentityIcon)`
  color: ${({ theme }) => theme.identityIcon} !important;
  width: 100% !important;
`;

export const IdentityIcon: React.FC<{
  dimensions: string
}> = ({
  dimensions
}) => {

  return (
    <IdentityIconContainer style={{
      height: `${dimensions}`,
      width: `${dimensions}`
    }}>
      <Icon />
    </IdentityIconContainer>
  )
}

const LikeContainer = styled(FavoriteIcon)`
  color: #f7022a;
`;

export const LikeIcon: React.FC<{
  dimensions: string
}> = ({
  dimensions
}) => {

  return (
    <LikeContainer style={{
      height: `${dimensions}`,
      width: `${dimensions}`
    }} />
  )
}

const LikeBorderContainer = styled(FavoriteBorderIcon)`
  color: rgb(158, 155, 155);
`

export const LikeBorderIcon: React.FC<{
  dimensions: string
}> = ({
  dimensions
}) => {

  return (
    <LikeBorderContainer style={{
      height: `${dimensions}`,
      width: `${dimensions}`
    }} />
  )
}