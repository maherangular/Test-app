import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Form from './components/Form';

class App extends Component {
  state = {  
    fields: {}
  };

  onChange = updatedValue => {   // get the updated values from the Form .
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    });
  };

  render() {
    return (
      <MuiThemeProvider>
          <div className="App">
             <AppBar title="Contact Form" />
             <Form onChange={fields => this.onChange(fields)} />
          </div>
     </MuiThemeProvider>
    
    );
  }
}

export default App;
