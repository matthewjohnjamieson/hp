/*
concept program to generate baker map binary expansions of rational numbers
in (0,1)
*/

/*rational number class*/
class Rational{
  constructor(n,d){
    this.numerator = n;
    this.denominator = d;
  }

  isbig(){
    return (this.numerator >= this.denominator ? true : false);
  }
  
  subone(){
    if(this.isbig())
      this.numerator -= this.denominator;
  }

  tostring(){
    console.log("(%d,%d)", this.numerator, this.denominator);
  }
}

/*generate a basic visual for the binary string*/
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


/*lazily generate binary expansions for a given rational number*/
function* binarygenerator(r){
  let ratcopy = new Rational(r.numerator, r.denominator);
  while(1){
    ratcopy.numerator *= 2;
    if(ratcopy.isbig()){
      while(ratcopy.isbig()) //normalize for larger numbers
        ratcopy.subone();
      yield 1;
    }
    else{
      yield 0;
    }
  }
}

/*parse a binary number into a decimal*/
function binparser(b){
  let sum = 0;
  for(let i = 0 ; i < b.length; i++){
    if(b[i] === 1){
      sum += (1/Math.pow(2,(i+1)));
    }
  }  
  return sum;
}

let binlist = [];
let rat = new Rational(21,100); //rational number to evaluate
let bin = binarygenerator(rat);

/*setup function*/
function setup() {
  createCanvas(500,500);

  frameRate(5);
  
  //init list
  for(let i = 0; i < 5; i++)
    binlist.push(bin.next().value);
 
}

/*draw loop*/
function draw() {
  background(127);
  visual(binlist); //display visual
  binlist.shift(); //shift list
  binlist.push(bin.next().value); //push next binary number to the back of the list
}

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

/*test the binary number generator*/
//expected: a rotating "window" showing the first 3 digits
// 1/10 = 0.0001001001001...
function binarygeneratortest1(){
  let rat = new Rational(1,10);  
  const bin = binarygenerator(rat);
  let binlist = [];
  for(let i = 0; i < 5; i++)
    binlist.push(bin.next().value);

  for(let i = 0; i < 3; i++){
    console.log(binlist);
    binlist.shift();
    binlist.push(bin.next().value);
    console.log(binlist);
  }

  console.log( binparser(binlist));
}

//bonus junk data
 // print( binparser([0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1]));
