export function firstName(nameEn: string): string {
  const parts = nameEn.trim().split(/\s+/)
  return parts[parts.length - 1] ?? nameEn
}

export function lowerDateLine(line: string): string {
  return line.toLowerCase()
}
