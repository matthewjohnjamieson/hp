/*
This is the library for functions which operate on binary numbers.

potential future action: make this a library for all rational numbers and 
possibly other data types if they become needed. may wish to move the data types themselves
into the library (the rational numbers data type currently is in its own file.)
*/

/* proposed functions on bin reps of rationals
  extend(){} rat -> rat w/longer bin
  unextend(){} rat -> rat w/shorter bin
  drop(){} rat -> rat w/empty bin kinda a util function for re-calculation
  shift(){} rat -> rat with shifted bin (technically a different number? should rep in rat?)
  isbig(),subone(),tostring() normalized out
*/


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
