import { Jazzicon } from "@/components/ui/jazzicon"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const stakedAmounts = [
  {
    id: "1",
    amount: "200",
    owner: "0x32efef8899b23899ff179b446ef7564e0de84cba",
    delegatee: "0x32efef8899b23899ff179b446ef7564e0de84cba",
    beneficiary: "0x32efef8899b23899ff179b446ef7564e0de84cba"
  }
] as const // will be fetched from subgraph

export function StakedAmountsTable() {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold">Staked Amounts</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Delegatee</TableHead>
            <TableHead>Beneficiary</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stakedAmounts.map((stakedAmount) => (
            <TableRow key={stakedAmount.id}>
              <TableCell className="font-medium">{stakedAmount.amount}</TableCell>
              <TableCell>
                <Jazzicon size={16} address={stakedAmount.owner} />
              </TableCell>
              <TableCell>{stakedAmount.paymentMethod}</TableCell>
              <TableCell className="text-right">{stakedAmount.totalAmount}</TableCell>
              <TableCell className="text-right">{stakedAmount.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
