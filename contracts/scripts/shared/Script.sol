// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script as ForgeScript} from "forge-std/Script.sol";
import {StdCheats} from "forge-std/StdCheats.sol";
import {ERC20VotesMock} from "scopelift/test/mocks/MockERC20Votes.sol";
import {ERC20Fake} from "scopelift/test/fakes/ERC20Fake.sol";
import {UniStaker} from "scopelift/src/UniStaker.sol";
import {V3FactoryOwner} from "scopelift/src/V3FactoryOwner.sol";

abstract contract Script is StdCheats, ForgeScript {
    struct Wallet {
        address addr;
        uint256 privateKey;
    }

    string constant MNEMONIC =
        "test test test test test test test test test test test junk";

    Wallet public DEPLOYER =
        Wallet({
            addr: vm.addr(vm.deriveKey(MNEMONIC, 0)),
            privateKey: vm.deriveKey(MNEMONIC, 0)
        });
    Wallet public ADMIN =
        Wallet({
            addr: vm.addr(vm.deriveKey(MNEMONIC, 2)),
            privateKey: vm.deriveKey(MNEMONIC, 2)
        });
    Wallet public FACTORY =
        Wallet({
            addr: vm.addr(vm.deriveKey(MNEMONIC, 3)),
            privateKey: vm.deriveKey(MNEMONIC, 3)
        });

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
                    abi.encode(REWARDS_TOKEN, GOVERNANCE_TOKEN, ADMIN.addr)
                )
            )
        );
    V3FactoryOwner public immutable V3_FACTORY_OWNER =
        V3FactoryOwner(
            vm.computeCreate2Address(
                0,
                hashInitCode(
                    type(V3FactoryOwner).creationCode,
                    abi.encode(
                        ADMIN.addr,
                        FACTORY.addr,
                        REWARDS_TOKEN,
                        10 ** 19,
                        UNI_STAKER
                    )
                )
            )
        );

    constructor() {
        vm.label(ADMIN.addr, "Admin UniStaker");
        vm.label(FACTORY.addr, "Factory");
        vm.label(address(REWARDS_TOKEN), "Rewards Token");
        vm.label(address(GOVERNANCE_TOKEN), "Governance Token");
        vm.label(address(UNI_STAKER), "UniStaker");
        vm.label(address(V3_FACTORY_OWNER), "V3FactoryOwner");
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

    function distributeRewards(uint256 _amount) public {
        // vm.startBroadcast(V3_FACTORY_OWNER.privateKey);
        REWARDS_TOKEN.mint(address(UNI_STAKER), _amount);
        UNI_STAKER.notifyRewardsAmount(_amount);
        vm.stopBroadcast();
    }
}
