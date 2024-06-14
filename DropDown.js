import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Action } from '../Store/store';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const img1="https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
      const dispatch=useDispatch();
    const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const logout=()=>{
    dispatch(Action.logout())
   }

  return (
    <div className=''>
      <img
        className={` bg-white  w-[40px] h-[40px] rounded-md focus:outline-none focus:bg-gray-400 `}
         src={img1}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >

      </img>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}> <Link to ="/profile" >Profile</Link></MenuItem>
        <MenuItem onClick={handleClose}> <Link to ="/myorder" >Myorder</Link></MenuItem>
        <MenuItem onClick={handleClose}> <button onClick={logout} >Logout</button></MenuItem>
      </Menu>
    </div>
  );
}