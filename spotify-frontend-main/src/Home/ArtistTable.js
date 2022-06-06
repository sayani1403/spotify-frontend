import React, { useState, useEffect }  from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { graphql } from '../apiRequest.js';
import { Rating } from '@mui/material';



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

export default function CustomizedTables(props) {

  function createArtist({id, name, dob, songs, avgRating}) {
    return  {
      id,
      name,
      dob,
      songs: createSong(songs),
      rating: avgRating
    };
  }

  function createSong(songs) {
    return songs.map(x => x.name).join(",")
  }



  function getArtists() {
    graphql(`
    query getData {
      artists {
        id
        name
        dob
        avgRating
        songs {
          name
        }
      }
    }
`).then(response => response.json()).then(response => {
      setRows(response.data.artists.map(x => createArtist(x)));
    });
  }
  useEffect(() => {
    
    getArtists()
  }, [props]);
  const [rows, setRows] = useState([]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Artist</StyledTableCell>
            <StyledTableCell align="right">Date of Birth</StyledTableCell>
            <StyledTableCell align="right">Songs</StyledTableCell>
            <StyledTableCell align="right">Rating</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.dob}</StyledTableCell>
              <StyledTableCell align="right">{row.songs}</StyledTableCell>
              <StyledTableCell align="right"><Rating
                  value={row.rating}
                  precision={0.5}
                  readOnly
                >
                </Rating></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
