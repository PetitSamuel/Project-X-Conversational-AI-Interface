import React, { Component } from 'react';
import '../../App.css';
import LoginForm from './components/LoginForm';
import { Redirect } from 'react-router-dom';


class Auth extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submit: false,
      redirect: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
  }


  async handleSubmit(event) {
    this.setState({redirect: "/overview"})
    // We will have some auth happening here later, for now reroute on submit.
    this.setState({submit: true})
  }


  handleChanges(event) {
    if(event.target.name==="username"){
      this.setState({email: event.target.value});
    }
    else if(event.target.name === "password"){
      this.setState({password: event.target.value});
    }
    else{
      console.log('Trying to update:',event.target.name,'to',event.target.value);
    }
  }  


  render() {
    if (this.state.submit) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <LoginForm onChange={this.handleChanges} onSubmit={this.handleSubmit}/>
    )
  
  }
}

export default Auth;