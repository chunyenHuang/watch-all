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

const MOUSE_DELAY = 1000;

let selectedChannelId;
export default class Channels extends React.Component {
  state = {
    selectedChannelId: null,
    channels: [],
  }
  componentDidMount() {}

  setChannelsSound(channel) {
    selectedChannelId = channel.id;
    this.props.channels.forEach((x) => {
      if (x.id === selectedChannelId) {
        x.unMute();
      } else {
        x.mute();
      }
    });
    this.setState({ selectedChannelId });
  }

  updateParentChannels() {
    if (this.props.onChannelsUpdate) {
      this.props.onChannelsUpdate(this.props.channels.map((x) => x.url));
    }
  }

  render() {
    const { mode, isEditing, channels } = this.props;

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
          {channels
            .map((channel, index)=>(
              <Col
                sm={12 / columns}
                key={index}
                onMouseEnter={()=>{
                  channel.isHovered = true;
                  if (!selectedChannelId) {
                    this.setChannelsSound(channel);
                  } else {
                    setTimeout(() => {
                      if (channel.isHovered) {
                        this.setChannelsSound(channel);
                      }
                    }, MOUSE_DELAY);
                  }
                }}
                onMouseLeave={()=>{
                  channel.isHovered = false;
                }}
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
                          this.updateParentChannels();
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
                    controls={true}
                    loop={true}
                  />
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    );
  }
}
