let song;
let cols, rows;
let scl = 18;
let w 
let h;
let terrain = [];
let mic;
let fft;
let windowWidthScaler = 1;


const myData = Array.from({ length: 2000});

myData.forEach((el, i)=> {
  myData[i] = ((i/1024) * 6) 
})
myData.reverse();

function preload() {
  song = loadSound('Proj1_Track9.mp3');
  
}


function setup() {
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  getAudioContext().resume();
  fft = new p5.FFT()
  //cnv.mousePressed(canvasPressed);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  getAudioContext().resume();
  fft.setInput(mic);
  
  initWindow();
  
}

function canvasPressed(){
  song.play();
}

function draw() {
  translate(100,0,0);
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  // let v = createVector(locX, locY, 0);
  // v.normalize;

  // directionalLight(0, 0, 255, locX, locY, 0);
  //pointLight(0, 0, 255, locX, locY, 0);
  pointLight(0, 0, 255, 0, 1000, -3000);
  // console.log(locX, locY);
  
  let spectrum = fft.analyze();

  // spectrum.reverse();

  // console.log(spectrum.length)

  // let newSpectrum = spectrum.slice(100,800);
  // // console.log(newSpectrum.length);
  const newLength = 2048;
  let newnewSpectrum = Array.from({length: newLength});
  newnewSpectrum.forEach( (el, i) => {
    // stepsize which will be 1024/400
    const stepSize = Math.floor(1024/newLength);
    newnewSpectrum[i] = spectrum[stepSize];
  })
 console.error(newnewSpectrum.length);
  
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

  // torus(5, 255);
  
  /// x * y = 1024?
 
  // const step = Math.ceil((1024 / rows) - 10);
  // console.log(step);
  const step  = 1;

  const yLoops = rows - 9;
  const xLoops = cols - 9;

  for (let y = 1; y < yLoops; y ++) {
        beginShape(TRIANGLE_STRIP);

        for (let x = 1; x < xLoops; x ++) {
          // console.log(myData[x*y]);
          // if(x*y > 1024){
          //   console.log('exceed value: ', x * y);
          // }
          // step = [0, 21, 42, 84...]
          //x = [0,1,2,3,4,5,6..]
          //y= [0,1, 2..]
          //  rows = 600/18

          //spectrum[0 * 0 + 0]
          //[0 * 21 + 1]
          //[0 * 42 + 2]    

          // const datum = spectrum[y * x];
          // const datum2 = spectrum[(y + 1) * x];
          // if(x < 10){
          //   x = 10;
          // }
          const datum = spectrum[y * x];
          const datum2 = spectrum[(y + 1) * x];

          // const datum = newnewSpectrum[y * x];
          // const datum2 = newnewSpectrum[(y + 1) * x];

          let specMap = map(datum, 0, 255, 0, 20);
          let specMapTwo = map(datum2, 0, 255, 0, 20 );

          // let specMap = map(spectrum[x * y], 0, 255, 0, 20);
          // let specMapTwo = map(spectrum[x  * (y+1)], 0, 255, 0, 20);
          // let specMap = map(myData[x * y], 0, 255, 0, 6);
          // let specMapTwo = map(myData[x * (y+1)], 0, 255, 0, 6);
          // let specMap = myData[x * y];
          // let specMapTwo = myData[x * (y + 1)];
          // let specMap = myData[y * step + x];
          // let specMapTwo = myData[(y + 1) * step + x];
          



          let zVal = -specMap * terrain[x][y];
          let zValTwo = -specMapTwo * terrain[x][y+1];


          // if(zVal < 100){
          //   zVal = 100;
          // }

          // if(zValTwo < 100){
          //   zValTwo = 100;
          // }

          // zVal = 100;
          // zValTwo = 200;
          
          vertex(x * scl, y * scl, zVal);
          vertex(x * scl, (y+1) * scl, zValTwo);
      
      //  vertex(x * scl, (y+1) * scl, terrain[x][y + 1]);
      //  vertex(x * scl, (y) * scl, terrain[x][y]);
      
      
    }
    endShape();
  }
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