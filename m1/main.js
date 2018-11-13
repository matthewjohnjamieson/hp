/*
concept program to generate baker map binary expansions of rational numbers
in (0,1)
*/

/*squad goal: generate binary representations for arbitrary series*/

/*
//generate a basic visual for the binary string
function visual(b){
  for(let i = 0; i < b.length; i++){
    if(b[i] === 1){
      ellipse((i*50)+125,height/2,50,50);
    }
    else{
      ellipse((i*50)+125,height/2,5,5);
    }
  }
}
*/



let testrat = createRat((3*1712+1),(3*(10**4)),2**2);

/*setup function*/
function setup() {
  createCanvas(500,500);
  frameRate(1);
  
  textviz(testrat)

  spikes(testrat,100,width/2,height/2);
  
}

/*draw loop*/
function draw() {
  
}

/*
function mouseClicked(){
    let num = window.prompt("enter a numerator", rat.numerator);
    let denom = window.prompt("enter a denominator", rat.denominator);
    rat.numerator = num;
    rat.denominator = denom;
    binlist = [];
    bin = binarygenerator(rat);
    for(let i = 0; i < 5; i++)
        binlist.push(bin.next().value);
}
*/


 /* 
  var t0 = performance.now();
  let r1 = createRat(1,3,512);
  console.log(r1);
  var t1 = performance.now();
  console.log("Call took " + (t1 - t0) + " milliseconds.")
 */
