# Uniswap Protocol Staking

Uniswap Protocol Staking by Avantgarde Finance. 

## Prerequisites

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

# Seed wallet
forge script contracts/scripts/Deal.s.sol 1 --rpc-url http://127.0.0.1:8545 --broadcast --sig "run(uint32)"

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

Manually add the wallet to e.g. MetaMask using the following parameters:
- Wallet address: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- Private key: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`


