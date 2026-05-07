import { describe, it, expect } from 'vitest'

// Pure function that replicates the summary reduce logic from useSummary hook
interface Transaction {
  type: 'income' | 'outcome'
  price: number
}

function calculateSummary(transactions: Transaction[]) {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price
        acc.total += transaction.price
      }
      if (transaction.type === 'outcome') {
        acc.outcome += transaction.price
        acc.total -= transaction.price
      }
      acc.total = acc.income - acc.outcome
      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )
}

describe('calculateSummary (summary reduce logic)', () => {
  it('should return zeros when there are no transactions', () => {
    const result = calculateSummary([])
    expect(result).toEqual({ income: 0, outcome: 0, total: 0 })
  })

  it('should calculate income from income transactions', () => {
    const transactions = [
      { type: 'income' as const, price: 1000 },
      { type: 'income' as const, price: 2000 },
    ]
    const result = calculateSummary(transactions)
    expect(result.income).toBe(3000)
    expect(result.outcome).toBe(0)
    expect(result.total).toBe(3000)
  })

  it('should calculate outcome from outcome transactions', () => {
    const transactions = [
      { type: 'outcome' as const, price: 500 },
      { type: 'outcome' as const, price: 200 },
    ]
    const result = calculateSummary(transactions)
    expect(result.income).toBe(0)
    expect(result.outcome).toBe(700)
    expect(result.total).toBe(-700)
  })

  it('should calculate total as income minus outcome with mixed transactions', () => {
    const transactions = [
      { type: 'income' as const, price: 5000 },
      { type: 'outcome' as const, price: 1500 },
      { type: 'income' as const, price: 500 },
      { type: 'outcome' as const, price: 300 },
    ]
    const result = calculateSummary(transactions)
    expect(result.income).toBe(5500)
    expect(result.outcome).toBe(1800)
    expect(result.total).toBe(3700)
  })

  it('should handle a single income transaction', () => {
    const result = calculateSummary([{ type: 'income', price: 750 }])
    expect(result).toEqual({ income: 750, outcome: 0, total: 750 })
  })

  it('should handle a single outcome transaction', () => {
    const result = calculateSummary([{ type: 'outcome', price: 250 }])
    expect(result).toEqual({ income: 0, outcome: 250, total: -250 })
  })

  it('should handle decimal values correctly', () => {
    const transactions = [
      { type: 'income' as const, price: 100.5 },
      { type: 'outcome' as const, price: 33.33 },
    ]
    const result = calculateSummary(transactions)
    expect(result.income).toBeCloseTo(100.5)
    expect(result.outcome).toBeCloseTo(33.33)
    expect(result.total).toBeCloseTo(67.17)
  })

  it('should produce total of 0 when income equals outcome', () => {
    const transactions = [
      { type: 'income' as const, price: 1000 },
      { type: 'outcome' as const, price: 1000 },
    ]
    const result = calculateSummary(transactions)
    expect(result.total).toBe(0)
  })
})
