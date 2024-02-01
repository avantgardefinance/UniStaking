// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "./shared/Script.sol";
import {UniStaker} from "scopelift/src/UniStaker.sol";
import {ERC20VotesMock} from "scopelift/test/mocks/MockERC20Votes.sol";
import {ERC20Fake} from "scopelift/test/fakes/ERC20Fake.sol";

contract Seed is Script {
    function run() external {
      stake(0, 321e18, address(0xdeadbeef));
      stake(1, 123e18, address(0xb0b));
      stake(2, 456e18, address(0xa11c3));
    }
}
