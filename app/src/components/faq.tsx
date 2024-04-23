import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function FAQ() {
  return (
    <Card>
      <CardContent>
        <Accordion type="single" collapsible={true} className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Uniswap staking?</AccordionTrigger>
            <AccordionContent>
              The Uniswap protocol collects a small fee on trades through some of its liquidity pools. Those fees are
              distributed in WETH to UNI token holders in exchange for delegating their votes and depositing UNI into
              the staking contract. A well-governed protocol is more likely to find success and increase the volume that
              flows through it, so UNI stakers are incentivized to delegate to the most effective governance
              participants.{" "}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How do I find out more about delegatees and the governance process in general?
            </AccordionTrigger>
            <AccordionContent>
              <Link href="http://vote.uniswapfoundation.org">Uniswap Agora</Link> is a platform where delegatees can
              build profiles which describe their values and discuss their governance activities.{" "}
              <Link href="http://tally.xyz/gov/uniswap">Tally</Link>, whose{" "}
              <Link href="https://apidocs.tally.xyz/">API</Link> powers parts of this app, is another place to explore
              governance delegates. The Uniswap Governance Process is described{" "}
              <Link href="https://gov.uniswap.org/t/community-governance-process-update-jan-2023/19976">here</Link>. In
              general, a “proposal” that involves the Uniswap Governance contracts executing some on-chain function can
              be put forward by anyone. The process is designed so that any credible proposal should generate discussion
              amongst delegates and move forward if there is some level of consensus. There are various off-chain stages
              to gauge that consensus that must be passed before an on-chain vote is ultimately posted.{" "}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How do rewards get distributed?</AccordionTrigger>
            <AccordionContent>
              Stakers receive their pro-rata share of rewards earned while they stake. The rate of rewards varies on a
              number of factors, including how much volume is flowing through the protocol. There is no time constraint
              to staking. You could stake and delegate 1 UNI in one block, and unstake it ein the next. If there were 99
              other UNI staked, you would earn 1% of the rewards distributed during that block. For a technical
              description of the staking mechanism, please visit the documentation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Which pools earn fees?</AccordionTrigger>
            <AccordionContent>
              The roll-out of protocol fees will be incremental and data-driven. Gauntlet has suggested a framework to
              guide this process, which will occur over the course of several months and start with a limited number of
              pools. Given this conservative approach, it is likely that stakers’ earnings will be quite low for the
              foreseeable future. You can monitor which pools are currently charging fees as well as various analytics
              about the protocol fee here.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
