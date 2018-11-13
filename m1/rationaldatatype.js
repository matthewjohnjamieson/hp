/*define a class for rationals which contains a bin expansion*/
//in arg list, bin specifies length of bin expansion. in final returned obj,
//bin holds the bin expansion


const createRat = (num,den,bin) => {
  bin = blist(num,den,bin);
  return {num,
          den,
          bin};
}
