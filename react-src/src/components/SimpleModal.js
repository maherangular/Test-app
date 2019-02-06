import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import RaisedButton from 'material-ui/RaisedButton';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() { // function to animate the modal
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({ 
  paper: {  // styles for the modal
    position: 'absolute',
    width: theme.spacing.unit * 30,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },

  b: { // style for the button
    float: 'right'
  }
});

class SimpleModal extends React.Component {


  handleClose = () => {
// Output data from the child component to the parent component  (Simplemodal ==> form) .
    this.props.onChangeopen();

  };

  render() {
    const { classes } = this.props;

    return (
      <div hidden={true}>
       
        <Modal
               aria-labelledby="simple-modal-title"
               aria-describedby="simple-modal-description"
               open={this.props.open || false}
               onClose={this.handleClose}
          >
               <div style={getModalStyle()} className={classes.paper}>
               
                 <Typography variant="h6" id="modal-title">
                   {this.props.msg}
                 </Typography>
                
                      <RaisedButton className={classes.b}onClick={this.handleClose} primary > Close</RaisedButton>
                
                 <SimpleModalWrapped />
               </div>
         </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
