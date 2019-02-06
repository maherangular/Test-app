import React, { Component  } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {addFeedbackPost} from '../services/Feedback_services' ;
import Slider from '@material-ui/lab/Slider';
import SimpleModal from './SimpleModal';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// deaclare some styles
const styles = theme => ({
  slider: {
    margin: 'auto' ,
    width: '200px',
    padding: '22px 0px', 
} ,
container: {
   margin: '0 auto' ,
   display: 'table',

},
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});
class Form extends Component {

  state = {    // declaring states 
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    phone: "",
    phoneError: "",
    email: "",
    emailError: "",
    Feedback: "",
    FeedbackError: "" ,
    value: 5 ,
    open: false , 
    msg: ""
  };


  handleLchangeopen = () => {   // change the state open to false
    this.setState({open: false});
}

// to open the modal and send the msg 
  handleOpen = (msg) => {
    this.setState({ open: true , msg:msg});
  };
   
  change = e => {  // change the states 
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
   
  };

  handleChange = (event, value) => { // change the state value of the Slider
    this.setState({ value: value });
  
  };
// to validate the form
  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: "",
      lastNameError: "",
      FeedbackError: "",
      emailError: "",
      phoneError: ""
    };
    
    if (this.state.phone.length <8 ) {
      isError = true;
      errors.phoneError = "* Phone must be at least 8 numbers";
    } 
    if( isNaN(this.state.phone)) {
      isError = true;
      errors.phoneError = "* Phone must be mumber ";
    }
    if (this.state.email.indexOf("@") === -1) {
      isError = true;
      errors.emailError = "* Email must contain @";
    }
    if (this.state.email.indexOf(".") === -1) {
      isError = true;
      errors.emailError =  "* Email must contain . ";
    }
    if (this.state.firstName.trim()=== '' ) {
      isError = true;
      errors.firstNameError = "* Firstname Required";
    }
 
    if (this.state.Feedback.trim()=== '' ) {
      isError = true;
      errors.FeedbackError = "* Feedback Required";
    }

    
    if (this.state.email.trim()=== '' ) {
      isError = true;
      errors.emailError = "* Email Required";
    }
    if (this.state.lastName.trim()=== '' ) {
      isError = true;
      errors.lastNameError = "* Lastname Required";
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };


  // to submit the form
  onSubmit = e => {
    e.preventDefault();
    
    const err = this.validate();
  if (!err) {
          // body to send to the server 
      const body = {
           firstname : this.state.firstName ,
           lastname : this.state.lastName ,
           email : this.state.email ,
           Feedback : this.state.Feedback ,
           phone : this.state.phone ,
           rating: this.state.value
           }

                  // POST to the server
            addFeedbackPost(body).then(res => {res.json()// catching a promise
             .then(data => {      
                if(data.success){
             this.handleOpen('Thank you for your submission'); // change state.open to true to open the modal with the msg passed in parameter.
                } else {
             this.handleOpen('Sorry your submission has not been saved');// change state.open to true to open the modal with the msg passed in parameter.
               }
             });
             }) 
            .catch(err => {console.log(err) ;this.handleOpen('Sorry Problem in the Server');});; // catching errors 


   
                  // clear form
        this.setState({
              firstName: "",
              firstNameError: "",
              lastName: "",
              lastNameError: "",
              phone: "",
              phoneError: "",
              email: "",
              emailError: "",
              Feedback: "",
              FeedbackError: "" ,
             open: false 
           });
        this.props.onChange({
              firstName: "",
              lastName: "",
              phone: "",
              email: "",
              Feedback: "",
              open : false
                  });
     }
};


  
   render() {

    const { classes } = this.props; // get the classes props .

   return (
    <div>
      
      <form theme="true"  autoComplete="off">

           <div className={classes.container}>
            <TextField
              name="firstName"
              hintText="*First name"
              floatingLabelText="*First name"
              value={this.state.firstName}
              onChange={e => this.change(e)}
              errorText={this.state.firstNameError}
              floatingLabelFixed
             
            />
            <TextField
             name="lastName"
             hintText="*Last Name"
             floatingLabelText="*Last Name"
             value={this.state.lastName}
             onChange={e => this.change(e)}
             errorText={this.state.lastNameError}
             floatingLabelFixed
           />
           </div>
           <div className={classes.container}>
             <TextField
              name="phone"
               hintText="*Phone"
               floatingLabelText="*Phone"
               value={this.state.phone}
               onChange={e => this.change(e)}
               errorText={this.state.phoneError}
               floatingLabelFixed
             />
              <TextField
               name="email"
               hintText="*Email"
               floatingLabelText="*Email"
               value={this.state.email}
               onChange={e => this.change(e)}
               errorText={this.state.emailError}
               floatingLabelFixed
              type="email"
              />
        </div>
           <TextField   className={classes.textField}
                 name="Feedback"
                 hintText="*Feedback"
                 floatingLabelText="*Feedback"
                 rowsMax={8}
                 value={this.state.Feedback}
                 onChange={e => this.change(e)}
                 errorText={this.state.FeedbackError}
                 floatingLabelFixed
                 multiline="true"
                 rows={3}
            />

         
             <br />
         <div className={classes.slider}>
           <p>Raiting</p>
            <Slider  
            value={this.state.value}
            min={0}
            max={5}
            step={1}
            onChange={this.handleChange}
             />
         
        
           </div>
           <br/>
          <RaisedButton label="Submit" onClick={e => this.onSubmit(e)} primary />
      </form>
        <SimpleModal   open={this.state.open || false} msg={this.state.msg}  onChangeopen={this.handleLchangeopen}></SimpleModal>
    </div>
      
      );
  }
}
Form.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Form);



