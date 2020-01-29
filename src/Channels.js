/* eslint-disable require-jsdoc */
import React from 'react';
import ReactPlayer from 'react-player';
import {
  Container,
  Row,
  Col,
  InputGroup,
  Input,
} from 'reactstrap';

import './Channels.css';

const defaultChannels = [
  'https://www.youtube.com/watch?v=RaIJ767Bj_M', // 東森
  'https://www.youtube.com/watch?v=Hu1FkdAOws0', // TVBS
  'https://www.youtube.com/watch?v=wUPPkSANpyo', // 中天
  // 'https://www.youtube.com/watch?v=NbjI0cARzjQ', // 台視 not available
  'https://www.youtube.com/watch?v=94wGQ2EFR98', // 中視
  'https://www.youtube.com/watch?v=TL8mmew3jb8', // 華視
  'https://www.youtube.com/watch?v=XxJKnDLYZz4', // 民視
  'https://www.youtube.com/watch?v=4ZVUmEUFwaY', // 三立
  'https://www.youtube.com/watch?v=MIQ_BlHmpgY', // 東森財經
  'https://www.youtube.com/watch?v=9Auq9mYxFEE', // Sky News
];

class Channel {
  constructor(url, index) {
    this.id = index;
    this.url = url;

    this.isMuted = true;
  }

  update(url) {
    this.url = url;

    const cache = JSON.parse(localStorage.getItem('channels') || '{}');
    cache[this.id] = this.url;
    localStorage.setItem('channels', JSON.stringify(cache));
  }

  mute() {
    this.isMuted = true;
  }

  unMute() {
    this.isMuted = false;
  }
}

let selectedChannelId;
export default class Channels extends React.Component {
  state = {
    selectedChannelId: null,
    channels: [],
  }
  componentDidMount() {
    let channels = defaultChannels;
    let cache = localStorage.getItem('channels');
    if (cache) {
      cache = JSON.parse(cache);
      channels = Object.keys(cache).map((key) => cache[key]);
    } else {
      cache = {};
      defaultChannels.forEach((url, index) => {
        cache[index] = url;
      });
      localStorage.setItem('channels', JSON.stringify(cache));
    }
    this.setState({
      channels: channels.map((url, index) => new Channel(url, index)),
    });
  }

  render() {
    const { mode, isEditing } = this.props;

    let multiStyle;
    let columns;
    switch (mode) {
    case '3x3':
      columns = 3;
      multiStyle = 'multi3x3';
      break;
    case '2x2':
    default:
      columns = 2;
      multiStyle = 'multi2x2';
    }

    return (
      <Container className="channels-main">
        <Row className={multiStyle} stylee={{}}>
          {this.state.channels
            .map((channel, index)=>(
              <Col
                sm={12 / columns}
                key={index}
                onMouseEnter={()=>{
                  selectedChannelId = channel.id;
                  this.state.channels.forEach((x)=>{
                    if (x.id === selectedChannelId) {
                      x.unMute();
                    } else {
                      x.mute();
                    }
                  });
                  this.setState({ selectedChannelId });
                }}
                // onMouseLeave={()=>{
                //   selectedChannelId = channel.id;
                //   channel.mute();
                //   this.setState({ selectedChannelId });
                // }}
              >
                {isEditing &&
                  <div className="edit-container">
                    <InputGroup>
                      <Input
                        placeholder="YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion"
                        value={channel.url}
                        onChange={(event)=>{
                          channel.update(event.target.value);
                          this.setState({});
                        }}
                      />
                    </InputGroup>
                  </div>}
                <div className="video-wrapper">
                  <ReactPlayer
                    className="react-player"
                    url={channel.url}
                    volume={1}
                    muted={channel.isMuted}
                    playing={true}
                    width='100%'
                    height='100%'
                  />
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    );
  }
}
