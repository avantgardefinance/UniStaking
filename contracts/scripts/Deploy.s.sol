// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import "forge-std/console2.sol";
import {Script} from "./shared/Script.sol";
import {UniStaker} from "src/UniStaker.sol";
import {IUniswapV3FactoryOwnerActions} from "src/interfaces/IUniswapV3FactoryOwnerActions.sol";
import {IERC20Delegates} from "src/interfaces/IERC20Delegates.sol";
import {V3FactoryOwner} from "src/V3FactoryOwner.sol";
import {ERC20Fake} from "test/fakes/ERC20Fake.sol";
import {Uni} from "./tokens/Uni.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast(DEPLOYER.privateKey);

        console2.log("Deploying Rewards Token Contract: %s", address(REWARDS_TOKEN));
        address rewardsToken = address(new ERC20Fake{salt: 0}());
        assert(rewardsToken == address(REWARDS_TOKEN));

        console2.log("Deploying Governance Token Contract: %s", address(GOVERNANCE_TOKEN));
        address governanceToken =
            address(new Uni{salt: 0}(GOVERNANCE_TOKEN_MINTER.addr, GOVERNANCE_TOKEN_MINTER.addr, block.timestamp));
        assert(governanceToken == address(GOVERNANCE_TOKEN));

        console2.log("Deploying Uniswap Staking Contract: %s", address(UNI_STAKER));
        address uniStaker =
            address(new UniStaker{salt: 0}(REWARDS_TOKEN, IERC20Delegates(address(GOVERNANCE_TOKEN)), ADMIN.addr));
        assert(uniStaker == address(UNI_STAKER));

        console2.log("Deploying V3 Factory Owner Contract: %s", address(V3_FACTORY_OWNER));
        address v3FactoryOwner = address(
            new V3FactoryOwner{salt: 0}(
                ADMIN.addr, IUniswapV3FactoryOwnerActions(address(0xdeadbeef)), REWARDS_TOKEN, 10 ** 19, UNI_STAKER
            )
        );
        assert(v3FactoryOwner == address(V3_FACTORY_OWNER));

        vm.stopBroadcast();

        vm.startBroadcast(ADMIN.privateKey);
        UNI_STAKER.setRewardNotifier({_rewardNotifier: ADMIN.addr, _isEnabled: true});
        UNI_STAKER.setRewardNotifier({_rewardNotifier: v3FactoryOwner, _isEnabled: true});
        vm.stopBroadcast();
    }
}
