import React, { PureComponent } from 'react';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';
export default class Preview extends PureComponent {
  state = {
    canvasLoaded: false,
    previewImage: 'static/preview.png'
  };

  static defaultProps = {
    message: ''
  };

  initCanvas = () => {
    const message = this.props.message || '';
    const canvas = document.getElementById('preview-canvas');
    const image = new Image(1044, 220);
    image.src = '/static/preview.png';

    const canvasContext = canvas.getContext('2d');
    const deviceHeight = window.innerHeight;
    const deviceWidth = window.innerWidth;
    const canvasWidth = Math.min(1044, deviceWidth);
    const canvasHeight = Math.min(220, deviceHeight - 40);

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvasContext.lineWidth = 5;
    canvasContext.font = '23.3px monospace';
    canvasContext.fillStyle = 'white';
    canvasContext.textAlign = 'left';
    canvasContext.lineJoin = 'round';
    canvasContext.lineJoin = 'round';

    const startX = 68;
    const startY = 75;
    const lines = message.replace(/<(?:.|\n)*?>/gm, '').split('\n');
    image.onload = () => {
      canvasContext.drawImage(image, 0, 0);
      let currentY = startY;
      lines.forEach(line => {
        canvasContext.fillText(line, startX, currentY);
        currentY += 34;
      });
    };
  };

  componentDidMount() {
    this.initCanvas();
  }

  render() {
    return (
      <Modal open={true} basic size='large'>
        <Header icon='eye' content='Message Preview' />
        <Modal.Content>
          <canvas id='preview-canvas' />
        </Modal.Content>
        <Modal.Actions>
          <Button primary inverted type='button' onClick={this.props.close}>
            <Icon name='checkmark' /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
