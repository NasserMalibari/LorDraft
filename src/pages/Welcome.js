import React from "react";
import { Box, Button, Divider } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";


function Welcome() {
    const navigate = useNavigate();

    return (
        <>
        <Nav />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Box
            sx={{
              width: '300px',
              border: '1px solid grey',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                padding: '16px',
                backgroundColor: '#f0f0f0',
              }}
            >
              Play Standard Draft
              <Button variant="contained" sx={{marginLeft: '10px'}}
              onClick={() => navigate('/draft/standard')}
              >
                Play
              </Button>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: '16px',
                backgroundColor: '#e0e0e0',
              }}
            >
              Play Eternal Draft 
              <Button variant="contained" sx={{marginLeft: '10px'}}
              onClick={() => navigate('/draft/eternal')}
              >
                Play
              </Button>
            </Box>
          </Box>
        </Box>
        </>
    );
    };

export default Welcome;
