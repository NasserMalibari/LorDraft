import React from "react";
import { Box, AppBar, Toolbar, Typography, CssBaseline, Drawer, Divider, List, ListItem, ListItemText } from '@mui/material';
import CardBox from "./CardBox";

// cards is a list of 'card' objects
// card should be:
/*
{
  'name':
  'region':
  'count':
  'image':
  'id': 
  'cost'
}
*/
function Deck({deck}) {
  // sort
  deck.sort((a, b) => {
    if (a.card.type !== b.card.type) {
      return a.card.type.localeCompare(b.card.type);
    } else if (a.card.cost !== b.card.cost) {
      return a.card.cost - b.card.cost;
    } else if (a.card.name !== b.card.name) {
      return a.card.name.localeCompare(b.card.name);
    }
  });



  const drawerWidth = 270;

  return <Drawer
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
  }}
  variant="permanent"
  anchor="right"
>
  <Toolbar />
  <Divider />
  <Box sx={{display: 'flex', flexDirection: 'column'}}>

  {deck !== undefined && deck.map((card, index) => (
    <CardBox key={index} card={card}/>
  // <Box key={index}>
  //   {card.card.name} {card.count}
  // </Box>
))}

  </Box>
  {/* <List>
    {deck !== undefined && deck.map((text, index) => (
      <ListItem key={text}>
        <ListItemText primary={} />
      </ListItem>
    ))}
  </List> */}
</Drawer>
}

export default Deck;
