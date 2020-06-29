import React, { Component } from 'react';
import p5 from 'p5';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  onMove = ({ xOffset, yOffset }) => {
    console.log(xOffset, yOffset);
  }

  Sketch = p => {
    let previousPoint = { xOffset: null, yOffset: null };

    p.setup = () => {
      const canvasDiv = document.getElementById('main-canvas');
      const width = canvasDiv.offsetWidth;
      const heigth = canvasDiv.offsetHeight;
      p.createCanvas(width, heigth);
      p.background(255);
    }

    p.draw = () => {
      const { mouseX, mouseY } = p;
      const { xOffset, yOffset } = previousPoint;

      if (p.mouseIsPressed) {

        if (xOffset != null && yOffset != null) {
          p.line(xOffset, yOffset, mouseX, mouseY);
        }

        previousPoint.xOffset = mouseX;
        previousPoint.yOffset = mouseY;

        if (xOffset !== mouseX && yOffset !== mouseY)
          this.onMove(previousPoint);
      }
    }

    p.windowResized = () => {
      const canvasDiv = document.getElementById('main-canvas');
      const width = canvasDiv.offsetWidth;
      const heigth = canvasDiv.offsetHeight;
      p.resizeCanvas(width, heigth);
      p.background(255);
    }

    p.mouseReleased = () => {
      previousPoint = { xOffset: null, yOffset: null };
    }
  }

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return (
      <div ref={this.myRef}>

      </div>
    );
  }
}


export default Canvas;