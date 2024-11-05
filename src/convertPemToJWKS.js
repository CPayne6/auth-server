/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const rsaPemToJwk = require("rsa-pem-to-jwk");

const privateKey =
  process.env.PRIVATE_KEY || fs.readFileSync(__dirname + "/../certs/private-key.pem");
const jwk = rsaPemToJwk(privateKey, { use: "sig" }, "public");

console.log(JSON.stringify(jwk));
