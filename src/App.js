/* eslint-disable require-jsdoc */
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Channels from './Channels';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [mode, changeMode] = useState('3x3');

  const toggle = () => setIsOpen(!isOpen);
  const edit = () => setEditing(!isEditing);

  return (
    <div className="main-container">
      <Navbar color="black" dark expand="md">
        <NavbarBrand href="#">Watch All</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="#" active={mode === '2x2'} onClick={()=>changeMode('2x2')}>2x2</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" active={mode === '3x3'} onClick={()=>changeMode('3x3')}>3x3</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" active={isEditing} onClick={edit}>編輯影片網址 Edit Video Links</NavLink>
            </NavItem>
            <NavbarText>
              - 移動滑鼠播放聲音 Move your mouse over video to play the sound
            </NavbarText>
          </Nav>
          <Nav navbar>
            <NavItem>
              <NavLink href="https://github.com/chunyenHuang/watch-all" target="_blank">Github</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div className="channels-container">
        <div className="channels-container-box">
          <Channels mode={mode} isEditing={isEditing}/>
        </div>
      </div>
    </div>);
};

export default App;
