const appRoot = require('app-root-path');
const { groth16 } = require("snarkjs");
const fs = require("fs");

async function verifyProof(circuitName, proofGenerated, publicSignals) {

    const verificationKey = JSON.parse(fs.readFileSync(`${appRoot}/outputs/keys/${circuitName}_verification_key.json`));
    const isValid = await groth16.verify(verificationKey, publicSignals, proofGenerated);

    if (isValid === true) {
        console.log("Congratulations! The proof is valid.");
      } else {
        console.log("The proof is invalid. Please check your inputs and try again.");
    }
}


module.exports = { verifyProof };