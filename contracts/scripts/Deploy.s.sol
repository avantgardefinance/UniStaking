// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import "forge-std/console2.sol";
import {Script} from "./shared/Script.sol";
import {UniStaker} from "src/UniStaker.sol";
import {IUniswapV3FactoryOwnerActions} from "src/interfaces/IUniswapV3FactoryOwnerActions.sol";
import {V3FactoryOwner} from "src/V3FactoryOwner.sol";
import {ERC20VotesMock} from "test/mocks/MockERC20Votes.sol";
import {ERC20Fake} from "test/fakes/ERC20Fake.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast(DEPLOYER.privateKey);

        console2.log("Deploying Rewards Token Contract: %s", address(REWARDS_TOKEN));
        address rewardsToken = address(new ERC20Fake{salt: 0}());
        assert(rewardsToken == address(REWARDS_TOKEN));

        console2.log("Deploying Governance Token Contract: %s", address(GOVERNANCE_TOKEN));
        address governanceToken = address(new ERC20VotesMock{salt: 0}());
        assert(governanceToken == address(GOVERNANCE_TOKEN));

        console2.log("Deploying Uniswap Staking Contract: %s", address(UNI_STAKER));
        address uniStaker = address(new UniStaker{salt: 0}(REWARDS_TOKEN, GOVERNANCE_TOKEN, ADMIN.addr));
        assert(uniStaker == address(UNI_STAKER));

        console2.log("Deploying V3 Factory Owner Contract: %s", address(V3_FACTORY_OWNER));
        address V3_FACTORY_OWNER =
            address(new V3FactoryOwner{salt: 0}(ADMIN.addr, IUniswapV3FactoryOwnerActions(address(0xdeadbeef)), REWARDS_TOKEN, 10 ** 19, UNI_STAKER));
        assert(uniStaker == address(UNI_STAKER));

        vm.stopBroadcast();

        vm.startBroadcast(ADMIN.privateKey);
        UNI_STAKER.setRewardNotifier({_rewardNotifier: ADMIN.addr, _isEnabled: true});
        UNI_STAKER.setRewardNotifier({_rewardNotifier: V3_FACTORY_OWNER, _isEnabled: true});
        vm.stopBroadcast();
    }
}
