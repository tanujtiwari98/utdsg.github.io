import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      username : "",
      password : "",
      authenticated : false,
      value : "yes",
      title : "Login",
      dialogOpen : false,
      loginMessage : "Please log in"
      };
      this.buttonOnClick = this.buttonOnClick.bind(this);
      this.onUsernameChange = this.onUsernameChange.bind(this);
      this.onPasswordChange = this.onPasswordChange.bind(this);
      this.voteOnClick = this.voteOnClick.bind(this);
      this.onDialogClose = this.onDialogClose.bind(this);
  };
  onUsernameChange(event)
  {
    let state = this.state;
    state.username = event.target.value;
    console.log(event.target.value);
    this.setState(state);
  }
  onPasswordChange(event)
  {
    let state = this.state;
    state.password = event.target.value;
    console.log(event.target.value);
    this.setState(state);
  }
  handleChange = event => {
  let state = this.state;
  state.value = event.target.value;
   this.setState(state);
 };

  buttonOnClick() {
    let state = this.state;
    state.loading = true;
    this.setState(state);
    let url = 'https://5nzmjiuo8l.execute-api.us-east-2.amazonaws.com/beta/login?newUser=false&email=hi&' +
    'username=' + this.state.username + '&password=' + this.state.password;
    axios.post(url,
    {
        email : 'tt',
        username : 'tt',
        password : 'dd',
        newUser : 'true'
    }
)
      .then(response => {
        let state = this.state;
        state.loading = false;
        state.title = "Cast your vote";
        state.authenticated = true;
        console.log(response.data);
          if(response.data != 'Invalid')
            {
              this.setState(state);
            }
            else {
              {
                state.authenticated = false;
                state.title = "Login";
                state.loginMessage = "Invalid username or password. Please try again.";
                this.setState(state);
              }
            }
      })
      .catch(error => {
        let state = this.state;
        state.loading = false;
        state.authenticated = false;
        state.title = "Login";
        state.loginMessage = "Invalid username or password. Please try again."
      })
  }
  // renderResultPortal()
  // {
  //   return(
  //     <Table className="TableForTotalVotes">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>Vote</TableCell>
  //           <TableCell numeric>No. Of Votes</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //       <TableRow key={row.id}>
  //               <TableCell component="th" scope="row">
  //                 Yes
  //               </TableCell>
  //               <TableCell numeric>{this.state.yesVotes}</TableCell>
  //               <TableCell numeric>{this.state.noVotes}</TableCell>
  //             </TableRow>
  //             </TableBody>
  //   )
  //
  // }
  voteOnClick()
  {
    console.log(this.state);
    let url = 'https://5nzmjiuo8l.execute-api.us-east-2.amazonaws.com/beta/vote?' +
    'username=' + this.state.username + '&vote=' + this.state.value;
    console.log(url);
    axios.get(url)
      .then(response => {
        console.log("Voted");
        let state = this.state;
        state.dialogOpen = true;
        this.setState(state);
      })
  }
  onDialogClose()
  {
    let state = this.state;
    state.dialogOpen = false;
    this.setState(state);
  }
  renderWhenLoggedIn()
  {
    return (
      <div>
      <FormControl component="fieldset" className="fieldset">
          <FormLabel component="legend">Cast Your Vote</FormLabel>
          <RadioGroup
            aria-label="Cast your vote"
            name="vote"
            className="cast_vote"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          <Button id = "voteButton" onClick = {this.voteOnClick} >
          Vote
          </Button>
        </FormControl>
          <Dialog open = {this.state.dialogOpen} aria-labelledby="simple-dialog-title">
          <DialogContent>
         <DialogContentText>
          Successfuly Voted!
         </DialogContentText>
       </DialogContent>
       <DialogActions>
           <Button onClick={this.onDialogClose} color="primary">
             OK
           </Button>
           </DialogActions>
            </Dialog>
</div>
    );
  }
  render() {
    const arrComponents = [];

    return (
      <div className="App">
<body>
  <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="title" position = "center" color="inherit">
            {this.state.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper className="LoginModal" elevation={2}>
      <br />
      {!this.state.authenticated ?
        <div>
      <Typography variant="headline" component="h1">
        {this.state.loginMessage}
      </Typography>
      <TextField
          required
          id="standard-required"
          onChange = {this.onUsernameChange}
          label="Required"
          defaultValue="Temoc"
          className="username"
          margin="normal"
        />
        <br />


      <TextField
          id="standard-password-input"
          onChange = {this.onPasswordChange}
          label="Password"
          className="PasswordIn"
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <br />
        {!this.state.loading ?

        <Button onClick = {this.buttonOnClick} >
        Login
        </Button>
      :
    <CircularProgress className="progressCircle" />
      }
      </div>
      : this.renderWhenLoggedIn()}
    </Paper>
    </body>
      </div>
    );
  }
}

export default App;
