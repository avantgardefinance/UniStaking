# See https://tech.davis-hansson.com/p/make
SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
.DEFAULT_GOAL := all

MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

ifndef VERBOSE
  MAKEFLAGS += --silent
endif

ifeq ($(origin .RECIPEPREFIX), undefined)
  $(error This Make does not support .RECIPEPREFIX. Please use GNU Make 4.0 or later)
endif
.RECIPEPREFIX = >

FORGE := forge
DOCKER := docker
PNPM := pnpm

SCRIPTS := contracts/scripts

.PHONY: help
help: ## Describe useful make targets
> grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%-30s %s\n", $$1, $$2}'

.PHONY: all
all: down up contracts subgraph

.PHONY: up
up: ## Start the docker environment
> $(DOCKER) compose up --detach --wait --quiet-pull
>
> # Wait for the rpc service to be available
> payload='{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
> while [[ $$(curl -s -o /dev/null -w "%{http_code}" --data $$payload -H "Content-Type: application/json" -X POST http://localhost:8545) -ne 200 ]]; do
>   sleep 5
> done

.PHONY: down
down: ## Stop and destroy the docker environment
> $(DOCKER) compose down --volumes

.PHONY: contracts
contracts: ## Deploy the contracts
> $(FORGE) script $(SCRIPTS)/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast
> $(FORGE) script $(SCRIPTS)/Seed.s.sol --rpc-url http://127.0.0.1:8545 --broadcast
> $(FORGE) script $(SCRIPTS)/Deal.s.sol 1 --rpc-url http://127.0.0.1:8545 --broadcast --sig "run(uint32)"

.PHONY: subgraph
subgraph: ## Deploy the subgraph
> $(PNPM) --filter subgraph run codegen
> $(PNPM) --filter subgraph run create-local || true
> $(PNPM) --filter subgraph run deploy-local
