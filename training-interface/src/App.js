import React, { Component } from 'react';
import logo from './logo2.png';
import { MdChatBubbleOutline } from "react-icons/md";
import {FaTools} from 'react-icons/fa';
import {IoMdAnalytics} from 'react-icons/io';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
            route: 1,
      };
    }
   
    render () {
      
      return (
        
        <div class = "container-fluid">
          <div className = "notification"> Welcome to Project X, TEST, a conversational AI training interface (in development).</div>
          <aside class = "sidebar col-md-2 col-lg-2 px-0">
            <div class = "navbar">
              <nav class = "navbar-light bg-white border-bottom p-0">
                <a class="navbar-brand w-100 mr-0" href="#" style={{lineHeight: '32px'}}>
                <div class="d-table m-auto">
                  <span class="d-none d-md-inline ml-1" style = {{fontSize:'32px'}}>Project</span>
                  <img id="main-logo" class="d-inline-block align-top mr-1" style={{maxWidth : '45px' }} src={logo}/>
                </div>
                </a>
              </nav>
            </div>

            <div class="nav-wrapper">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class={this.state.route == 1 ? 'nav-link active': 'nav-link'}  onClick={(e) => this.setState({route:1})}>
                  <h5><MdChatBubbleOutline /> Assistants</h5>
                </a>
              </li>
              <li class="nav-item">
                <a class={this.state.route == 2 ? 'nav-link active': 'nav-link'}  onClick={(e) => this.setState({route:2})}>
                  <h5><FaTools /> Tools</h5>
                </a>
              </li>
              <li class="nav-item">
                <a class={this.state.route == 3 ? 'nav-link active': 'nav-link'}  onClick={(e) => this.setState({route:3})}>
                  <h5><IoMdAnalytics /> Analytics</h5>
                </a>
              </li>
            </ul>
          </div>
          </aside> 
          <div class = "container-fluid">
         
          </div>
        

      )
    }
  }

export default App;
