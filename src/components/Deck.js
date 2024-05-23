import React, { useEffect, useState } from "react";
import { Snackbar, Box, AppBar, Toolbar, Typography, CssBaseline, Drawer, Divider, List, ListItem, ListItemText, Button, decomposeColor } from '@mui/material';
import CardBox from "./CardBox";
const { DeckEncoder, Deck, Card } = require('runeterra');

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
function DeckViewer({deck}) {

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(code);
  };

  // const [deckCode, setDeckCode] = useState('');
  // console.log(deck.cards);
  let cardObjs = [];
  deck.cards.forEach(element => {
    console.log(element);
  });

  let deckObjArr = deck.cards.map((elem) => {
    return new Card(elem.card.cardCode, elem.count);
  });

  let code = (DeckEncoder.encode(deckObjArr));
  // let deckArr = deck.cards.map((c) => {
  //   new Card(c.cardCode, c.count);
  // });

  // console.log(DeckEncoder.encode(deckArr));

  // sort
  deck.cards !== undefined && deck.cards.sort((a, b) => {
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
  <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
  <Button variant="contained" onClick={handleClick}>
      Copy Deck Code
  </Button>
  <Snackbar
      message="Copied to clibboard"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={2000}
      onClose={() => setOpen(false)}
      sx={{
        bottom: '100px'
      }}
      open={open}
    />
  <Box>
    {deck.numCards} / 40
  </Box>
  </Box>

  <Box sx={{display: 'flex', flexDirection: 'column'}}>

  {deck.cards !== undefined && deck.cards.map((card, index) => (
    <CardBox key={index} card={card}/>

))}

  </Box>
</Drawer>
}

export default DeckViewer;
