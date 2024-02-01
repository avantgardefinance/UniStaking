// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script as ForgeScript} from "forge-std/Script.sol";
import {ERC20VotesMock} from "scopelift/test/mocks/MockERC20Votes.sol";
import {ERC20Fake} from "scopelift/test/fakes/ERC20Fake.sol";
import {UniStaker} from "scopelift/src/UniStaker.sol";
import "forge-std/console2.sol";

// address constant REWARDS_TOKEN = 0x83e83Eb0bCc4B922e5032DA9c34fcCAf00b87432;
// address constant GOVERNANCE_TOKEN = 0xf4d010117e1c1296075569F54a4768b176b68b6A;
// address constant UNI_STAKER = 0xFb6E5742285f3Fd43a616a02b774351Ea574ba3f;

abstract contract Script is ForgeScript {
    string constant MNEMONIC = "test test test test test test test test test test test junk";

    uint256 public immutable DEPLOYER = vm.deriveKey(MNEMONIC, 0);

    address constant REWARDS_NOTIFIER = address(0xaffab1ebeef);
    ERC20VotesMock public immutable GOVERNANCE_TOKEN =
        ERC20VotesMock(vm.computeCreate2Address(0, hashInitCode(type(ERC20VotesMock).creationCode)));
    ERC20Fake public immutable REWARDS_TOKEN =
        ERC20Fake(vm.computeCreate2Address(0, hashInitCode(type(ERC20Fake).creationCode)));
    UniStaker public immutable UNI_STAKER = UniStaker(
        vm.computeCreate2Address(
            0, hashInitCode(type(UniStaker).creationCode, abi.encode(REWARDS_TOKEN, GOVERNANCE_TOKEN, REWARDS_NOTIFIER))
        )
    );

    constructor() {
        vm.label(REWARDS_NOTIFIER, "Rewards Notifier");
        vm.label(address(REWARDS_TOKEN), "Rewards Token");
        vm.label(address(GOVERNANCE_TOKEN), "Governance Token");
        vm.label(address(UNI_STAKER), "UniStaker");
    }

    function deal(uint32 index, uint256 amount) public {
        uint256 key = vm.deriveKey(MNEMONIC, index);
        address account = vm.addr(key);

        vm.broadcast(key);
        REWARDS_TOKEN.mint(account, amount);

        vm.broadcast(key);
        REWARDS_TOKEN.approve(address(UNI_STAKER), type(uint256).max);
    }
}
