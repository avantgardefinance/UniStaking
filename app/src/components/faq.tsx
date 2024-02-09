import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

export function FAQ() {
  return (
    <Card>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is staking?</AccordionTrigger>
            <AccordionContent>TODO</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How and why staking in Uniswap?</AccordionTrigger>
            <AccordionContent>TODO</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What are rewards?</AccordionTrigger>
            <AccordionContent>
              Staking rewards are an incentive that blockchains provide to participants. Each blockchain has a set
              amount of crypto rewards for validating a block of transactions. When you stake crypto and you&apos;re
              chosen to validate transactions, you receive those crypto rewards.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
