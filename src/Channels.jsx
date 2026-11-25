/* eslint-disable require-jsdoc */
import React from 'react';
import ReactPlayerImport from 'react-player';

import './Channels.css';

// react-player 2 is CommonJS. Vite's interop sometimes exposes the module
// object instead of the component, so accept either shape.
const ReactPlayer = typeof ReactPlayerImport === 'function' ?
  ReactPlayerImport :
  ReactPlayerImport.default;

const MOUSE_DELAY = 1000;

let selectedChannelId;
export default class Channels extends React.Component {
  state = {
    selectedChannelId: null,
    channels: [],
  };
  componentDidMount() {}

  setChannelsSound(channel = {}) {
    const { channels } = this.props;

    selectedChannelId = channel.id;

    channels.forEach((x) => {
      if (x.id === selectedChannelId) {
        x.unMute();
      } else {
        x.mute();
      }
    });
    this.setState({ selectedChannelId });
  }

  render() {
    const { mode, channels, mute, showControls, onPlayback } = this.props;

    const columns = mode === '3x3' ? 3 : 2;
    const rows = mode === '3x3' ? 3 : 2;
    const visibleChannels = channels.slice(0, columns * rows);

    const renderCell = (channel, index) => {
      const onMouseEnter = () => {
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
      };
      const onMouseLeave = () => {
        channel.isHovered = false;
      };
      return (
        <div
          className="channel-cell"
          key={index}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="video-wrapper">
            <ReactPlayer
              key={`${channel.id}:${channel.url}:${showControls ? 'controls' : 'plain'}`}
              className="react-player"
              url={channel.url}
              volume={1}
              muted={mute || channel.isMuted} // overwrite mute option
              playing={true}
              width='100%'
              height='100%'
              controls={showControls}
              loop={true}
              config={{
                youtube: {
                  playerVars: {
                    controls: showControls ? 1 : 0,
                    disablekb: showControls ? 0 : 1,
                    fs: showControls ? 1 : 0,
                    modestbranding: 1,
                  },
                },
              }}
              onReady={() => onPlayback && onPlayback(channel.url, true)}
              onError={() => onPlayback && onPlayback(channel.url, false)}
            />
            {showControls ? null : <div className="video-shield" />}
          </div>
        </div>);
    };

    return (
      <div
        className="channels-main"
        style={{
          '--cols': columns,
          '--rows': rows,
        }}
      >
        <div className="channels-grid">
          {visibleChannels.map(renderCell)}
        </div>
      </div>
    );
  }
}
