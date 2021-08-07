var NodeRSA = require ("node-rsa");
var fs = require ("fs");

var privateKeyData = fs.readFileSync ("./keys/private.pem", "utf-8");

var privateKey = new NodeRSA().importKey (privateKeyData);

const ciphertext =
`Bn/VuAQ2Ry5JYYqxzUpBqAm4rstWYzIwspeWMeqXaJX33FmOFqBTaBQYI1N5C9XKpD4YaluKjV0Z/ELXf4V7ZytoL5pH/hzbLl2HZvWjha3S5XycYfAVV91HQzJq1vHZOXdyYAEf6Ws1G3Q2Za4LIYDrrIb+12RnQZ3asKjeVRIN7tgF/YQU8WDfHIbPb1PP5CrfRS2oy4zeA//tv/2IIvXlC90iUHdfOyClGO/f/DP9W2K4FNZUkWKyPFyCpx+PNB2efbx0zi7vOMuxw14KrHeNVLFjn7pbc4WeQ6pgF7yHTN+atLqSY/5y6Uivuua8C6+CVLw17ZEnB4i7chi7YA==`;
const plaintext = privateKey.decrypt (ciphertext, "utf-8");

console.log (plaintext);
