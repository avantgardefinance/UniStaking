# Uniswap Staking App

## Prerequisites

### Automatic

This repository comes with a reproducible development environment based on `nix` and `direnv`.

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

## Troubleshooting
