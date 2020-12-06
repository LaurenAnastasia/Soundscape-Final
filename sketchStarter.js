// let song;
// let cols, rows;
// let scl = 18;
// const w = 950;
// const h = 600;
// let terrain = [];
// let mic;
// let fft;

// function preload() {
//   song = loadSound('Proj1_Track9.mp3');
  
// }


// function setup() {
//   let cnv = createCanvas(600, 600, WEBGL);
//   fft = new p5.FFT()
//   //cnv.mousePressed(canvasPressed);
//   mic = new p5.AudioIn();
//   mic.start();
//   fft = new p5.FFT();
//   fft.setInput(mic);
  
//   cols = w / scl;
//   rows = h / scl;
  
//    for (let x = 0; x < cols; x++) {
//     terrain[x] = [];
//     for (let y = 0; y < rows; y++) {
//       terrain[x][y] = 0;
//     }
//   }
  
// }

// function canvasPressed(){
//   song.play();
// }

// function draw() {
  
//   let spectrum = fft.analyze();
  
//   console.log(spectrum);
  
//   let yoff = 0;
//   for (let y = 0; y < rows; y++) {
//     let xoff = 0;
//     for (let x = 0; x < cols; x++) {
//       terrain[x][y] = map(noise(xoff, yoff), 0, 1, -60, 60);
//       xoff += 0.2;
//     }
//     yoff += 0.2;
//   }
  
//   background(0);
//   //translate(-w/2, -h/2);
//   stroke(255);
//   fill(255,255,255, 50);
  
//   rotateX(PI/3);
//   translate(-w/2, -h/2);
  
//   for (let y = 1; y < rows - 1; y ++) {
//     beginShape(TRIANGLE_STRIP);
//     for (let x = 0; x < cols - 1; x ++) {
//       let specMap = map(spectrum[x*y], 0, 255, 0, 10);
//       let specMapTwo = map(spectrum[x*(y+1)], 0, 255, 0, 10);
//       let zVal = specMap * terrain[x][y];
//       let zValTwo = specMapTwo * terrain[x][y+1];
//       vertex(x*scl, y*scl, zVal);
//       vertex(x*scl, (y+1)*scl, zValTwo);
  
      
      
//       //  vertex(x*scl, (y+1)*scl, terrain[x][y + 1]);
      
      
//     }
//     endShape();
//   }
  
// }

let song;
let cols, rows;
let scl = 18;
const w = 900;
const h = 600;
let terrain = [];
let mic;
let fft;

function preload() {
  song = loadSound('Proj1_Track9.mp3');
  
}


function setup() {
  let cnv = createCanvas(1600, 600, WEBGL);
  fft = new p5.FFT()
  //cnv.mousePressed(canvasPressed);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  
  cols = w / scl;
  rows = h / scl;
  
   for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
  
}

function canvasPressed(){
  song.play();
}

function draw() {

  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  // let v = createVector(locX, locY, 0);
  // v.normalize;

  directionalLight(0, 0, 255, locX, locY, 0);
  //pointLight(0, 0, 255, locX, locY, 0);
  //pointLight(0, 0, 255, 0, 1000, -3000);
  // console.log(locX, locY);
  
  let spectrum = fft.analyze();
  
  //console.log(spectrum);
  
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -60, 60);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  
  background(0);
  //translate(-w/2, -h/2);
  //fill(255, 50);
  specularMaterial(255);
  stroke(255, 50);
  
  push();
  rotateX(PI/3);
  translate(-w/2, -h/2);

  torus(5, 255);
  
  for (let y = 1; y < rows - 1; y ++) {
        beginShape(TRIANGLE_STRIP);
        for (let x = 1; x < cols - 1; x ++) {
          let specMap = map(spectrum[x*y], 0, 255, 0, 6);
          let specMapTwo = map(spectrum[x*(y+1)], 0, 255, 0, 6);
          let zVal = specMap * terrain[x][y];
          let zValTwo = specMapTwo * terrain[x][y+1];
          vertex(x*scl, y*scl, zVal);
          vertex(x*scl, (y+1)*scl, zValTwo);
      
      //  vertex(x*scl, (y+1)*scl, terrain[x][y + 1]);
      
      
    }
    endShape();
  }
  pop();
  
}