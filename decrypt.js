var NodeRSA = require ("node-rsa");
var fs = require ("fs");

var privateKeyData = fs.readFileSync ("./keys/private.pem", "utf-8");

var privateKey = new NodeRSA().importKey (privateKeyData);

const ciphertext =
`aXIBX/HVfaA26y3tKdJjzioGqqGGR2nNIABgJjYhlFb3CwIcX1bV25WeOsMk9d2NLQB4FHG7s8rXs9vtxCSbPq+ygGuJKJKL6vswpEo2kgraiqPjhDkL3kTdpYzvepQiTBZ9tDJywmKizr1aAPDoMauMx+TI1cgWNFvsFVK2IMCi35a4aYpBhjaUBKbOn/HeF0hwK+RA70pRnRh1q1xUk4poz6SfB59wyJt41bz5Zvlkm//pSh4NjaZL11JvhW+xBRDaLzZ3/D4f4BkyTDw8co7GaApLkxhhmqdAwrKYYHYSf5egauTeJi2QcPFbklvRoFx9+Yr0OUekj09J7uEG7Q==`
const plaintext = privateKey.decrypt (ciphertext, "utf-8");

console.log (plaintext);
