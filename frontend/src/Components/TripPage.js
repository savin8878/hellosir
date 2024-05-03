import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "../Styles/TripPage.css";
import Table from "./Table.js";
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TripModal from "./TripModal.js";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {Box, FormControl, InputLabel, MenuItem, Select, Popover, Checkbox } from '@mui/material';
const Empid = [
  { title: '12345', name: "KRISHNA" },
  { title: '54321', name: "RADHA" },
  { title: '32145', name: "BABA" },
];

const TripPage = (props) => {
  const [employeeID, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [type, setselecttype] = useState("");
  const [dept, setselectdept] = useState("");
  const [srnumber, setsrnumber] = useState("");
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fromLocationList, setFromLocationList] = useState([]);
  const [toLocationList, setToLocationList] = useState([]);
  const [maindata, setmaindata] = useState([])
  const [pushingdata, setpushingdata] = useState()
  const handleOpenAutoComplete = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAutoComplete = () => {
    setAnchorEl(null);
  };

  const handleAutocompleteChange = (event, value) => {
    setSelectedEmployeeIds(value);
  };

  useEffect(() => {
    const formattedData1 = selectedEmployeeIds.map(id => `${id.title}`).join(", ");
    const formattedData2 = selectedEmployeeIds.map(id => `${id.name}`).join(", ");
    setEmployeeId(formattedData1);
    setEmployeeName(formattedData2);
    console.log(formattedData1, formattedData2);
  }, [selectedEmployeeIds]);

  let employeedata = [employeeID, employeeName, type, dept, srnumber];
  console.log(employeedata);
  console.log(employeeID, employeeName);
  const SelectType = [
    { title: 'Indivisual', name: 1994 },
    { title: 'Group', name: 1972 }
  ];

  const handleChange = (event) => {
    const { value } = event.target;
    setselectdept(value)
  };

  const [dates, setDates] = useState([]);

  const handleToLocation = (value) => {
    const filteredLocations = toLocationList.filter((item) => item.title !== value);
    setFromLocationList(filteredLocations);
    setselecttype(value)
  };

  return (
    <>
    
      <div className="container">
        <div className='mainclass'></div>
        <div className="maincontainer" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          <div className="col-lg-2" style={{ margin: "8px" }}>
            <Stack spacing={2}>
              <TextField
                size="small"
                label="Search by Employee Ids"
                onClick={handleOpenAutoComplete}
                value={selectedEmployeeIds.map(id => `${id.title}-${id.name}`).join(", ")}
                onChange={(e) =>
                  setSelectedEmployeeIds(
                    e.target.value
                      .split(",")
                      .map(id => {
                        const [title, name] = id.trim().split("-");
                        return { title, name };
                      })
                  )
                }
              />
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleCloseAutoComplete}
                anchorOrigin={{
                  vertical: "bottom",
                }}
                transformOrigin={{
                  vertical: "top",
                }}
              >
                <Autocomplete
                  multiple
                  size="small"
                  id="checkboxes-tags-demo"
                  style={{ width: '220px' }}
                  options={Empid}
                  getOptionLabel={(option) => `${option.title}-${option.name}`} // Concatenate title and name
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox style={{ marginRight: 2 }} checked={selected} />
                      {`${option.title}-${option.name}`} {/* Display title-name format */}
                    </li>
                  )}
                  value={selectedEmployeeIds}
                  onChange={handleAutocompleteChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search"
                      value={selectedEmployeeIds.map(id => `${id.title}-${id.name}`).join(", ")} // Display in title-name format in TextField
                      onChange={(e) =>
                        setSelectedEmployeeIds(
                          e.target.value
                            .split(",")
                            .map(id => {
                              const [title, name] = id.trim().split("-");
                              return { title, name };
                            })
                        )
                      }
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <p variant="outlined" label={`${option.title}-${option.name}`} {...getTagProps({ index })} /> // Display title-name format as tags
                    ))
                  }
                />
              </Popover>
            </Stack>


          </div>

          <div className="col-lg-2 m-top-16" style={{ margin: "8px" }}>
            <Stack spacing={2}>
              <Autocomplete
                size='small'
                onChange={(event, value) => handleToLocation(value)}
                id="to-location"
                freeSolo
                options={SelectType.map((option) => option.title)}
                renderInput={(params) => <TextField {...params} label="Select Type" />}
              />
            </Stack>
          </div>
          <div className="col-lg-2 m-top-16" style={{ margin: "8px" }}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="travel-class-label">Select Dept.</InputLabel>
                <Select
                  style={{ width: "100%" }}
                  size='small'
                  labelId="travel-class-label"
                  id="demo-simple-select"
                  value={dept}
                  label="Select Dept"
                  onChange={(event) => handleChange(event)} // Pass 1 for the 3rd box
                >
                  <MenuItem value={"Sales"}>Sales</MenuItem>
                  <MenuItem value={"Operation"}>Operations</MenuItem>
                  <MenuItem value={"Services"}>Services</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          {dept === "Services" ? <div style={{ margin: "8px" }}>
            <Box style={{ height: "38px", width: "60px", border: "1px solid #ccc", borderRadius: "4px" }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="travel-class-input" style={{ marginBottom: "4px" }}>.......</InputLabel>
                <TextField
                  size="small"
                  variant="outlined"
                  value={srnumber}
                  onChange={(e) => setsrnumber(e.target.value)}
                />
              </FormControl>
            </Box>
          </div> : ""}
          <div style={{ margin: "8px", zIndex: 1000 }}> {/* Add zIndex here */}
            <DatePicker
              value={dates}
              small
              onChange={setDates}
              format="MMMM DD YYYY"
              sort
              className={props.check ? "bg-dark" : ""}
              plugins={[
                <DatePanel />
              ]}
              style={{ height: '32px', backgroundColor: props.check ? "#222222" : "#ffffff", color: props.check ? "#ffffff" : "#333333", width: "100%", zIndex: 1000 }} // Add zIndex here
            />
          </div>
          <TripModal dates={dates} maindata={maindata} setmaindata={setmaindata} pushingdata={pushingdata} setpushingdata={setpushingdata} check={props.check} />
        </div>
        <div
          className="tableSection"

        >
          <h1 style={{ textAlign: 'center' }} >Trip Plan</h1>
          <Table check={props.check} setmaindata={setmaindata} pushingdata={pushingdata} setpushingdata={setpushingdata} employeedata={employeedata} employeeID={employeeID} employeeName={employeeName} type={type} dept={dept} srno={srnumber} />
        </div>
      </div>
    </>
  );
};

export default TripPage;
