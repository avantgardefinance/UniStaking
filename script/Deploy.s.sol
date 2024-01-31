// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {UniStaker} from "scopelift/src/UniStaker.sol";
import {ERC20VotesMock} from "scopelift/test/mocks/MockERC20Votes.sol";
import {ERC20Fake} from "scopelift/test/fakes/ERC20Fake.sol";

contract Deploy is Script {
    string public constant MNEMONIC = "test test test test test test test test test test test junk";
    address public constant REWARDS_TOKEN = 0x83e83Eb0bCc4B922e5032DA9c34fcCAf00b87432; 
    address public constant GOVERNANCE_TOKEN = 0xf4d010117e1c1296075569F54a4768b176b68b6A;
    address public constant UNI_STAKER = 0xFb6E5742285f3Fd43a616a02b774351Ea574ba3f;

    uint256 public DEPLOYER = vm.deriveKey(MNEMONIC, 0);
    address public ADMIN = vm.addr(DEPLOYER);
    address public ALICE = vm.addr(vm.deriveKey(MNEMONIC, 1));
    address public BOB = vm.addr(vm.deriveKey(MNEMONIC, 2));

    function run() external {
        vm.startBroadcast(DEPLOYER);

        ERC20Fake rewardsToken = new ERC20Fake{salt: "rewards"}();
        vm.label(address(rewardsToken), "Rewards Token");

        ERC20VotesMock govToken = new ERC20VotesMock{salt: "governance"}();
        vm.label(address(govToken), "Governance Token");

        address rewardsNotifier = address(0xaffab1ebeef);
        vm.label(rewardsNotifier, "Rewards Notifier");

        UniStaker uniStaker = new UniStaker{salt: "unistaker"}(rewardsToken, govToken, rewardsNotifier);
        vm.label(address(uniStaker), "UniStaker");

        govToken.mint(ADMIN, 10000e18);
        govToken.mint(ALICE, 10000e18);
        govToken.mint(BOB, 10000e18);

        vm.stopBroadcast();
    }
}
