import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionContext'

export function UseSummary() {
  const transactions = useContextSelector(
    TransactionsContext,
    (context) => context.transactions,
  )
  const summary = useMemo(() => {
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
  }, [transactions])
  return summary
}
