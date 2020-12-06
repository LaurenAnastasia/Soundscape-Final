let song;
let cols, rows;
let scl = 18;
let w 
let h;
let terrain = [];
let mic;
let fft;
let windowWidthScaler = 1;
let amp;

const myData = Array.from({ length: 2000});

myData.forEach((el, i)=> {
  myData[i] = ((i/1024) * 6) 
})
myData.reverse();

function preload() {
  song = loadSound('evenMoreFun.mp3');
  
}


function setup() {
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  getAudioContext().resume();
  fft = new p5.FFT()
  cnv.mousePressed(toggleSong);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  getAudioContext().resume();
  fft.setInput(mic);

//   amp = new p5.Amplitude();
//   console.log(amp);
  

  initWindow();

}

function toggleSong(){
    if (song.isPlaying() ){
        song.stop();
      } else {
        song.play();
      }
}

function draw() {

    translate(100,0,0);
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;


  let spectrum = fft.analyze();
console.log(spectrum);

    let spectrumSum = spectrum.reduce((previous, current) => current += previous);
    let spectrumAvg = spectrumSum / spectrum.length;
    console.log(spectrumAvg);
    let pulse = map(spectrumAvg, 0, 100, -2200, -4000);

    strkShft = map(spectrumAvg, 0, 100, 0, 200);
    background(0);
    specularMaterial(0, 0, 255);
    stroke(255, (97 + strkShft), (0 + strkShft));
    strokeWeight(0.7);

      // directionalLight(0, 0, 255, locX, locY, 0);
      //pointLight(0, 0, 255, locX, locY, 0);
    let clrShift1 = map(spectrumAvg, 0, 100, 0, 255);
    let clrShift2 = map(spectrumAvg, 0, 100, 0, 200);
    pointLight((0 + clrShift2), 31, (255 - clrShift1), 0, 500, pulse);
  //pointLight(224, 97, 0, 0, -10000, pulse);
  // console.log(locX, locY);
  // spectrum.reverse();

  // console.log(spectrum.length);

  // let newSpectrum = spectrum.slice(100,800);
  // // console.log(newSpectrum.length);
  const newLength = 2048;
  let newnewSpectrum = Array.from({length: newLength});
  newnewSpectrum.forEach( (el, i) => {
    // stepsize which will be 1024/400
    const stepSize = Math.floor(1024/newLength);
    newnewSpectrum[i] = spectrum[stepSize];
  })
 //console.error(newnewSpectrum.length);
  
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {

      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -42, 42);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  
 //sun
  push();
    let flare = map(spectrumAvg, 0, 100, 1, 15);
    let flare2 = map(spectrumAvg, 0, 100, 1, 40);
    //pointLight(255, 255, 255, 0, flare, 100);
    directionalLight(255, 97, 0, 1, -3, (3*flare2));
    directionalLight(255, 97, 0, 1, -2, (-.5*flare));
    specularMaterial(255);
    translate(100, -500, -700);
    //rotateY(millis() / 1000);
    sphere(110, 25);
  pop();

  push();
    let micLevel = mic.getLevel();
    let swell = map(micLevel, 0, 1, 0, 1000)
    translate(170, -700, -1200);
    ambientMaterial(255);
    sphere((210 + swell), 25);
  pop();

push();
    lightFalloff(5, 0, 0);  
    directionalLight(250, 250, 250, 15000, -25000, -2000);
    let swing = map(micLevel, 0, 1, 0, 10);
    translate((-1000 * -swing), -700, -3000);
    specularMaterial(255);
    sphere((15000), 100);
 pop();


  push();
  rotateX(PI/3);
  translate(-w/2, -h/2);

  const step  = 1;

  const yLoops = rows - 9;
  const xLoops = cols - 9;

  for (let y = 1; y < yLoops; y ++) {
        beginShape(TRIANGLE_STRIP);
      

        for (let x = 1; x < xLoops; x ++) {
 
          const datum = spectrum[y * x];
          const datum2 = spectrum[(y + 1) * x];

          let specMap = map(datum, 0, 255, 0, 20);
          let specMapTwo = map(datum2, 0, 255, 0, 20);

          let zVal = -specMap * terrain[x][y];
          let zValTwo = -specMapTwo * terrain[x][y+1];

          vertex(x * scl, y * scl, zVal);
          vertex(x * scl, (y+1) * scl, zValTwo);
      
    }
    endShape();
  }
  pop();

  push();
  specularMaterial(100);
  lightFalloff(1, 0, 0);
  noStroke();
  rotateX(PI/3);
  translate(-50, -10, -130);
  plane(900, 800); 
  pop();

  
}


function initWindow(){
  windowWidthScaler = 1;
  w = 1000;
  h = 800;
  scl = windowWidth/120;
  scl = 18;
  cols = w / scl;
  rows = h / scl;
  
   for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
  getAudioContext().resume();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initWindow();
}

function mousePressed(){
  getAudioContext().resume();
}