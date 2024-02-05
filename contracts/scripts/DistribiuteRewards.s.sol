// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {Script as ForgeScript} from "forge-std/Script.sol";

import {Script} from "./shared/Script.sol";

contract DistribiuteRewards is Script {
    function run(uint256 _amount) external {
        distribiuteRewards(_amount);
    }
}
