import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import "p5/lib/addons/p5.sound";

declare var Schroedinger: any;

const CANVAS_WIDTH = 1500//1920;
const CANVAS_HEIGHT = 800//1080;
const FRAME_RATE = 20;

let settings = {
  size: 1024,
  energy: 3E+4,
  median: 0.2,
  sigma: 0.05,
  timeStep: 2.5E-6,
  stepsPerFrame: 8,
  maxFrames: 2000,
  // potential: x => 2E+4 * Math.pow((4 * x - 1), 2),
  potential: (x) => {
    if (x >= 0 && x <= .75) {
      return -1
    }else if(.75 <= x && x <= 1) {
      return 5*Math.pow(10,4)
    
    }else {
      return Infinity
    }

  },
  label: 'Double Well',
  momentumZoom: 4,
  scaleFactor: 1,
  underlay: null,
  dataFile: 'doubleWell',
  imageFile: null
};

let quantumParticle;

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})


export class PropertiesComponent implements OnInit {
  private p5: p5;
  constructor() { }

  ngOnInit() {

    this.createCanvas();

  }
  private createCanvas = () => {
    console.log('creating canvas');
    this.p5 = new p5(this.drawing);
  }

  private drawing = function (s: any) {
    s.setup = () => {
      s.frameRate(FRAME_RATE);
      s.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      settings.underlay = s.createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
      s.background(0);
      quantumParticle = new Schroedinger(settings, s);
    };
    s.draw = () => {
      quantumParticle.simulationStep();
    };
  }
}
