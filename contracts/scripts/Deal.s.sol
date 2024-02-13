// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "./shared/Script.sol";

contract Deal is Script {
    function run(uint32 index) external {
        dealToDerivedKey(index, 10000e18);
    }
}
