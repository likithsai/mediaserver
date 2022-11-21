//  crypto.js
//  function to generate crypto keys

const crypto = require("crypto");

function createHash(data, len) {
    return crypto.createHash("shake256", { outputLength: len })
      .update(data)
      .digest("hex");
}

module.exports = { createHash };