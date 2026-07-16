"use client"

import { useTransition } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LEAD_STATUSES, type LeadStatus } from "@/lib/leads"
import { updateLeadStatus } from "@/app/crm/actions"

export default function StatusSelect({ id, value }: { id: string; value: LeadStatus }) {
  const [isPending, startTransition] = useTransition()

  return (
    <Select
      value={value}
      onValueChange={(next) => startTransition(() => updateLeadStatus(id, next as LeadStatus))}
    >
      <SelectTrigger className={isPending ? "opacity-60" : undefined} disabled={isPending}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LEAD_STATUSES.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
