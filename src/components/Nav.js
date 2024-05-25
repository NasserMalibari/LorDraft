import React from "react";
import { Box, AppBar, Toolbar, Typography, CssBaseline, Drawer, Divider, List, ListItem, ListItemText, IconButton, Modal } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    return <>
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
      onClick={() => navigate('/')}
    >
            <HomeIcon />
      </IconButton>
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpen}
          >
            <InfoIcon />
      </IconButton>
      <Typography variant="h6" noWrap>
        LoR Draft
      </Typography>
      
    </Toolbar>
  </AppBar>
  <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        About
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        DM me on discord if you have ideas for draft algorithms, I am very open to changing how drafting works.
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Slapped together pretty quick, but still fun to draft imo. (Still working on it).
        Last Change: 25 May 2024
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 'bold' }}>
        discord: .nas6
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Special thx to Kuvi for the idea. :)
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 5 }}>
      LoR Draft was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games.  Riot Games does not endorse or sponsor this project.
      </Typography>
    </Box>
  </Modal>
</>
}

export default Nav;
