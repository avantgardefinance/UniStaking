# Uniswap Protocol Staking

Uniswap Protocol Staking by Avantgarde Finance.

This project facilitates the staking of UNI tokens.

## Automatic Setup

This repository provides a streamlined development environment using `nix` and `direnv`, ensuring reproducibility. This setup facilitates app development with locally deployed contracts and subgraph.

For the optimal developer experience, ensure you have the following installed:

- [nix](https://nix.dev)
- [direnv](https://direnv.net)

Once installed, your isolated local development environment will be automatically configured whenever you navigate to this directory.

## Manual Setup

If you prefer not to use `nix`, make sure you have the following installed:

- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [foundry](https://github.com/foundry-rs/foundry)
- [make](https://www.gnu.org/software/make)
- [Docker](https://www.docker.com)

## Quickstart

```sh
# Install npm packages (required whenever new dependencies are added).
pnpm install

# Start the Docker environment (if using local chain and subgraph).
make

# Start the app in dev mode.
pnpm dev
```

Access the app at http://localhost:3000.

## Local Network and Wallet

Manually add the local network to tools like MetaMask using the following parameters:

- Network Name: Localhost
- RPC URL: http://localhost:8545
- Chain ID: 31337
- Currency Symbol: ETH

Initial setup uses mnemonic `test test test test test test test test test test test junk` to generate addresses such as reward notifier, admin, governance token minter, and users.

Manually add the wallet to tools like MetaMask using the following parameters:

- Wallet Address: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8` - initially with 10,000 governance tokens
- Private Key: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`

## Scripts

Interact with the node using various scripts located in the [`contracts/scripts/`](contracts/scripts/) folder:

```sh
# Deal to Wallet: Sends 10,000 governance tokens to the chosen private key from the initial mnemonic. This script runs automatically with the "make" command.
forge script contracts/scripts/Deal.s.sol 1 --rpc-url http://127.0.0.1:8545 --broadcast --sig "run(uint32)"

# Seed: Stakes some amounts for the first three addresses from the mnemonic. This script runs automatically with the "make" command.
forge script contracts/scripts/Seed.s.sol --rpc-url http://127.0.0.1:8545 --broadcast

# Deploy: Deploys all contracts. This script runs automatically with the "make" command.
forge script contracts/scripts/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast

# Distribute Rewards: Sends a given amount of reward tokens to the UniStaker and notifies about the reward. In this example, 10,000,000 wei of reward tokens are sent. Run this command to test rewards claiming.
forge script contracts/scripts/DistributeRewards.s.sol 10000000 --rpc-url http://127.0.0.1:8545 --broadcast --sig "run(uint256)"
```

## Subgraph

The subgraph is available at http://localhost:8000/subgraphs/name/uniswap/staking.

After making changes to the subgraph, run `make subgraph` to redeploy only the subgraph with your changes. The `make subgraph` command is part of the overall `make` command.
