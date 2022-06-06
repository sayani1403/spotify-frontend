import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { ButtonBase, TextField } from '@mui/material';
import { Container } from '@mui/system';
import SearchAppBar from './SearchAppBar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { graphql } from '../apiRequest.js';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [artist, setArtist] = React.useState('');
  const [dor, setDor] = React.useState('');
  const [songname, setSongname] = React.useState('');
  const [rows, setRows] = React.useState([]);


  function getDate(isoString) {
    var event = new Date(isoString);

    let date = JSON.stringify(event)
    date = date.slice(1,11)
    return date;
    
  }

  const handleChange = (event) => {
    setArtist(event.target.value);
  };


  function submitNewSong() {
    console.log(songname)
    graphql(`
    mutation getData {
      createSong(
        input: {
          name: "${songname}",
          dor: "${getDate(dor)}",
          artists: [${parseInt(artist)}]
        }
      ) {
        song {
          id
          name
          artists {
            id
            name
          }
        }
      }
    }
    
    
`).then(response => console.log(response))}


 function getArtists() {
      graphql(`
      query getData {
        artists {
          id
          name
        }
      }
  `).then(response => response.json()).then(response => {
        setRows(response.data.artists)
      });
    }
    useEffect(() => {
      
      getArtists()
    }, []);

  return (
    <div>
     <SearchAppBar></SearchAppBar>
      <Container> 
    <FormControl fullWidth>
        <TextField id="song-name" label="Song Name" variant="standard" onChange={(event)=> {setSongname(event.target.value)}}/>
        <br/>   
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker id="date-released" value={dor} inputFormat="dd-MM-yy" onChange={(newValue)=> {setDor(newValue)}}  renderInput={(params) => <TextField {...params} />}/>
        </LocalizationProvider>
        <br/>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={artist}
            label="Artist Name"
            onChange={handleChange}
        >
        {rows.map(row =>   <MenuItem value={row.id}>{row.name}</MenuItem>)}
          
        </Select>
        <Button onClick={submitNewSong}>Add Song</Button>
    </FormControl>
           
 </Container>
    </div>
  );
}
