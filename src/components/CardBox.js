import { Box } from "@mui/material";
import React from "react"

function CardBox({card}) {
    
  return <Box
  sx={{border: '2px solid black', width: '100%', height: '30px', display:'flex', justifyContent: 'space-between', gap: '10px',
    alignItems: 'center'
  }}>
    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: '10px'}}>
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
}

export default CardBox;
