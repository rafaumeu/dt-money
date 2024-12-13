import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionContext'
import { SummaryCard, SummaryContainer } from './styles'

export function Summary() {
  const {transactions} = useContext(TransactionsContext)
  const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'income') {
      acc.income += transaction.price
      acc.total += transaction.price
    }
    if(transaction.type === 'outcome') {
      acc.outcome += transaction.price
      acc.total -= transaction.price
    }
    acc.total = acc.income - acc.outcome
    return acc
  }, {
    income:0,
    outcome:0, 
    total:0
    }
  )
  return(
    <SummaryContainer>
      <SummaryCard>
        <header>
          <p>Entradas</p>
          <ArrowCircleUp size={32} color="#00B37E" />
        </header>
        <strong>{summary.income}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <p>Saídas</p>
          <ArrowCircleDown size={32} color="#F75A68" />
        </header>
        <strong>{summary.outcome}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <p>Total</p>
          <CurrencyDollar size={32} color={'#fff'}/>
        </header>
        <strong>{summary.total}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}