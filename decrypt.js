var NodeRSA = require ("node-rsa");
var fs = require ("fs");

var privateKeyData = fs.readFileSync ("./keys/private.pem", "utf-8");

var privateKey = new NodeRSA().importKey (privateKeyData);

const ciphertext =
`aebB+hyPNM6YqaEOGBsaCrfokYScVUfY9OntLCPomC0CL7mNCRokf/JxKw4h08qlOW68MRV2qyLywgV7MPIKvmq0kDcq2QWZCfawlasR03/PCLgj/5sOnVK/W+usyiRvKY3cyI+vXZGRfKbSHO+kp0Nmc4PqjfUUEPa+CRk0wwYYeW2rSLgDaf9DsS/wgZ0d+PobHrzAUuUQjpu92rRCDRIFml0ZZsyoK3yf7NiW5YCKw8ljgBaPQ4aovOA+UR7l0GXk5MpaPKSWQ1XdRkdbs8Z9vNuhTQkjOMnosTwFpZSkZ6KgV+RXdyQpYSdHZhd7RvW4Uvxp+skR/hzmLGnvlQ==`;

const plaintext = privateKey.decrypt (ciphertext, "utf-8");

console.log (plaintext);
