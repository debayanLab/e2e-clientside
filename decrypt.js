var BigInt = require ('big-integer')

var private = BigInt("485687215192613646631526111945")
var modulus = BigInt("514336084062574670679529160107")

var ciphertext = BigInt("403526837694589956406686580107")

function modexp(m, e, N) {
    var result = BigInt(1);
    N = BigInt(N);
    e = BigInt(e);
    m = BigInt(m).mod(N);
  
    if ( m.isZero() ) return 0;
  
    while(  e.greater(0)  ) {
        if ( e.isOdd() ) {
            result = result.times(m).mod(N);
          }

          e = e.shiftRight(1); // divide by 2
          m = m.square().mod(N); // can be optimized a bit

     }
      
    return result.toJSNumber();
}

// var decrypted = modexp (ciphertext, private, modulus)

var decrypted = ciphertext.modPow (private, modulus)

console.log (decrypted)