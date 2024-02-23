# Uniswap Protocol Staking

Uniswap Protocol Staking by Avantgarde Finance.

### Automatic

This repository comes with a reproducible development environment based on `nix` and `direnv`. This allows the development of the app based on locally deployed contracts and subgraph.

For the best possible developer experience, make sure you have the following installed:

- [nix](https://nix.dev)
- [direnv](https://direnv.net)

Once you have these installed, your isolated local development environment will be set up automatically whenever you navigate to this directory.

### Manual

If you don't want to use `nix`, make sure to have the following installed:

- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [foundry](https://github.com/foundry-rs/foundry)
- [make](https://www.gnu.org/software/make)
- [Docker](https://www.docker.com)

## Quickstart

```sh
# Install npm packages (required whenever new dependencies are added).
pnpm install

# Start docker environment (if using local chain and local subgraph).
make

# Start app in dev mode
pnpm dev
```

You should now be able to access the app at http://localhost:3000.

## Local Network and Wallet

Manually add the local network to e.g. MetaMask using the following parameters:

- Network name: Localhost
- RPC URL: http://localhost:8545
- Chain Id: 31337
- Currency symbol: ETH

Initial setup uses mnemonic `test test test test test test test test test test test junk` to generate addresses like reward notifier, admin, governance token minter, and users
Manually add the wallet to e.g. MetaMask using the following parameters:

- Wallet address: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8` - initialy it will have 10_000 governance token
- Private key: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d` - this is the 1 private key generated from mnemonic

## Scripts

There are multiple scripts in the `contracts/scripts/` folder with which you can interact with node

```sh
# Deal to wallet - sends 10_000 governance token to the choosen private key of the initial mnemonic. In this example we are sending it to the 1 private key. This script is run automatically by "make" command
forge script contracts/scripts/Deal.s.sol 1 --rpc-url http://127.0.0.1:8545 --broadcast --sig "run(uint32)"

# Seed - stakes some amounts for the first three addresses from mnemonic. This script is run automatically by "make" command
forge script contracts/scripts/Seed.s.sol --rpc-url http://127.0.0.1:8545 --broadcast

# Deploy - deploys all of the contracts. This script is run automatically by "make" command
forge script contracts/scripts/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast

# DistributeRewards - send given amount of reward token to the UniStaker, and notify about the reward. In this example we send 10000000 wei of the rewards token. You would like to run this command to test rewards claiming
forge script contracts/scripts/DistributeRewards.s.s.sol 10000000 --rpc-url http://127.0.0.1:8545 --broadcast --sig "run(uint256)"
```

## Subgraph

Subgraph is available under `http://localhost:8000/subgraphs/name/uniswap/staking`

After introducing changes to subgraph you can run `make subgraph` command. It will redeploy only subgraph with your new changes. The command `make subgraph` is part of the `make` command
