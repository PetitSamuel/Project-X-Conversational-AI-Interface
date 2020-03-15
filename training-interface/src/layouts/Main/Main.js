import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../logos/logo2.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideNav from './components/SideNav.js'
import '../../App.css';


const Main = props => {
  const { children } = props;
      return (
        
        <div className = "container-fluid">
          <div className = "notification"> Welcome to Project X, a conversational AI training interface (in development).</div>
          <Row>
          <Col lg={2} style={{padding:'0px'}}>
            <div className = "sidebar px-0">
                <div className = "navbar">
                <nav className = "navbar-light bg-white border-bottom p-0">
                    
                <div className="d-table m-auto">
                    <span className="d-none d-md-inline ml-1" style = {{fontSize:'32px'}}>Project</span>
                    <img id="main-logo" alt="logo" className="d-inline-block align-top mr-1" style={{maxWidth : '45px' }} src={logo}/>
                    </div>
          
                </nav>
                </div>
                <SideNav/>
            </div>
          </Col>
          <Col lg = {10}>{children}></Col> 
          </Row>
          </div>

      )
    };

    Main.propTypes = {
        children: PropTypes.node
    };
  

export default Main;