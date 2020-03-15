import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import { MdDashboard } from "react-icons/md";
import { MdChatBubbleOutline } from "react-icons/md";
import {FaTools} from 'react-icons/fa';
import {FaRobot} from 'react-icons/fa';
import {IoMdAnalytics} from 'react-icons/io';
//Lol needs fixed
import '../../../App.css';

class SideNav extends Component {
    

render () {

  return (
    <div className="nav-wrapper">
    <ul className="nav flex-column">
      <li className="nav-item">
          <NavLink to="/overview" activeClassName="nav-link active" className = "nav-link"><h5><MdDashboard /> Overview</h5></NavLink>
      </li>
      <li className="nav-item">
          <NavLink to="/assistants" activeClassName="nav-link active" className = "nav-link"><h5><FaRobot /> Assistants</h5></NavLink>
      </li>
      <li className="nav-item">
          <NavLink to="/tools" activeClassName="nav-link active" className = "nav-link"><h5><FaTools /> Tools</h5></NavLink>
      </li>
      <li className="nav-item">
          <NavLink to="/dialogs" activeClassName="nav-link active" className = "nav-link"><h5><MdChatBubbleOutline /> Dialogs</h5></NavLink>     
      </li>
      <li className="nav-item">
          <NavLink to="/analytics" activeClassName="nav-link active" className = "nav-link"><h5><IoMdAnalytics /> Analytics</h5></NavLink>     
      </li>
      </ul>
      </div>
  );
};

}

export default SideNav;