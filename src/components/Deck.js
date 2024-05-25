import React, { useEffect, useState } from "react";
import { Snackbar, Box, Toolbar, Drawer, Divider, Button } from '@mui/material';
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
function DeckViewer({deck, regions}) {

  const [numSpells, setNumSpells] = useState(0);
  const [numUnits, setNumUnits] = useState(0);
  const [numLandmarks, setNumLandmarks] = useState(0);
  const [numEquipment, setNumEquipment] = useState(0);

  // console.log(deck);
  useEffect(() => {
    let spells = 0;
    let units = 0;
    let landmarks = 0;
    let equipment = 0;
    for (let card in deck.cards) {
      if (deck.cards[card].card.type === 'Spell') {
        spells += deck.cards[card].count;
      } else if (deck.cards[card].card.type === 'Unit') {
        units += deck.cards[card].count;
      } else if (deck.cards[card].card.type === 'Landmark') {
        landmarks += deck.cards[card].count;
      } else {
        equipment += 1;
      }
    }

    setNumSpells(spells);
    setNumUnits(units);
    setNumLandmarks(landmarks);
    setNumEquipment(equipment);

  }, [deck]);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(code);
  };


  let deckObjArr = deck.cards.map((elem) => {
    return new Card(elem.card.cardCode, elem.count);
  });

  let code = (DeckEncoder.encode(deckObjArr));

  // sort
  deck.cards !== undefined && deck.cards.sort((a, b) => {
    if (a.card.rarity !== b.card.rarity) {
      return a.card.rarity.localeCompare(b.card.rarity);
    } else if (a.card.cost !== b.card.cost) {
      return a.card.cost - b.card.cost;
    } else if (a.card.name !== b.card.name) {
      return a.card.name.localeCompare(b.card.name);
    }
  });



  const drawerWidth = '325px';

  return <Drawer
  sx={{
    width: drawerWidth,
    minWidth: '300px',
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
      Copy Code
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

  <Box sx={{display: 'flex', gap: '10px'}}>
    <Box>Units: {numUnits}</Box>
    <Box>Spells: {numSpells}</Box>
    <Box>Landmarks: {numLandmarks}</Box>
    <Box>Equipment: {numEquipment}</Box>
  </Box>
  {deck.cards !== undefined && deck.cards.map((card, index) => (
    <CardBox key={index} card={card} regions={regions}/>

))}

  </Box>
</Drawer>
}

export default DeckViewer;
