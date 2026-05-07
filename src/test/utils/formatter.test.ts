import { describe, it, expect } from 'vitest'
import { dateFormatter, priceFormatter } from '../../utils/formatter'

describe('priceFormatter', () => {
  it('should format a positive number as BRL currency', () => {
    const result = priceFormatter.format(1000)
    expect(result).toContain('1.000')
  })

  it('should format zero', () => {
    const result = priceFormatter.format(0)
    // In pt-BR locale, zero is "R$ 0,00"
    expect(result).toMatch(/0,00/)
  })

  it('should format decimal values', () => {
    const result = priceFormatter.format(12.5)
    expect(result).toContain('12,50')
  })

  it('should format large numbers', () => {
    const result = priceFormatter.format(1000000)
    expect(result).toContain('1.000.000')
  })

  it('should format negative numbers', () => {
    const result = priceFormatter.format(-500)
    expect(result).toContain('-')
    expect(result).toContain('500')
  })
})

describe('dateFormatter', () => {
  it('should format a date in pt-BR format (dd/mm/yyyy)', () => {
    const date = new Date('2024-01-15T10:00:00')
    const result = dateFormatter.format(date)
    expect(result).toContain('15')
    expect(result).toContain('01')
    expect(result).toContain('2024')
  })

  it('should format the first day of the year', () => {
    const date = new Date(2023, 0, 1) // Jan 1 local time
    const result = dateFormatter.format(date)
    expect(result).toContain('01')
    expect(result).toContain('2023')
  })

  it('should format the last day of the year', () => {
    const date = new Date(2023, 11, 31) // Dec 31 local time
    const result = dateFormatter.format(date)
    expect(result).toContain('31')
    expect(result).toContain('2023')
  })
})
