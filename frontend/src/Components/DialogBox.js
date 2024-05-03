import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import Box from '@mui/material/Box';
import EditIcon from "@mui/icons-material/Edit";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import countryCodeLookup from "country-code-lookup";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ButtonDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [globalcountrydata, setGlobalCountryData] = useState([]);
  const [globalstatedata, setGlobalStateData] = useState([]);
  const [stateid, setStateId] = useState("");
  const [clientname, setClientName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [remarks, setRemarks] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [iso2Code, setIso2Code] = useState("");

  const fetchCountries = async () => {
    try {
      const apiKey = "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==";
      const apiUrl = "https://api.countrystatecity.in/v1/countries";

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSCAPI-KEY": apiKey,
        },
      });
      const data = await response.json();
      setGlobalCountryData(data);
      const countryNames = data.map((option) => option.name);
      setCountries(countryNames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchState = async (value) => {
    try {
      const country = globalcountrydata.find((item) => item.name === value);
      const apiKey = "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==";
      const apiUrl = `https://api.countrystatecity.in/v1/countries/${country.iso2}/states`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSCAPI-KEY": apiKey,
        },
      });
      const data = await response.json();
      setGlobalStateData(data);
      console.log(globalstatedata);
      setStates(data);
      setStateId(country.id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCity = async (value) => {
    try {
      const state = globalstatedata.find((item) => item.name === value);
      const apiKey = "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==";
      const apiUrl = `https://api.countrystatecity.in/v1/countries/${iso2Code}/states/${state.iso2}/cities`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSCAPI-KEY": apiKey,
        },
      });
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCountryChange = (e, value) => {
    setSelectedCountry(value);

    fetchState(value);

    const countryInfo = countryCodeLookup.byCountry(value);
    if (countryInfo) {
      setIso2Code(countryInfo.iso2);
    } else {
      setIso2Code("");
    }
  };


  const handleStateChange = (e, value) => {
    setSelectedState(value);
    fetchCity(value);
  };

  const handleCityChange = (e, value) => {
    setSelectedCity(value);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleOpen = () => {
    if (props.type === "updatedata") {
      setSelectedCountry(props.row[1]);
      setSelectedState(props.row[2]);
      setSelectedCity(props.row[3]);
      setClientName(props.row[4]);
      setPurpose(props.row[5]);
      setRemarks(props.row[6]);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClearInput = () => {
    setClientName('');
  };

  const handleClearPurpose = () => {
    setPurpose('');
  };

  const handleClearRemarks = () => {
    setRemarks('');
  };

  const handleSubmitDialog = () => {
    const datadialog = [
      props.date,
      selectedCountry,
      selectedState,
      selectedCity,
      clientname,
      purpose,
      remarks,
      props.day,
    ];
    console.log(datadialog);
    props.setmaindata([...props.maindata, datadialog]);
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCity("");
    setClientName("");
    setPurpose("");
    setRemarks("");
    handleClose();
    console.log(props.maindata);
  };

  const handleUpdateDialog = () => {
    const index = props.maindata.findIndex((datarow) => datarow === props.row);
    var row = [
      (props.maindata[index][0] = props.date),
      (props.maindata[index][1] = selectedCountry),
      (props.maindata[index][2] = selectedState),
      (props.maindata[index][3] = selectedCity),
      (props.maindata[index][4] = clientname),
      (props.maindata[index][5] = purpose),
      (props.maindata[index][6] = remarks),
    ];
    if (index !== -1) {
      const updatedData = [...props.maindata];
      updatedData[index] = row;
      props.setmaindata(updatedData);
    }
    console.log(props.row);
    console.log(props.maindata);
    handleClose();
  };

  return (
    <div>
      {props.type === "newdata" ? (
        <AddCircleOutlineOutlinedIcon onClick={handleOpen} />
      ) : (
        <IconButton onClick={handleOpen} color="primary">
          <EditIcon />
        </IconButton>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontWeight: "bold" }}>
          {`Day-${props.day} ${props.date}`}
        </DialogTitle>
        <DialogContent>
          <form style={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-country"
                  options={countries}
                  getOptionLabel={(option) => option}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a country"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  size="small"
                  id="combo-box-state"
                  options={states.map((state) => state.name)}
                  value={selectedState}
                  onChange={handleStateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a state"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  size="small"
                  id="combo-box-city"
                  options={cities.map((city) => city.name)}
                  value={selectedCity}
                  onChange={handleCityChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a city"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <TextField
                    size="small"
                    fullWidth
                    label="Client"
                    onChange={(e) => setClientName(e.target.value)}
                    value={clientname}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" aria-label="delete" onClick={handleClearInput}>
                            <CloseIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <TextField
                    size="small"
                    fullWidth
                    label="Purpose"
                    onChange={(e) => setPurpose(e.target.value)}
                    value={purpose}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" aria-label="delete" onClick={handleClearPurpose}>
                            <CloseIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <TextField
                    size="small"
                    fullWidth
                    label="Remarks"
                    onChange={(e) => setRemarks(e.target.value)}
                    value={remarks}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" aria-label="delete" onClick={handleClearRemarks}>
                            <CloseIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >
            Cancel
          </Button>
          {props.type === "newdata" ? (
            <Button
              onClick={handleSubmitDialog}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleUpdateDialog}
              type="submit"
              variant="contained"
            >
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default ButtonDialog;