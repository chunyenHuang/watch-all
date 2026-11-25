/* eslint-disable require-jsdoc */
import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip,
} from 'reactstrap';
import {
  FaThLarge,
  FaTh,
  FaGithub,
  FaQuestionCircle,
  FaYoutube,
  FaVolumeUp,
  FaVolumeMute,
  FaVoteYea,
} from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Channels from './Channels';
import Channel from './Channel';
import CatalogPanel from './CatalogPanel';
import {
  builtinItems,
  defaultGridUrls,
  loadCustomItems,
  saveCustomItems,
} from './electionCatalog';

const CHANNELS_KEY = 'channels';

const readJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '');
  } catch (ignored) {
    return null;
  }
};

const loadChannelUrls = () => {
  const saved = readJson(CHANNELS_KEY);
  if (Array.isArray(saved)) {
    return saved.map((url) => (typeof url === 'string' ? url : ''));
  }
  const lists = readJson('list');
  const index = Number(localStorage.getItem('listIndex') || 0);
  if (Array.isArray(lists) && lists[index] && Array.isArray(lists[index].channels)) {
    return lists[index].channels.map((url) => (typeof url === 'string' ? url : ''));
  }
  const defaults = defaultGridUrls();
  localStorage.setItem(CHANNELS_KEY, JSON.stringify(defaults));
  return defaults;
};

const defaultMode = localStorage.getItem('mode') || '3x3';
let currentChannels = loadChannelUrls().map((url, index) => new Channel(url, index));

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, changeMode] = useState(defaultMode);
  const [placedUrls, setPlacedUrls] = useState(() => currentChannels.map((channel) => channel.url));
  const [isMuted, toggleMute] = useState(false);
  const [showControls, setShowControls] = useState(
    () => localStorage.getItem('youtubeControls') === '1',
  );
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [customItems, setCustomItems] = useState(loadCustomItems);
  const [failedUrls, setFailedUrls] = useState({});
  const catalogItems = builtinItems.concat(customItems).sort((a, b) => (
    a.name.localeCompare(b.name, 'zh-Hant')
  ));

  const toggle = () => setIsOpen(!isOpen);

  const selectMode = (inMode) => {
    changeMode(inMode);
    localStorage.setItem('mode', inMode);
  };

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 77) { // M
        toggleMute(!isMuted);
      }
    }, false);
  });

  const reportPlayback = (url, ok) => {
    if (!url) return;
    setFailedUrls((previous) => {
      if (Boolean(previous[url]) === !ok) return previous;
      const next = { ...previous };
      if (ok) delete next[url];
      else next[url] = true;
      return next;
    });
  };

  const openCatalog = (event) => {
    event.preventDefault();
    setCatalogOpen(true);
  };

  const addCatalogItem = ({ name, url }) => {
    const nextItems = customItems.concat({
      id: `custom-${Date.now()}`,
      name,
      url,
      notes: '',
      streamType: 'custom',
      custom: true,
      available: true,
    });
    setCustomItems(nextItems);
    saveCustomItems(nextItems);
  };

  const removeCatalogItem = (id) => {
    const nextItems = customItems.filter((item) => item.id !== id);
    setCustomItems(nextItems);
    saveCustomItems(nextItems);
  };

  const commitChannels = () => {
    if (mode !== '3x3') selectMode('3x3');
    const urls = currentChannels.map((channel) => channel.url);
    localStorage.setItem(CHANNELS_KEY, JSON.stringify(urls));
    setPlacedUrls(urls);
  };

  const placeAt = (item, index) => {
    if (!item || !item.url) return;
    while (currentChannels.length <= index) {
      currentChannels.push(new Channel('', currentChannels.length));
    }
    currentChannels[index].update(item.url);
    commitChannels();
  };

  const autoPlace = () => {
    const chosen = catalogItems.filter((item) => (
      item.available && item.url && !failedUrls[item.url]
    )).slice(0, 9);
    if (!chosen.length) return;
    currentChannels = Array.from({ length: 9 }, (_, index) => (
      new Channel(chosen[index] ? chosen[index].url : '', index)
    ));
    commitChannels();
  };

  return (
    <div className="main-container">
      <Navbar color="black" dark expand="md">
        <NavbarBrand href="#">
          <img
            className="brand-logo"
            src={`${import.meta.env.BASE_URL}logo512.png`}
            alt=""
          />
          都看看
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
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
              <NavLink href="#" active={catalogOpen} onClick={openCatalog}>
                <FaVoteYea />
                2026 九合一
              </NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem>
              <NavLink
                href="#"
                id="youtube-controls"
                className={showControls ? 'control-toggle is-on' : 'control-toggle'}
                active={showControls}
                aria-label={showControls ? 'YouTube 控制已開啟' : 'YouTube 控制已關閉'}
                onClick={(event) => {
                  event.preventDefault();
                  setShowControls((current) => {
                    const next = !current;
                    localStorage.setItem('youtubeControls', next ? '1' : '0');
                    return next;
                  });
                }}
              >
                <FaYoutube />
                {showControls ? '控制開' : '控制關'}
              </NavLink>
              <UncontrolledTooltip
                key={showControls ? 'controls-on' : 'controls-off'}
                placement="bottom"
                target="youtube-controls"
              >
                {showControls ?
                  '控制已打開。每支影片上會出現暫停、進度與全螢幕。再點一次就關掉，影片會繼續播、不能暫停。' :
                  '控制已關閉，影片會一直播放，不能暫停。點一下才會在每支影片上顯示暫停、進度與全螢幕。'}
              </UncontrolledTooltip>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                id="volume-toggle"
                active={isMuted}
                aria-label={isMuted ? '目前靜音' : '目前有聲音'}
                onClick={(event) => {
                  event.preventDefault();
                  toggleMute(!isMuted);
                }}
              >
                {isMuted?
                  <FaVolumeMute className="blink"/>:<FaVolumeUp />
                }
              </NavLink>
              <UncontrolledTooltip
                key={isMuted ? 'muted' : 'unmuted'}
                placement="bottom"
                target="volume-toggle"
              >
                {isMuted ?
                  '目前全部靜音。點一下恢復聲音。滑鼠移到某一格，也可以只聽那格。' :
                  '點一下讓全部影片靜音。滑鼠移到某一格，會播放那格的聲音。'}
              </UncontrolledTooltip>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                id="sound-help"
                aria-label="移動滑鼠播放聲音 Move your mouse over video to play the sound"
                onClick={(event) => event.preventDefault()}
              >
                <FaQuestionCircle />
              </NavLink>
              <UncontrolledTooltip placement="bottom" target="sound-help">
                移動滑鼠播放聲音 Move your mouse over video to play the sound
              </UncontrolledTooltip>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/chunyenHuang/watch-all" target="_blank">
                <FaGithub />
                Github
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <CatalogPanel
        isOpen={catalogOpen}
        toggle={() => setCatalogOpen(false)}
        items={catalogItems}
        channelUrls={placedUrls}
        failedUrls={failedUrls}
        onPlace={placeAt}
        onAutoPlace={autoPlace}
        onAdd={addCatalogItem}
        onRemove={removeCatalogItem}
      />
      <div className="channels-container">
        <div className="channels-container-box">
          <Channels
            mode={mode}
            channels={currentChannels}
            mute={isMuted}
            showControls={showControls}
            onPlayback={reportPlayback}
          />
        </div>
      </div>
    </div>);
};

export default App;
