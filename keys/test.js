var sign=`aaEvXawa0aH0VOZpvTeD/WQaQ0Q7kB8kIdPDDcFugoJ5Pw8ujWkTaN6jYqkqtTM4uzVYJGODw1VSj0+PacFQFC+VKvrfmwTuPiwd3Ys0qVerFvwuQCSWhgpWJXxG0q7Ot5UwDCw0IBWdTmGZa0kU95lvghNh0Qmm3J8Lbk9zWau4tFChUUEkXkMYpT8+XtSsg5ElUL2WVPLldAxIn+LN7rAX2aCXFkdjKO3iw7xSFsmS4+ALtYuMdpZdilzJbhk0QiYMCqgGyxAyizwy4wFWMlz8qs28xbbUxLMlxX9sicArySfPrflHIAN5jbXdtivVEHVIsPQd1Scfaj+e69dz9A==`;

var public =`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi3/dy/lapSSxXS6ZsAai
/XyH7nWkWN49JCqwbtPJznx0Pi8+9JDy4exK0fXWGuAMzHAs4ahcieX/utwVXtsN
3VHTer21ZiAe9qRogyIyOwwf+O2EaFngQYqXzgrFZmAIxrVdqOjwB8ra9R0+XV8O
DMI214YZJOCScRiIjiGLPPJGSO0dkkGXCd9C2PGwyNeaLVkgk+Jkmgzlpsu67SFR
EchGtdkWjU0mvtD/kGnkhWrmcJJPXwjH54vk890yVpUKxjUxtACq35tOcYDB5POM
sxiwwX+5h9CcgWnBBr292YbzovdE04d0NvJBo/R1bzXVk/ni0u1QE+qf4zYgIyZT
qQIDAQAB
-----END PUBLIC KEY-----`;

var NodeRSA = require ("node-rsa");

var publickey =new NodeRSA();

publickey.importKey(public);

//const en= privatekey.encryptPrivate(test,"base64")

const de = publickey.decryptPublic(sign, "utf-8")
console.log(de)
