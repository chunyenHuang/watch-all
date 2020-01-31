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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  Input,
} from 'reactstrap';
import {
  FaEdit,
  FaList,
  FaThLarge,
  FaTh,
  FaGithub,
  FaExclamationCircle,
  FaSave,
} from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Channels from './Channels';
import Channel from './Channel';
import presetList from './presetList';

const defaultMode = localStorage.getItem('mode') || '3x3';
const cacheList = localStorage.getItem('list');
const defaultList = cacheList ? JSON.parse(cacheList) : presetList;
const defaultListIndex = localStorage.getItem('listIndex') || 0;

let currentChannels = defaultList[defaultListIndex].channels.map((url, index) => new Channel(url, index));

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [mode, changeMode] = useState(defaultMode);
  const [list, updateList] = useState(defaultList);
  const [currentListIndex, changeCurrentList] = useState(defaultListIndex);
  const [showSaveModal, setSaveModal] = useState(false);
  const [newListTitle, setNewListTitle] = useState(defaultList[defaultListIndex].title);

  const toggle = () => setIsOpen(!isOpen);
  const edit = () => {
    if (isEditing) {
      toggleSaveModal();
    }
    setEditing(!isEditing);
  };

  const selectMode = (inMode) => {
    changeMode(inMode);
    localStorage.setItem('mode', inMode);
  };
  const selectListItem = (index) => {
    changeCurrentList(index);
    setNewListTitle(list[index].title);
    localStorage.setItem('listIndex', index);

    currentChannels = list[index].channels.map((url, index) => new Channel(url, index));
  };

  const toggleSaveModal = () => {
    setSaveModal(!showSaveModal);
  };

  const saveList = (asNew = true) => {
    toggleSaveModal();

    if (asNew) {
      const newList = {
        title: newListTitle,
        channels: currentChannels.map((i) => i.url),
      };
      setNewListTitle('');

      list.push(newList);
    } else {
      list[currentListIndex].title = newListTitle;
      list[currentListIndex].channels = currentChannels.map((i) => i.url);
    }

    updateList(list);
    localStorage.setItem('list', JSON.stringify(list));

    if (asNew) {
      selectListItem(list.length - 1);
    }
  };

  return (
    <div className="main-container">
      <Modal isOpen={showSaveModal} autoFocus>
        <ModalHeader toggle={toggleSaveModal}>儲存 Save & Update</ModalHeader>
        <ModalBody>
          <InputGroup>
            <Input placeholder="Title..." autoFocus value={newListTitle} onChange={(event)=>setNewListTitle(event.target.value)}/>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleSaveModal}>Cancel</Button>
          <Button color="primary" disabled={newListTitle.length < 1} onClick={()=>saveList(true)}>Save As New</Button>
          <Button color="primary" disabled={newListTitle.length < 1} onClick={()=>saveList(false)}>Update</Button>
        </ModalFooter>
      </Modal>

      <Navbar color="black" dark expand="md">
        <NavbarBrand href="#">Watch All</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="#" active={mode === '2x2'} onClick={()=>selectMode('2x2')}>
                <FaThLarge />
                2x2
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" active={mode === '3x3'} onClick={()=>selectMode('3x3')}>
                <FaTh />
                3x3
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" active={isEditing} onClick={edit}>
                {!isEditing?
                  <><FaEdit />編輯 Edit</>
                  :
                  <><FaSave />儲存 Save</>
                }
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href="#" onClick={toggleSaveModal}>
                <FaSave />
                儲存 Save
              </NavLink>
            </NavItem> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <FaList />
                {list[currentListIndex].title}
              </DropdownToggle>
              <DropdownMenu right>
                {list.map((item, index)=>(
                  <DropdownItem
                    key={index}
                    onClick={()=>selectListItem(index)}>
                    {item.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            <NavbarText>
              <FaExclamationCircle />
              移動滑鼠播放聲音 Move your mouse over video to play the sound
            </NavbarText>
            <NavItem>
              <NavLink href="https://github.com/chunyenHuang/watch-all" target="_blank">
                <FaGithub />
                Github
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div className="channels-container">
        <div className="channels-container-box">
          <Channels
            mode={mode}
            isEditing={isEditing}
            channels={currentChannels}
          />
        </div>
      </div>
    </div>);
};

export default App;
