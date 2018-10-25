/*
concept program to generate baker map binary expansions of rational numbers
in (0,1)
*/

/* proposed functions on bin reps of rationals
  extend(){} rat -> rat w/longer bin
  unextend(){} rat -> rat w/shorter bin
  drop(){} rat -> rat w/empty bin kinda a util function for re-calculation
  shift(){} rat -> rat with shifted bin (technically a different number? should rep in rat?)
  isbig(),subone(),tostring() normalized out
*/

/* more proposed changes:
refactor the bin generator. It's not clear if this kind of lazy eval is needed. 
Options: 1.keep as is and work around it, 2.put inside rat object, 3.take a rat->return a rat.  
Option 3 requires actually changing the rational number. is this desireable?
*/

/*example refactor to factory object style:
//factory object in this is very compact
const createRNB = ({num=0, den=1, bin=[]}) => ({num,den,bin});

//functional style
function plustwo(rnb){
  return createRNB({num: rnb.num + 2, den: rnb.den, bin: rnb.bin});
}

let rnbvar = createRNB({});
console.log(rnbvar);
rnbvar = plustwo(rnbvar);
console.log(rnbvar);
*/

/*squad goal: generate binary representations for arbitrary series*/

/*rational number class*/
//proposal: normalize out the member functions to make program more functional
//update: in the process of deprecating this class entirely
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

/*functional rat class + functions*/
const createRat = ({num=0, den=1, bin=[]}) => ({num,
                                                den,
                                                bin});

//deprecated by generator re-fact
function ratisbig(r){
  return ((r.num >= r.den ? true : false));
}
//deprecated by generator re-fact
function ratsubone(r){
  if(ratisbig(r))
    return (createRat({num: (r.num - r.den), den:r.den, bin:r.bin}));
  else
    return (createRat({num: r.num, den:r.den, bin:r.bin}));
}


/*lazily generate binary expansions for a given rational number*/
function* binarygenerator(n,d){
  while(1){
    n *= 2;
    if(n > d){
      while(n > d) //normalize for larger numbers
        n -= d;
      yield 1;
    }
    else{
      yield 0;
    }
  }
}

/*generate a binary expansion of a given size*/
function blist(rat, len){
  let generator = binarygenerator(rat.num, rat.den);
  let thelist = [];
  for(let i = 0; i < len; i++)
    thelist.push(generator.next().value);
  return thelist;
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

/*globals*/
let binlist = [];
let rat = new Rational(21,100); //rational number to evaluate
let bin = binarygenerator(rat);

/*setup function*/
function setup() {
  createCanvas(500,500);

  frameRate(1);
  
  //init list
  for(let i = 0; i < 5; i++)
    binlist.push(bin.next().value);

  let r1 = createRat({num: 1,
                      den: 10,
                      bin:(blist((createRat({num:1,den:10})),16))
                     });

  console.log(r1);
  
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

//test blist function
  //console.log(blist((new Rational(1,10)), 16));
