import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Rating } from '@mui/material';
import { graphql } from '../apiRequest.js';


export default function CustomizedTables(props) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createArtist(artists) {
    return artists.map(x => x.name).join(', ');
  }

  function createSong({id, name, dor, artists, avgRating, ratingCount}) {
    return {
      id,
      name,
      dor,
      artists: createArtist(artists),
      rating: avgRating
    };
  }

  function getSongs() {
    graphql(`
query getData {
  songs {
    id
    name
    dor
    artists {
      id
      name
    }
    avgRating
    ratingCount
  }
}
`).then(response => response.json()).then(response => {
      setRows(response.data.songs.map(x => createSong(x)));
    });
  }

  function rateSong(id, rating) {
    graphql(`
mutation getData {
  rateSong(
    input: {
	  userId: ${user.id},
      songId: ${id},
      rating: ${rating}
    }
  ) {
    rating {
    	rating
    }
  }
}
`).then(response => {
  props.setRatingChange(!props.ratingChange);
  getSongs();
  }
  );
  }


  useEffect(() => {
    graphql(`query getData { users { id name }}`)
      .then(response => response.json())
      .then(response => {
        setUser(response.data.users[1]);
      });
    getSongs();
  }, []);

  const [rows, setRows] = useState([]);
  const [user, setUser] = useState({});

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Song</StyledTableCell>
            <StyledTableCell align="right">Artists</StyledTableCell>
            <StyledTableCell align="right">Date of Release</StyledTableCell>
            <StyledTableCell align="right">Rating</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.artists}</StyledTableCell>
              <StyledTableCell align="right">{row.dor}</StyledTableCell>
              <StyledTableCell align="right">
                <Rating
                  value={row.rating}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    rateSong(row.id, newValue);
                  }}>
                </Rating>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}
