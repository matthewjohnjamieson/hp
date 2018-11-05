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

/*define a class for rationals which contains a bin expansion*/
//in arg list, bin specifies length of bin expansion. in final returned obj,
//bin holds the bin expansion
const createRat = (num,den,bin) => {
  bin = blist(num,den,bin);
  return {num,
          den,
          bin};
}

/*generate a binary expansion of a given size (helps createRat)*/
function blist(n,d,len){
  let generator = binarygenerator(n,d); //call the bin generator
  let thelist = [];
  for(let i = 0; i < len; i++)
    thelist.push(generator.next().value);
  return thelist;
}

/*lazily generate binary expansions for a given rational number (helps blist)*/
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

/*setup function*/
function setup() {
  createCanvas(500,500);

  frameRate(1);
  
  var t0 = performance.now();
  let r1 = createRat(1,3,512);
  console.log(r1);
  var t1 = performance.now();
  console.log("Call took " + (t1 - t0) + " milliseconds.")
  
}

/*draw loop*/
function draw() {
  background(127);
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
