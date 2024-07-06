import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  

  return (
    <div>
      <Button onClick={props.handleOpen}>Open modal</Button>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className='flex justify-between mx-1 '>
            {props.name}
            <button onClick={props.handleClose}><CloseIcon/></button>


            </div>

          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           <div >
            <img src={props.img}/>
           </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}