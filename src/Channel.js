/* eslint-disable require-jsdoc */

export default class Channel {
  constructor(url, index) {
    this.id = index;
    this.url = url;

    this.isMuted = true;
    this.isHovered = false;
  }

  update(url) {
    this.url = url;
  }

  mute() {
    this.isMuted = true;
  }

  unMute() {
    this.isMuted = false;
  }
}
