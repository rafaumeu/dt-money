import { CurrencyDollar } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionContext'
import { priceFormatter } from '../../utils/formatter'
import { SummaryCard, SummaryContainer } from './styles'

export function Summary() {
  const { report } = useContextSelector(
    TransactionsContext,
    (context) => context,
  )

  if (!report) {
    return null
  }

  // Calcular totais de transportes municipais e intermunicipais
  const { totalMunicipal, totalIntermunicipal } = report.dailyRecords.reduce(
    (acc, record) => {
      record.transports.forEach((transport) => {
        if (transport.type === 'municipal') {
          acc.totalMunicipal += transport.quantity * transport.unitPrice
        } else if (transport.type === 'intermunicipal') {
          acc.totalIntermunicipal += transport.quantity * transport.unitPrice
        }
      })
      return acc
    },
    { totalMunicipal: 0, totalIntermunicipal: 0 },
  )

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <p>Total Municipal</p>
          <CurrencyDollar size={32} color={'#fff'} />
        </header>
        <strong>{priceFormatter.format(totalMunicipal)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <p>Total Intermunicipal</p>
          <CurrencyDollar size={32} color={'#fff'} />
        </header>
        <strong>{priceFormatter.format(totalIntermunicipal)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <p>Total Geral</p>
          <CurrencyDollar size={32} color={'#fff'} />
        </header>
        <strong>
          {priceFormatter.format(totalMunicipal + totalIntermunicipal)}
        </strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
