// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {Script as ForgeScript} from "forge-std/Script.sol";

import {Script} from "./shared/Script.sol";

contract Notify is Script {
    function notify(uint256 _amount) external {
        deal({
            token: address(REWARDS_TOKEN),
            to: address(UNI_STAKER),
            give: _amount
        });

        UNI_STAKER.claimReward();

        vm.startPrank(REWARDS_NOTIFIER);

        UNI_STAKER.notifyRewardsAmount(_amount);
    }
}
