import type { Address } from "viem";

export type TallyDelegatee = { address: Address; label: string; votesCount: bigint };
