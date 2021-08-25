var NodeRSA = require ("node-rsa");
var fs = require ("fs");

function GenerateKeyPair () {

    console.log ("Generating RSA key pair ...");

    // generate a 2048 bit RSA key pair 
    var key = new NodeRSA().generateKeyPair ();

    // console.log (key);

    // export public and private keys
    var publicKey = key.exportKey ("public");
    var privateKey = key.exportKey ("private");

    console.log ("Writing public key ...");

    // write public key to file
    fs.openSync ("./public_611a09a2a490548f263767f9.pem", "w");
    fs.writeFileSync ("./public_611a09a2a490548f263767f9.pem", publicKey, "utf-8");

    console.log ("Writing private key ... ");

    // write private key to file
    fs.openSync ("./private.pem_611a09a2a490548f263767f9.pem", "w");
    fs.writeFileSync ("./private_611a09a2a490548f263767f9.pem", privateKey, "utf-8");

    console.log ("Done!");

}

GenerateKeyPair ();