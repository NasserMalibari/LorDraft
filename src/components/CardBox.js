import { Box } from "@mui/material";
import React from "react"

function CardBox({card}) {
    
    console.log(card)
  return <Box
  sx={{border: '2px solid black', width: '260px', height: '30px', display:'flex', justifyContent: 'flex-start', gap: '10px',
    alignItems: 'center'
  }}>
    <Box >
      {card.card.cost}
    </Box>
    <Box >
      {card.card.name}
    </Box>
    <Box sx={{ marginLeft: 'auto', marginRight: '5px' }}>
      x{card.count}
    </Box>
  </Box>
}

export default CardBox;
