/*library for visualization functions*/

/*textviz: rational -> console. prints a text representation of a rational*/
function textviz(rat){
  console.log("hello. I am a visual. my binary representation is ", rat.bin);
  console.log("my rational is ", rat.num,"," , rat.den);
}

/*spikes: rat,radius,x,y -> draw. make a spikey circle*/
function spikes(rat,rad,xpos,ypos){
  drawcircle(polygonverts(xpos,ypos,rad,rat.bin.length,rat));
}

/*polygonverts: x,y,radius, number of verts, rat -> array of coords. make a seq of x,y coords for a polygon*/
function polygonverts(x, y, radius, npoints,r) {
  let angle = TWO_PI / npoints;
  let scale = 0;
  let count = 0;
  let verts = [];
  
  for (let a = 0; a < TWO_PI; a += angle) {
    if(r.bin[count % r.bin.length] === 1)
      scale = 75;
    else
      scale = 0;
    count++;
    
    let sx = x + cos(a) * (radius + scale);
    let sy = y + sin(a) * (radius + scale);
    verts.push({x : sx, y: sy});
  }

  return verts;
}

/*drawcircle: array of coords -> draw. draw a shape from an array of verticies*/
function drawcircle(v){
  beginShape();
  v.forEach(function(element){
    vertex(element.x,element.y);
  });
  endShape(CLOSE);
}
