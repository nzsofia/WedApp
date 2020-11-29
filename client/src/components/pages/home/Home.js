import React, { useState, useEffect } from "react";
import homePage from "../../../assets/svg/compositions/home_page.svg";
import './Home.scss';
import { useHistory } from "react-router-dom";
import ErrorMessage from "../../shared/error-message/ErrorMessage.js"
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { InputLabel, FormHelperText, FormControl, Select, Button, TextField, Fab, Paper, Grid, Tooltip  } from "@material-ui/core";
import NavigationBar from "../../shared/navigation-bar/NavigationBar";
import grass1 from "../../../assets/svg/grass-1.svg";
import * as request from "../../../services/request";

function Home() {
  const history = useHistory();
  const rsvpValues = ["Yes, I'm coming to the wedding! :)", "No, I cannot come to the wedding! :("];
  const namesText = "ROSE & LEWIS";

  // STATES
  const [response, setResponse] = useState({
      rsvp: null,
      allergies: ""
  });
  const [formError, setFormError] = useState({
    rsvp: null
  });
  const [returnMessage, setReturnMessage] = useState({
    code: null,
    content: ""
  });

  const [plusPeople, setPlusPeople] = useState([{key: 0, fNamePP: "", lNamePP: ""}]);
  const [maxInput, setMaxInput] = useState(1);
  const [hasResponded, setHasResponded] = useState(false);


  function authenticate() {
    request.get(`${request.URL}/`)
      .then(res => {
        setReturnMessage(res.message);

        // if authentication failed redirect to login page
        if (res.message.code === 401) {
          history.push("/sign");
        }
        else if (res.message.code === 200) {
          // set the number of plus people allowed as the maximum for the number of input fields that can be added
          if (res.plusPeopleNumber)
            setMaxInput(res.plusPeopleNumber);
          // do not show response form, if user already responded
          if (res.rsvp!=null)
            setHasResponded(true);
        }
      })
      .catch(err => err);
  }

  function handleChange(event) {
    const {name, value} = event.target;

    setResponse(prevResponse => {
      return {
        ...prevResponse,
        [name]: value
      };
    });
  }

  function handleChangePlusPeople(event, index) {
    const {name, value} = event.target;
    const tempList = [...plusPeople];
    tempList[index][name] = value;
    setPlusPeople(tempList);
  }

  function addPlusPerson() {
    setPlusPeople([...plusPeople, {key: plusPeople.length, fNamePP: "", lNamePP: ""}]);
  }

  function validation() {

    let newError = {};

    if(!response.rsvp) {
      console.log(response);
      newError.rsvp = "Required";
    }

    setFormError(newError);
    //check if there were any errors
    if(Object.keys(newError).length === 0) return true;
    return false;
  }

  function sendResponse(event) {

    //validate form fields
    if(!validation()) {
      event.preventDefault();
      return;
    }

    const responseData = {
      rsvp: response.rsvp,
      allergies: response.allergies,
      plusPeople: plusPeople
    };

    request.post(`${request.URL}/`, responseData)
      .then(res => {
        setReturnMessage(res.message);

        // if response was saved, notify user
        if (res.message.code === 200) {
          setHasResponded(true);
        }
        else {
          //error message is shown in form
          event.preventDefault();
        }
      })
      .catch(err => err);
  }

  // check if user is authorized to access this page
  useEffect(authenticate, []);

  return (
    <div>
      <NavigationBar />
      <header className="header-img">
        <img src={homePage} alt="Home design"/>
        <div className="names">{namesText}</div>
        <div className="date date--1">2021</div>
        <div className="date date--2">OCT</div>
        <div className="date date--3">16</div>
        {!hasResponded && <Button className="header-rsvp-button" variant="contained" color="secondary" href="#response">
         RSVP CARD
        </Button>}
      </header>

      <div id="response" className="response-container">

        <div className="response-container__decoration response-container__decoration--left">
          <img src={grass1} alt="grass decoration"/>
        </div>
        <div className="response-container__decoration response-container__decoration--right">
          <img src={grass1} alt="grass decoration"/>
        </div>

        <Paper className="response-form-background">

          {hasResponded ?
          <div className = "response-form-background__responded">
            <h1>Thank you for your response!</h1>
            <FavoriteIcon className="heart-icon"/>
          </div> :

          <Grid container spacing={2} justify="center" alignItems="center" direction="column">

            <Grid item>
              <h1>RSVP</h1>
            </Grid>
            <Grid item>
              <p>Please RSVP here as soon as possible!</p>
            </Grid>
            {returnMessage.code && returnMessage.code !== 200 &&
              <Grid item>
                <ErrorMessage>{returnMessage.content}</ErrorMessage>
              </Grid>}

            <Grid item>
              <form>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <FormControl fullWidth required variant="outlined" error={formError.rsvp}>
                      <InputLabel htmlFor="rsvp-response">Are you coming to the wedding?</InputLabel>
                      <Select
                        native
                        value={response.rsvp}
                        onChange={handleChange}
                        label="Are you coming to the wedding?"
                        inputProps={{
                          name: "rsvp",
                          id: "rsvp-response",
                        }}
                      >
                        <option aria-label="None" value={null} />
                        <option value={true}>{rsvpValues[0]}</option>
                        <option value={false}>{rsvpValues[1]}</option>
                      </Select>
                      {formError.rsvp && <FormHelperText>{formError.rsvp}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  <Tooltip title="Who comes to the wedding?">
                    <h2 className="plus-people-header">Plus people</h2>
                  </Tooltip>
                  {plusPeople.map((plusPerson, i) => {
                    return(
                      <Grid item container direction="row" spacing={2} key={"plusPerson" + i}>
                        <Grid item xs={12} sm={6}>
                          <TextField name="fNamePP"
                                   label="First Name"
                                   variant="outlined"
                                   required
                                   onChange={e => handleChangePlusPeople(e, i)}
                                   value={plusPerson.fNamePP}
                                   fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField name="lNamePP"
                                  label="Last Name"
                                  variant="outlined"
                                  required
                                  onChange={e => handleChangePlusPeople(e, i)}
                                  value={plusPerson.lNamePP}
                                  fullWidth />
                        </Grid>
                      </Grid>
                    );
                  })}

                  {plusPeople.length < maxInput && //maybe it can be deactivated (appear grey) not removed
                    <Grid item className="add-container">
                      <Fab className="add-container__btn" size="small" color="secondary" aria-label="add" onClick={addPlusPerson}>
                        <AddCircleOutlineRoundedIcon />
                      </Fab>
                    </Grid>
                  }

                  <Grid item>
                    <TextField name="allergies"
                             fullWidth
                             multiline
                             rows={4}
                             label="Allergies"
                             variant="outlined"
                             onChange={handleChange}
                             value={response.allergies} />
                  </Grid>

                  <Grid item className="submit-response-btn-container">
                    <Button className="submit-response-btn" fullWidth variant="contained" color="secondary" onClick={sendResponse}>
                      Submit
                    </Button>
                  </Grid>

                </Grid>
              </form>
            </Grid>
          </Grid>
          }
        </Paper>
      </div>
    </div>
  );
}

export default Home;
