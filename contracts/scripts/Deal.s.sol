// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "./shared/Script.sol";
import {UniStaker} from "scopelift/src/UniStaker.sol";
import {ERC20VotesMock} from "scopelift/test/mocks/MockERC20Votes.sol";
import {ERC20Fake} from "scopelift/test/fakes/ERC20Fake.sol";

contract Deal is Script {
    function run(uint32 index) external {
        deal(index, 10000e18);
    }
}
