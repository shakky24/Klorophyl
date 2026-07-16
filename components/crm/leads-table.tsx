import { differenceInDays } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Lead } from "@/lib/leads"
import StatusSelect from "@/components/crm/status-select"

function daysSinceLabel(createdAt: string) {
  const days = differenceInDays(new Date(), new Date(createdAt))
  if (days <= 0) return "Today"
  if (days === 1) return "1 day ago"
  return `${days} days ago`
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return <p className="text-sm text-gray-500">No leads yet.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Area</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Days Since</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell className="font-medium">{lead.name}</TableCell>
            <TableCell>{lead.area}</TableCell>
            <TableCell>{lead.phone}</TableCell>
            <TableCell>{daysSinceLabel(lead.created_at)}</TableCell>
            <TableCell>
              <StatusSelect id={lead.id} value={lead.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
