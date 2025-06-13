const { generateProof } = require("./utils/generateProof.js");
const { verifyProof } = require("./utils/verify.js");

async function main() {
    require('dotenv').config();
    const circuitName = process.env.CIRCUIT_NAME;
    const { proof, publicSignals } = await generateProof(circuitName);
    await verifyProof(circuitName, proof, publicSignals);

    console.log("# ------------------------------------------------------------------\n#         PUBLIC INPUT AND PROOF GENERATED AND VERIFIED\n# ------------------------------------------------------------------");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });