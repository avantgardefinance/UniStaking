import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { BeneficiaryAltered } from "../generated/schema"
import { BeneficiaryAltered as BeneficiaryAlteredEvent } from "../generated/UniStaker/UniStaker"
import { handleBeneficiaryAltered } from "../src/unistaker"
import { createBeneficiaryAlteredEvent } from "./unistaker.utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let depositId = BigInt.fromI32(234)
    let oldBeneficiary = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newBeneficiary = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newBeneficiaryAlteredEvent = createBeneficiaryAlteredEvent(
      depositId,
      oldBeneficiary,
      newBeneficiary
    )
    handleBeneficiaryAltered(newBeneficiaryAlteredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BeneficiaryAltered created and stored", () => {
    assert.entityCount("BeneficiaryAltered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BeneficiaryAltered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "depositId",
      "234"
    )
    assert.fieldEquals(
      "BeneficiaryAltered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "oldBeneficiary",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BeneficiaryAltered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newBeneficiary",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
