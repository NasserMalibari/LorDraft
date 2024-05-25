import { Box } from "@mui/material";
import React from "react"
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function CardBox({card, regions}) {

  const regionToAbbrev = {
    'Demacia': 'DE',
    'BandleCity': 'BC',
    'Bilgewater': 'BW',
    'Targon': 'MT',
    'Shurima': 'SH',
    'Noxus': 'NX',
    'Ionia': 'IO',
    'Freljord': 'FR',
    'PiltoverZaun': 'PZ',
    'ShadowIsles': 'SI'
  };

  const regionToColor = {
    'DE': '#e7d9b8',
    'BC': '#c1cf11',
    'BW': '#d16d49',
    'MT': '#5b37e5',
    'SH': '#eecd32',
    'NX': '#c84d4a',
    'IO': '#cf829b',
    'FR': '#93dffa',
    'PZ': '#dec745',
    'SI': '#0ca184'
  };
  let regionColor = regionToColor[card.card.regions.split('/')[0]];
  if (regionToAbbrev[regions[0]] !== card.card.regions.split('/')[0] && regionToAbbrev[regions[1]] !== card.card.regions.split('/')[0]) {
    regionColor = regionToColor[card.card.regions.split('/')[1]];
  }

  let backgroundStyle = `linear-gradient(to right, ${regionColor}, rgba(0, 0, 0, 0) 80%)`;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
    
  return <><Box
  sx={{border: '2px solid black', width: '100%', height: '30px', display:'flex', justifyContent: 'space-between', gap: '10px',
    alignItems: 'center', overflow: 'hidden', position: 'relative', background: backgroundStyle
  }}
  onMouseEnter={handlePopoverOpen}
  onMouseLeave={handlePopoverClose}
  >
    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: '10px'
  }}>
    {/* <Box component="img" src={card.card.fullPath} 
    sx={{marginLeft: '80px', marginTop: '-63px', position: 'absolute', zIndex: -1, width: '190px'}}/> */}
      <Box >
        {card.card.cost}
      </Box>
      <Box >
        {card.card.name}
      </Box>
      </Box>
    <Box>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      x{card.count}
    </Box>
    </Box>
  </Box>
        <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
      <Box
        component="img"
        sx={{
          height: 233,
        }}
        src={card.card['path']}
      />
    </Popover></>
}

export default CardBox;
