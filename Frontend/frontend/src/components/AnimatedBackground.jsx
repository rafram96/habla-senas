import React from "react";
import Sketch from "react-p5";
import chroma from "chroma-js";

// Constantes del efecto original
const NUM_LINE_RECTS = 16;
const TIME_MOD = 0.00005;
const TIME_COLOR_MOD = 0.00015;
const RECT_ROT_RADIUS = 0.3;
const TIME_SCALE = 0.5;
const FRAME_OFFSET = Math.random() * 10000;

let linesShader;
let shapeAnimator;
let colorScheme = chroma.scale(['#da3843', '#e4bb33', '#16d951', '#34beec', '#2635d9', '#020208', '#9846df', '#e9ec42', '#da3843']);

class LinesShape {
  constructor(parameters) {
    for (let [key, value] of Object.entries(parameters)) {
      this[key] = value;
    }
  }

  draw() {
    if (this.position == null || this.angle == null || this.radius == null || linesShader == null) return;
  }
}

class LinesRect extends LinesShape {
  constructor(parameters, p5) {
    super(parameters);
    this.p5 = p5;
    this.timeOffset = 1000 * Math.random();
  }

  draw() {
    super.draw();
    if (!linesShader) return;

    linesShader.setUniform('uAngle', this.angle);
    linesShader.setUniform('uLineWidth', this.linesWidth);
    linesShader.setUniform('uLineScale', this.linesScale);
    linesShader.setUniform('uRgb0', this.rgb0);
    linesShader.setUniform('uRgb1', this.rgb1);
    linesShader.setUniform('uCenter', this.center);
    linesShader.setUniform('uTime', this.p5.frameCount * 0.02 * TIME_SCALE + this.timeOffset);
    
    this.p5.shader(linesShader);
    this.p5.rect(-this.p5.width/2, -this.p5.height/2, this.p5.width, this.p5.height);
  }
}

class LinesShapeAnimator {
  constructor(p5, parameters) {
    this.p5 = p5;
    if (parameters != null) {
      for (let [key, value] of Object.entries(parameters)) {
        this[key] = value;
      }
    }
    this.init();
  }

  init() {
    this.linesRects = [];
    this.linesCircles = [];
    const dim = Math.max(this.p5.width, this.p5.height);
    const linesScale = Math.floor(this.p5.map(dim, 300, 2500, 4, 20));
    
    for (let i = 0; i < NUM_LINE_RECTS; i++) {
      this.linesRects.push(new LinesRect({
        linesWidth: -0.9,
        linesScale: linesScale,
      }, this.p5));
    }
  }

  animate() {
    for (let i = 0; i < this.linesRects.length; i++) {
      const linesRect = this.linesRects[i];
      let angleOffset = Math.floor(i - this.linesRects.length * 0.5 + 1);
      angleOffset -= (angleOffset <= 0 ? 1 : 0);
      const a = i * 2 * Math.PI / this.linesRects.length;
      linesRect.angle = a + (this.p5.frameCount * TIME_SCALE + this.p5.mouseX + FRAME_OFFSET) * TIME_MOD * angleOffset;
      const t = (i / this.linesRects.length + (this.p5.frameCount * TIME_SCALE + this.p5.mouseY - this.p5.mouseX) * TIME_COLOR_MOD + FRAME_OFFSET) % 1;
      const color0 = colorScheme(t).saturate().darken(2).rgb();
      linesRect.rgb0 = [color0[0] / 255, color0[1] / 255, color0[2] / 255];
      linesRect.rgb1 = [0, 0, 0];

      const x = 0.4 + RECT_ROT_RADIUS * Math.cos(t * 2 * Math.PI);
      const y = 0.3 + RECT_ROT_RADIUS * Math.sin(t * 2 * Math.PI);
      linesRect.center = [x, y];
    }
  }

  draw() {
    for (let linesRect of this.linesRects) {
      linesRect.draw();
    }
  }
}

export default function AnimatedBackground() {
  const preload = (p5) => {
    linesShader = p5.loadShader("/lines.vert", "/lines.frag");
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(canvasParentRef);
    p5.blendMode(p5.ADD);
    shapeAnimator = new LinesShapeAnimator(p5);
    p5.noCursor();
  };

  const draw = (p5) => {
    p5.background(0);
    if (linesShader) {
      linesShader.setUniform('uAspectRatio', p5.windowHeight / p5.windowWidth);
    }
    if (shapeAnimator) {
      shapeAnimator.animate();
      shapeAnimator.draw();
    }
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    if (shapeAnimator) {
      shapeAnimator.init();
    }
  };

  return (
    <div style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%", 
      height: "100%", 
      zIndex: -1 
    }}>
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        windowResized={windowResized}
      />
    </div>
  );
}