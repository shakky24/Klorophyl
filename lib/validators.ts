export type FieldName = "name" | "area" | "phone"

export const validators: Record<FieldName, (value: string) => true | string> = {
  name: (value) => value.trim().length > 0 || "Please enter your name",
  area: (value) => value.trim().length > 0 || "Please enter your area",
  phone: (value) => /^\+?[0-9\s]{7,15}$/.test(value.trim()) || "Please enter a valid phone number",
}
