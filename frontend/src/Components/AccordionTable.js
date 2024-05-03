import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DialogBox from './DialogBox'
import "../Styles/TripPage.css"
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable(props) {
  const handleEdit = (id) => {
    console.log('Editing row with ID:', id);
  };

  const handleDelete = (id) => {
    console.log('Deleting row with ID:', id);

    props.setmaindata(props.maindata.filter(row => !row.every((item, index) => item === id[index])))

  };
  const newdata = props.maindata && props.maindata.filter((row) => row[0] === props.date);
  return (
    <>
      <TableContainer component={Paper} sx={{
        width: "100%", overflowX: "none"
      }} >
        <Table sx={{ minWidth: 450, width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Sr.</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Date</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Country</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>State</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>City</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Client Name</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Purpose</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Remarks</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Actions</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {newdata && newdata.map((row, key) => (
              <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>
                  {key + 1}
                </TableCell>

                <TableCell align="left" style={{ border: '1px solid #ddd' }}>
                  {row[0]}
                </TableCell>

                <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row[1]}</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row[2]}</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row[3]}</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row[4]}</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row[5]}</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row[6]}</TableCell>
                <TableCell align="left" style={{ border: '1px solid #ddd' }}>
                  <IconButton color="primary">
                    <DialogBox maindata={props.maindata} setmaindata={props.setmaindata} date={props.date} day={key + 1} type={"updatedata"} row={row} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </>

  );
}