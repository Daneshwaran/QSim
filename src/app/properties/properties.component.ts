import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import "p5/lib/addons/p5.sound";
// import "p5/lib/addons/p5.dom";
declare var Schroedinger: any;

const CANVAS_WIDTH = 900//1920;
const CANVAS_HEIGHT = 600//1080;
const FRAME_RATE = 20;
var width = CANVAS_WIDTH

let settings = {
  size: 1024,
  energy: 3E+4,
  median: 0.5,
  sigma: 0.01,
  timeStep: 1E-6,
  stepsPerFrame: 20,
  maxFrames: 1000,
  potential: x => 2E+4 * Math.pow((4 * x - 1)*(4*x-3), 2),
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
  private p5;
  constructor() { }

  ngOnInit() {

  //   const sketch = (s) => {

  //     s.preload = () => {
  //       // preload code
  //     }

  //     s.setup = () => {
  //       s.frameRate(FRAME_RATE);
  //       s.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  //      settings.underlay = s.createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
  //       s.background(0);
  //       quantumParticle = new Schroedinger(settings);
  //     };
  //     s.draw = () => {
  //       s.background(255);
  //       //s.rect(100, 100, 100, 100);
  //      // var width = CANVAS_WIDTH;
  //       quantumParticle.simulationStep();
  //     };
  //   }
  //  let canvas = new p5(sketch);
  this.createCanvas();

  }
  private createCanvas = () => {
    console.log('creating canvas');
    this.p5 = new p5(this.drawing);
  }

  private destroyCanvas = () => {
    console.log('destroying canvas');
    this.p5.noCanvas();
  }
  private drawing = function (s: any) {

    s.setup = () => {
      s.frameRate(FRAME_RATE);
      s.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
     settings.underlay = s.createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
      s.background(0);
     quantumParticle = new Schroedinger(settings,s);
    };
    s.draw = () => {
      s.background(255);
      s.rect(100, 100, 100, 100);
     // var width = CANVAS_WIDTH;
     quantumParticle.simulationStep();
    };

  }

  public test() {
    //alert("hh")
   
  }
  public draw() {
    // quantumParticle.simulationStep();
  }

  
}
