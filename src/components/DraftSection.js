import React from "react";
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


// cards is a list of images
// selectOption is function that takes in [0, 1, 2, 3]
function DraftSection({cards, selectOption, header, isLoaded, doneLoading}) {

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h1>{header}</h1>
      {!isLoaded && <CircularProgress style={{ marginLeft: '10px' }} />}
    </div>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2, // Adjust the gap between images as needed
        // overflowX: 'wr', // Enable horizontal scrolling if needed
      }}
    >
      {cards.map((src, index) => (
        <Button
          key={index}
          onClick={() => selectOption(index)}
          sx={{
            padding: 0, // Remove default padding from the button
            borderRadius: 2, // Rounded corners
            overflow: 'hidden', // Ensure the border radius is applied to the image
            minWidth: 'auto', // Remove the default min-width of the button
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <Box
            component="img"
            src={src.path}
            alt={`image-${index}`}
            onLoad={() => doneLoading(index)}
            sx={{
              height: 300,
              objectFit: 'cover',
              borderRadius: 2,
              border: '1px solid #000',
              padding: '20px'
            }}
          />
        </Button>
      ))}
    </Box>
    </>
  );
}

export default DraftSection;
