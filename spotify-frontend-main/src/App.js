import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchAppBar from './Home/SearchAppBar';
import SongTable from './Home/SongTable'
import ArtistTable from './Home/ArtistTable'
import AddSong from './Home/AddSong'
import { Button, Modal, Box,  } from '@mui/material';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom'

function App() {
  const [open, setOpen] = React.useState(false);
  const [ratingChange, setRatingChange] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <SearchAppBar></SearchAppBar>

      <Link to="/addSong">addSong</Link>
      <div style={{ marginLeft: "50px", marginRight: "50px", marginTop: "50px"}}>
		<SongTable setRatingChange = {setRatingChange} ratingChange = {ratingChange}></SongTable>
      </div>
      <div style={{ marginLeft: "50px", marginRight: "50px", marginTop: "50px"}}>
		<ArtistTable ratingChange = {ratingChange}></ArtistTable>
      </div>
    </div>

  );
}

export default App;
