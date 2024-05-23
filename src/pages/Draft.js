import React, { useEffect, useState } from "react";
import { Box, CssBaseline } from '@mui/material';
import DeckViewer from "../components/Deck";
import DraftSection from "../components/DraftSection";
import Nav from "../components/Nav";
import { getRandomElements } from "../helpers/sample";

// the main page
function Draft() {
  // "regions" | "cards" | "finished"
  const [draftState, setDraftState] = useState('regions');
  
  let availableRegions = ["Demacia", "Ionia", "Targon", 
  "PiltoverZaun", "Noxus", "Freljord", "Bilgewater", "BandleCity",
  "ShadowIsles", "Shurima"]

  const [allCards, setAllCards] = useState([]);

  const [availableChamps, setAvailableChamps] = useState([]);
  const [availableFollowers, setAvailableFollowers] = useState([]);
  
  const [deck, setDeck] = useState({
    'cards': [],
    'numCards': 0
  });
  // const [deck, setDeck] = useState([]);
  const [regions, setRegions] = useState([]);
  
  const [imagesLoaded, setImagesLoaded] = useState([false, false, false, false]);
  const [allLoaded, setAllLoaded] = useState([false]);

  useEffect(() => {
    setAllLoaded(imagesLoaded.every(element => element));
  }, imagesLoaded);
  
  // options are the list of 4 options (usually cards) that client can select
  const [options, setOptions] = useState([]);
  const [headerText, setHeaderText] = useState('Select region 1');

  const selectOption = (index) => {
    if (draftState === "regions") {
      if (regions.length === 0) {
        // remove selected region from available regions
        availableRegions = availableRegions.filter(region => region !== options[index].value);

        // add selected region to region list
        setRegions(prev => [...prev, options[index].value]);

        // generate regions to show
        generateRegionsToShow();
        setHeaderText('Select Region 2');
      } else if (regions.length === 1) {
        setRegions(prev => [...prev, options[index].value]);
        setDraftState("cards");
      }
    }

    if (draftState === "cards") {
      const selectedValue = options[index].value;
      // reduce count by 1
      if (deck.numCards === 0 || deck.numCards === 1 || deck.numCards === 14 || deck.numCards == 15 || deck.numCards === 28 || deck.numCards === 29) {
        addToDeck(selectedValue, availableChamps, setAvailableChamps);
      } else {
        if (deck.length === 40) {
          return;
        }
        addToDeck(selectedValue, availableFollowers, setAvailableFollowers);
      }
    }

  }

  useEffect(() => {
    if (regions.length !== 2) {
      return;
    }

    initialiseAvailableCards();

  }, [regions]);

  // regions is a list of two regions
  const initialiseAvailableCards = async () => {
    try {
      const response = await fetch('/cards.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      regions.forEach(async (region) => {
        if (region === 'PiltoverZaun') {
          region = 'Piltover & Zaun';
        } else if (region === 'ShadowIsles') {
          region = 'Shadow Isles';
        } else if (region === 'BandleCity') {
          region = 'Bandle City';
        }

        data[region]['champions'].forEach((champ) => {
          setAvailableChamps(prevChamps => [...prevChamps, { ...champ, count: 3 }]);
          setAllCards(prevChamps => [...prevChamps, {...champ, type: 'champion'}]);
        });
        data[region]['rest'].forEach((card) => {
          setAvailableFollowers(prevFollowers => [...prevFollowers, { ...card, count: 3 }])
          setAllCards(prevFollowers => [...prevFollowers,  {...card, type: 'follower'}]);
        });
      });
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }
  }

  const doneLoading = (index) => {
    setImagesLoaded(prevLoaded => {
      const newLoaded = [...prevLoaded];
      newLoaded[index] = true;
      return newLoaded;
    })
    // set the loadingVariable state at index to true
  }

  useEffect(() => {
    if (availableChamps.length === 0) {
      return;
    }
    // generateCardsToShow();
    if (deck.numCards === 0 || deck.numCards === 1 || deck.numCards === 14 || deck.numCards == 15 || deck.numCards === 28 || deck.numCards === 29) {
      setHeaderText(`Select Champion`);
      // generate champion to show
      let newOpts = getRandomElements(availableChamps, 4);

      setImagesLoaded([false, false, false, false]);

      setOptions(newOpts.map((card) => {
        return {
          "value": card.cardCode,
          "path": `/allCards/${card.cardCode}.png`
        };
      }));
    } else if (deck.numCards < 40) {
      setImagesLoaded([false, false, false, false]);
      setHeaderText(`Select Follower`);
      let newOpts = getRandomElements(availableFollowers, 4);
      setOptions(newOpts.map((card) => {
        return {
          "value": card.cardCode,
          "path": card.path
        };
      }));
    } else {
      setHeaderText('Finished');
      setAllLoaded(true);
      setOptions([]);
    }

  }, [availableChamps, availableFollowers]);

  const generateRegionsToShow = () => {
    let regionOptions = getRandomElements(availableRegions, 4);
    let newOptions = []
    regionOptions.forEach((region) => {
      newOptions.push({'value': region, 'path': `./${region}.png`});
    });

    setOptions(newOptions);
  }


  useEffect(() => {
    // numAvailableRegions = availableRegions.length;
    generateRegionsToShow();
    setHeaderText('Select Region 1');
  }, []);

  return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Nav />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, marginTop: 8 }} // Adjust marginTop based on AppBar height
          >
            <DraftSection cards={options} selectOption={selectOption} header={headerText}
            isLoaded={allLoaded} doneLoading={doneLoading}
            />
          </Box>
          <DeckViewer deck={deck}/>
        </Box>
      );

  function addToDeck(selectedValue, pool, setPool) {
    for (let i = 0; i < pool.length; i++) {
      if (pool[i]['cardCode'] === selectedValue) {
        setDeck(prevDeck => {
          let newDeck = {...prevDeck};
          newDeck['numCards'] += 1;
          
          const index = newDeck['cards'].findIndex(element => element.card.cardCode === selectedValue);

          if (index !== -1 ){
            newDeck['cards'][index]['count'] += 1;
          } else {
            const allCardsIndex = allCards.findIndex(element => element.cardCode === selectedValue);
            newDeck['cards'].push({'card': allCards[allCardsIndex], 'count': 1});
          }
          return newDeck;
        });
        if (pool[i]['count'] <= 1) {
          setPool(pool.filter(card => card['cardCode'] !== selectedValue));
        } else {
          setPool(prevState => {
            return prevState.map(card => {
              return card['cardCode'] === selectedValue ? { ...card, count: pool[i]['count'] - 1 } : card;
            });
          });
        }

        break;
      }
    }
  }
}

export default Draft;
