import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BasicTable(props) {
  function convertToObjects(array) {
    const arrayOfObjects = [];
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      const innerArray = array[i];
      const obj = {};
      for (let j = 0; j < innerArray.length; j++) {
        switch (j) {
          case 0:
            obj.Date = innerArray[j];
            break;
          case 1:
            obj.Country = innerArray[j];
            break;
          case 2:
            obj.State = innerArray[j];
            break;
          case 3:
            obj.City = innerArray[j];
            break;
          case 4:
            obj.ClientName = innerArray[j];
            break;
          case 5:
            obj.Purpose = innerArray[j];
            break;
          case 6:
            obj.Remarks = innerArray[j];
            break;
          case 7:
            obj.Day = innerArray[j];
            break;
        }
      }
      arrayOfObjects.push(obj);
      console.log(obj);
    }
    return arrayOfObjects;
  }

  async function submitmaindata() {
    try {
      const tripTableData = convertToObjects(props.pushingdata);
      const employee = props.employeeID;
      const employeename = props.employeeName;
      const type = props.type;
      const department = props.dept;
      const sno = props.srno;
      const response = await axios.post("http://localhost:4000/tripData", {
        tripTableData,
        employee,
        employeename,
        type,
        department,
        sno,
      });
      console.log("Response:", response.data);
      toast.success("Data submitted successfully!"); // Display success message
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data. Please try again."); // Display error message
    }

    props.setmaindata([]);
    props.setpushingdata([]);
  }

  return (
    <>
      <TableContainer
        className="tablecontainer"
        component={Paper}
        sx={{ maxWidth: 1000, margin: "auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Actions</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Sr.</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Date</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Day</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Country</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>State</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>City</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Client Name</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Purpose</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.pushingdata &&
              props.pushingdata.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left" style={{ border: '1px solid #ddd' }}>
                    <IconButton aria-label="edit" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd' }}>{index + 1}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row[0]}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd' }}>{`Day-${row[7]}`}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row[1]}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row[2]}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row[3]}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row[4]}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row[5]}</TableCell>
                  <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row[6]}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <Button
          className="tablebtn"
          variant="contained"
          onClick={submitmaindata}
          size="medium"
          sx={{
            backgroundColor: props.darkmode ? "black" : "white",
            color: props.darkmode ? "white" : "black",
            borderRadius: "30px",
            marginRight: "1rem",
          }}
        >
          Submit
        </Button>
        <Button
          className="tablebtn"
          variant="contained"
          size="medium"
          sx={{
            backgroundColor: props.darkmode ? "black" : "white",
            color: props.darkmode ? "white" : "black",
            borderRadius: "30px",
          }}
        >
          Clear
        </Button>
      </div>
      <ToastContainer />
    </>
  );
}
