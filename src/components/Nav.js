import React from "react";
import { Box, AppBar, Toolbar, Typography, CssBaseline, Drawer, Divider, List, ListItem, ListItemText } from '@mui/material';


function Nav() {
    return <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <Typography variant="h6" noWrap>
        My Application
      </Typography>
    </Toolbar>
  </AppBar>
}

export default Nav;
