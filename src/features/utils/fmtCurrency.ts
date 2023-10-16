export const fmtCurrency = (
  value: number | null,
  nullValue = 'N/A' // We default to N/A for null values
): string => {
  if (value === null) return nullValue
  const formatter = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
  })
  return formatter.format(value)
}
