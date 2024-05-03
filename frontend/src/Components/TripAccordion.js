import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import AccordionTable from "./AccordionTable.js";
import DialogBox from './DialogBox.js'
const MultipleAccordions = (props) => {
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };
  return (
    <div>
      {props.dates && props.dates.map((item, key) => (
        <Accordion
          key={key}
          expanded={expandedPanel === key}
          onChange={handleChange(key)}
          className={
            (expandedPanel && expandedPanel === key) ? "basic expandedAccordion" : "basic expandedContent"
          }
          style={{
            backgroundColor: "transparent",
            border: "2px solid white",
            borderRadius: "0px",
            margin: "0rem",
            width:"100%"
          }}
        >
          <AccordionSummary >
            <Typography
              variant="h7"
              style={{ fontWeight: 500, fontSize: "1.5rem" }}
            >
              {`Day ${key + 1}`}  {item.format("DD-MM-YYYY")}
            </Typography>
            <DialogBox maindata={props.maindata} setmaindata={props.setmaindata} date={item.format("DD-MM-YYYY")} day={key + 1} type={"newdata"} />
          </AccordionSummary>
          <AccordionDetails
            className="expandedContent"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              overflowX:"none"
            }}
          >
            <AccordionTable maindata={props.maindata} date={item.format("DD-MM-YYYY")} setmaindata={props.setmaindata} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default MultipleAccordions;
