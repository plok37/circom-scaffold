# Circom-Startup Template

A modern, opinionated starter template for zero-knowledge proof projects using [Circom](https://docs.circom.io/) and [Foundry](https://book.getfoundry.sh/). This repository provides a streamlined workflow for Groth16, Plonk, and FFlonk proving systems, with all essential scripts and dependencies included. Just add your `.circom` circuit and start building!

## Features

- **Circom Integration**: Easily compile and inspect your circuits.
- **Automated Trusted Setup**: Scripts for both Groth16 and Plonk/FFlonk ceremonies.
- **Solidity Verifier Generation**: Export Solidity verifier contracts for on-chain verification.
- **Foundry Support**: Ready for smart contract development and testing.
- **Makefile Workflow**: One-command setup and proof generation.
- **Extensible**: Add your own circuits and scripts as needed.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- [Circom](https://docs.circom.io/getting-started/installation/)
- [snarkjs](https://github.com/iden3/snarkjs)
- [circomspect](https://github.com/trailofbits/circomspect) for circuit inspection

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/plok37/circom-startup.git
   cd circom-startup
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up your environment variables:**
   
   Copy `.env.example` to .env and edit as needed (e.g., `CIRCUIT_NAME`, `POWER_OF_TAU`, etc.).

4. **Add your circuit:**
   
   Place your `.circom` file(s) in the circuits directory. Your main circuit file should aligns with the circuit name defined in the `.env` file.


### Usage

#### Groth16 Workflow

To run the full Groth16 trusted setup, proof generation, and verification:

```bash
make
```

Before running this command, you may need to go to `script/main.js` and `scripts/utils/generateProof.js` to change your private inputs value.

This will:
- Inspect, check whether it compiles then only compile your circuit
- Run the Powers of Tau ceremony (including adding third party and beacon contributions)
- Generate and contribute to zkey files (including phase 2 contribution)
- Export verification keys from final zkey file
- Generate and verify proofs
- Turns verifier into a form of smart contract using Solidity
- Generates call parameters (Proof) for the smart contract verifier

You may edit the Makefile to add more contribution during the Powers of Tau ceremony or/and phase 2 ceremony based on your needs. One thing to notice is it is insecure if there are no contributions to the phase 2 ceremony when you are using Groth16 proving system.

#### Plonk/FFlonk Workflow

For Plonk or FFlonk proving systems:

```bash
make plonk-fflonk
```

Before running this command, you may need to go to `script/main.js` and `scripts/utils/generateProof.js` to change your private inputs value.

This will:
- Inspect, check whether it compiles then only compile your circuit
- Run the Powers of Tau ceremony (including adding third party and beacon contributions)
- Generate and verify zkey files (excluding phase 2 contribution)
- Export verification keys from final zkey file
- Generate and verify proofs
- Turns verifier into a form of smart contract using Solidity
- Generates call parameters (Proof) for the smart contract verifier

Only contributions to the Powers of Tau ceremony as PlonK and FFlonk doesn't require contributions in phase 2 ceremony. The verification keys can be directly exported after verifying the zkey file.

#### Skip Contributions (for fast testing)

To skip the contributions in trusted setup and quickly test your circuit with inputs:

```bash
make skip
```

Before running this command, you may need to go to `script/main.js` and `scripts/utils/generateProof.js` to change your private inputs value.

This will:
- Inspect, check whether it compiles then only compile your circuit
- Skip the Powers of Tau ceremony (but you have to prepare your own `pot$(POWER_OF_TAU)_final.ptau`)
- Generate and verify zkey files (skip phase 2 contribution)
- Export verification keys from final zkey file
- Generate and verify proofs
- Turns verifier into a form of smart contract using Solidity
- Generates call parameters (Proof) for the smart contract verifier

This will skip both the contributions in the Powers of Tau ceremony and phase 2 ceremony.

#### Clean Outputs

To clean the outputs directory and remove the generated files:

```bash
make clean
```

To clean all outputs including the powersoftau files and the verifier contract and start fresh:

```bash
make clean-all
```

### Multi-Circuit Workflow

You can manage multiple `.circom` files in the `circuits/` directory. To build and test a specific circuit, simply pass the `CIRCUIT_NAME` as a Makefile argument:

```bash
make CIRCUIT_NAME=your_circuit_name
```

This overrides the value in your `.env` file for that run. All Makefile targets support this pattern, so you can run, for example:

```bash
make plonk-fflonk CIRCUIT_NAME=another_circuit
```

#### List Available Circuits

To see all `.circom` files in your project, use the following Makefile target:

```bash
make list-circuits
```

### Directory Structure

```
circom-startup
├── .env                - "Environment variables for circuit name, ceremony parameters, etc."
├── Makefile            - "Main workflow automation for trusted setup, compilation, and proof generation"
├── package.json        - "Node.js project configuration"
├── pnpm-lock.yaml      - "pnpm lockfile"
├── foundry.toml        - "Foundry configuration"
│
├── circuits            - "All your .circom circuit files (main circuits and components)"
│   ├── main.circom     - "Example main circuit"
│   └── ...             - "Other circuit files"
│
├── src
│   └── Verifier.sol    - "Auto-generated Solidity verifier"
|   └── ...             - "Other Foundry smart contract project files"
│
├── lib                 - "External libraries and dependencies (e.g., forge-std for Foundry)"
│   └── forge-std
│       └── ...         - "Foundry standard library files"
│
├── outputs             - "Compiled circuits, keys, proofs, and verification outputs"
│   ├── keys            - "Exported keys"
│   ├── challenge       - "Challenge/response files for ceremonies"
│   ├── verify          - "Proof and public input outputs"
│   └── ...             - "Other build artifacts"
│
├── power-of-tau        - "Powers of Tau ceremony files"
│   └── challenge       - "Challenge/response files for Powers of Tau"
│
├── script              - "Custom scripts for smart contracts"
│   └── ...             - "Scripts files"
│
├── scripts-circom      - "JavaScript utilities for proof generation and verification"
│   ├── main.js         - "Main proof generation script"
│   └── utils
│       ├── generateProof.js - "Helper for proof generation"
│       └── verify.js        - "Helper for proof verification"
│
├── test                - "Custom testing scripts for smart contract"
│   └── ...             - "Test files"
│
└── README.md           - "Project documentation"
```

This structure helps you efficiently organize multiple circuits, ceremonies, scripts, and smart contract integrations.

### Customization

- Edit the .env file to set your main circuit name and ceremony parameters.
- Modify the Makefile to add or adjust steps as needed for your workflow.

### References

- [Circom Documentation](https://docs.circom.io/)
- [snarkjs Documentation](https://github.com/iden3/snarkjs)
- [Foundry Book](https://book.getfoundry.sh/)
- [circomspect](https://github.com/trailofbits/circomspect)

---

## License

This project is licensed under the MIT License.

---