var BigInt = require ('big-integer')

var private = BigInt(parseInt("485687215192613646631526111945"))
var modulus = BigInt(parseInt("514336084062574670679529160107"))

var ciphertext = BigInt(parseInt("321401366123665822675913146368"))

function modexp (m, e, n) {
    var res = BigInt (1)
    while (e > 0) {
        // If exponent is odd
        if ((e % 2) == 1) 
            res = (res * m) % n

        // Our exponent must be even now 
        e = e / 2  
        m = (m * m) % n 
    }
    return BigInt(res)
}

var decrypted = modexp (ciphertext, private, modulus)

console.log (decrypted)