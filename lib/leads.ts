export type LeadStatus = "new" | "contacted" | "converted" | "not_interested"

export const LEAD_STATUSES: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "converted", label: "Converted" },
  { value: "not_interested", label: "Not Interested" },
]

export interface Lead {
  id: string
  name: string
  area: string
  phone: string
  status: LeadStatus
  created_at: string
}
