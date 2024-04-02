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

- [node](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [docker](https://www.docker.com)

## Quickstart

```sh
# Install npm packages (required whenever new dependencies are added).
pnpm install

# Start the app in dev mode.
pnpm dev
```

Access the app at http://localhost:3000.

## Subgraph

The subgraph is available at https://thegraph.com/hosted-service/subgraph/enzymefinance/uni-staking-sepolia (testing).
