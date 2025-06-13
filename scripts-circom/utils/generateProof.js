const appRoot = require('app-root-path');
const { groth16, plonk, fflonk } = require("snarkjs");
const fs = require('fs');
const path = require('path');

async function generateProof(circuitName) {
    
    // Change the protocol to groth16, plonk, or fflonk as needed
    const { proof, publicSignals } = await groth16.fullProve(
        { your_first_private_input: REPLACE_WITH_YOUR_PRIVATE_INPUT_VALUE, your_second_private_input: REPLACE_WITH_YOUR_PRIVATE_INPUT_VALUE }, // Replace with your actual private input declared names in circuit and values
        `${appRoot}/outputs/${circuitName}_js/${circuitName}.wasm`,
        `${appRoot}/outputs/keys/${circuitName}_final.zkey`
    );

    console.log("# ------------------------------------------------------------------\n#                         PUBLIC SIGNALS\n# ------------------------------------------------------------------");
    console.log(publicSignals);
    console.log("# ------------------------------------------------------------------\n#                        PROOF GENERATED\n# ------------------------------------------------------------------");
    console.log(proof);

    // Write publicSignals to circuits/verify/public.json
    fs.writeFileSync(
        path.join(appRoot.toString(), 'outputs', 'verify', `${circuitName}_public.json`),
        JSON.stringify(publicSignals, null, 2)
    );

    // Write proof to circuits/verify/proof.json
    fs.writeFileSync(
        path.join(appRoot.toString(), 'outputs', 'verify', `${circuitName}_proof.json`),
        JSON.stringify(proof, null, 2)
    );

    return { proof, publicSignals };
}

module.exports = { generateProof };