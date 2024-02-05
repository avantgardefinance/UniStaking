// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script as ForgeScript} from "forge-std/Script.sol";
import {StdCheats} from "forge-std/StdCheats.sol";
import {ERC20VotesMock} from "scopelift/test/mocks/MockERC20Votes.sol";
import {ERC20Fake} from "scopelift/test/fakes/ERC20Fake.sol";
import {UniStaker} from "scopelift/src/UniStaker.sol";

abstract contract Script is StdCheats, ForgeScript {
    string constant MNEMONIC =
        "test test test test test test test test test test test junk";

    uint256 public immutable DEPLOYER = vm.deriveKey(MNEMONIC, 0);

    address constant REWARDS_NOTIFIER = address(0xaffab1ebeef);
    address constant ADMIN = address(0x70997970c);
    ERC20VotesMock public immutable GOVERNANCE_TOKEN =
        ERC20VotesMock(
            vm.computeCreate2Address(
                0,
                hashInitCode(type(ERC20VotesMock).creationCode)
            )
        );
    ERC20Fake public immutable REWARDS_TOKEN =
        ERC20Fake(
            vm.computeCreate2Address(
                0,
                hashInitCode(type(ERC20Fake).creationCode)
            )
        );
    UniStaker public immutable UNI_STAKER =
        UniStaker(
            vm.computeCreate2Address(
                0,
                hashInitCode(
                    type(UniStaker).creationCode,
                    abi.encode(REWARDS_TOKEN, GOVERNANCE_TOKEN, ADMIN)
                )
            )
        );

    constructor() {
        vm.label(ADMIN, "UniStaker Admin");
        vm.label(REWARDS_NOTIFIER, "Rewards Notifier");
        vm.label(address(REWARDS_TOKEN), "Rewards Token");
        vm.label(address(GOVERNANCE_TOKEN), "Governance Token");
        vm.label(address(UNI_STAKER), "UniStaker");
    }

    function dealToDerivedKey(uint32 who, uint256 amount) public {
        uint256 key = vm.deriveKey(MNEMONIC, who);

        vm.startBroadcast(key);
        GOVERNANCE_TOKEN.mint(vm.addr(key), amount);
        vm.stopBroadcast();
    }

    function stake(
        uint32 who,
        uint256 amount,
        address delegatee
    ) public returns (UniStaker.DepositIdentifier delegateId) {
        uint256 key = vm.deriveKey(MNEMONIC, who);

        vm.startBroadcast(key);
        GOVERNANCE_TOKEN.mint(vm.addr(key), amount);
        GOVERNANCE_TOKEN.approve(address(UNI_STAKER), amount);
        delegateId = UNI_STAKER.stake(amount, delegatee);
        vm.stopBroadcast();
    }
}
