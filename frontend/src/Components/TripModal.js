import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "../Styles/TripPage.css";
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import TripAccordion from "./TripAccordion";
import { IconButton } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleclearmodal = () => {
    props.setmaindata([]);
    console.log("Data Cleared Successfully")
  }
  const handlesubmitmodal = () => {
    props.setpushingdata(props.maindata)
    handleClose()
  }
  return (
    <div>
      {
        props.dates.length >= 1 ? (<IconButton
          variant="contained"
          style={{ marginLeft: "10px" }}

        >
          <EditCalendarRoundedIcon
            onClick={handleOpen}
            style={{ fontSize: '40px', width: '40px', height: '40px', margin: "4px", position: 'absolute', top: '0', left: '0' }}
          />
        </IconButton>) : ("")
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{}}
      >
        <Box
          sx={{
            ...style,
            width: 1000,
            height: 500,
            boxShadow: "0 0 10px 0 white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="modalparent"
        >
          <h2 id="parent-modal-title" style={{ fontSize: "3rem", color: props.check ? "white" : "black" }}>
            Plan for {props.dates.length} days
          </h2>
          <Box
            style={{
              width: "90%",
              height: "90%",
              overflowY: "scroll",
              overflowX: "visible",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <TripAccordion maindata={props.maindata} setmaindata={props.setmaindata} dates={props.dates} />
          </Box>
          <div className="btngroup">
            <Button
              className="tablebtn"
              variant="contained"
              onClick={handlesubmitmodal}
              size="medium"
              sx={{
                backgroundColor: props.check ? "white" : "black",
                color: props.check ? "black" : "white",
                borderRadius: "30px  ",
                ml: 2,
              }}
            >
              Save
            </Button>
            <Button
              className="tablebtn"
              variant="contained"
              size="medium"
              onClick={handleclearmodal}
              sx={{
                backgroundColor: props.check ? "white" : "black",
                color: props.check ? "black" : "white",
                borderRadius: "30px  ",
                ml: 2,
              }}
            >
              Clear
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
