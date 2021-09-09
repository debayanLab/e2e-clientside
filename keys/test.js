var sign=`gVJMGDGHMSpW29TU9rsimhlUFMj/q6Pg5y9lNj8z8YjM+GOiFpmX5AyWJSUY2/bVjUjEjq85S2UO5HhV191b7ee6NeZlZzmn+E4+cvtW6Cm/Lk3V9DyAuoyZx6Mx7z+GFHscgr5Cix5BavuOarjZ1RUtlQa/dhEhEv0MK3vty4jYVNaDi+LNSWn7S0K0+39PoWeRf8xrEXlZp0rjV9hd1qakYY1xtmJurV2kyhcobU3L6nUHfIzeBsSE/8qXbN6o2jslAENJpy4gL3HmrlsxR9qB5plJzhJTUOvyReP1po/SeugTAWbZz4N/pMQnIoPpZsvRuCfj3xmgB7kq1E0/5A==`;

var public =`-----BEGIN PUBLIC KEY----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi3/dy/lapSSxXS6ZsAai /XyH7nWkWN49JCqwbtPJznx0Pi8+9JDy4exK0fXWGuAMzHAs4ahcieX/utwVXtsN 3VHTer21ZiAe9qRogyIyOwwf+O2EaFngQYqXzgrFZmAIxrVdqOjwB8ra9R0+XV8O DMI214YZJOCScRiIjiGLPPJGSO0dkkGXCd9C2PGwyNeaLVkgk+Jkmgzlpsu67SFR EchGtdkWjU0mvtD/kGnkhWrmcJJPXwjH54vk890yVpUKxjUxtACq35tOcYDB5POM sxiwwX+5h9CcgWnBBr292YbzovdE04d0NvJBo/R1bzXVk/ni0u1QE+qf4zYgIyZT qQIDAQAB -----END PUBLIC KEY-----`;
var NodeRSA = require ("node-rsa");

var publickey =new NodeRSA();

publickey.importKey(public);

//const en= privatekey.encryptPrivate(test,"base64")

const de = publickey.decryptPublic(sign, "utf-8")
console.log(de)
