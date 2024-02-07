// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "./shared/Script.sol";
import {UniStaker} from "src/UniStaker.sol";
import {ERC20VotesMock} from "test/mocks/MockERC20Votes.sol";
import {ERC20Fake} from "test/fakes/ERC20Fake.sol";

contract Deal is Script {
    function run(uint32 index) external {
        dealToDerivedKey(index, 10000e18);
    }
}
