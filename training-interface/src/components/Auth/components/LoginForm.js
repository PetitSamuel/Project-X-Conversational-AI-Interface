import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import '../../../App.css';
import logo from '../../../logos/logo.png';
import Jump from 'react-reveal/Jump';

class LoginForm extends Component {
 
  render () {
    
    return (
  
          <Form className="login" onSubmit={this.props.onSubmit}>
            <div className = "form-group">
            <Jump>
              <img src = {logo} alt = "logo" className="logo"/>
            </Jump>
              <h6>Hit submit to reroute.</h6>
              <input type="username" required className="form-control" 
              name="username"
              placeholder="Username" 
              value={this.props.username}
              onChange={this.props.onChange}/>
            </div>
            <div>
              <input type="password" className="form-control" id="lol"
                name="password"
                placeholder="Password"
                value={this.props.password}
                onChange={this.props.onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Log In</button>
          </Form>

    )
  }
}

export default LoginForm;