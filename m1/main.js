/*
-turn a decimal into a bin rep
-turn a binary string into a decimal number
*/

//a function to return the binary rep of the number
//number as a decimal -> finite string of binary numbers
function binstring(){} 

/*generate a binary number from a base 10*/
function binbuilder(){
  let x = 0.1;
  let ipart;
  let dpart;
  let binarystring = [];

  for(let i = 0; i < 100; i++){
    x *= 2;
    ipart = (x) - (x % 1);
    dpart = (x % 1);
    x = dpart;
    print(ipart, dpart);
  }
}

/*parse a binary number into a decimal*/
function binparser(b){
  //let sum = base2.reduce((a,v) => a+v, 0);
  let sum = 0;
  for(let i = 0 ; i < b.length; i++){
    if(b[i] === 1){
      sum += (1/Math.pow(2,(i+1)));
    }
    print(i);
  }
  
  return sum;
}

function setup() {
  createCanvas(500,500);
 // print( binparser([0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1]));

  binbuilder();
}

function draw() {
  background(127);
}
