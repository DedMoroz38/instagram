import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useAppDispatch } from '../app/hooks';
import { deleteUserPost } from '../features/posts/userPostsSlice';
import { Errors } from '../lib/errors/Errors';
import { useErrorPopUpContext } from '../ContextProviders/ClienErrorHandlingProvider';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    minWidth: 'auto',
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function ThreeDotsMenu(postId: number) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = () => {
    axios.get(`posts/delete/${postId.postId}`,
      {
        withCredentials: true
      }
    )
    .then(res => {
      dispatch(deleteUserPost(postId));
    })
    .catch(err => {
      setErrorMessage(Errors.default);
      setErrorPopUpIsOpen(true);
    })
  }

  return (
    <div style={{position: 'absolute', right: '0', top: '0', minWidth: 'auto'}}>
      <Button
        style={{minWidth: '0', color: 'white', borderRadius: '50%'}}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{padding: '0', minWidth: 'auto'}}
      >
        <MenuItem onClick={() => deletePost()} style={{padding: '5px 5px'}}>
          <DeleteIcon style={{marginRight: '4px'}} />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
}


