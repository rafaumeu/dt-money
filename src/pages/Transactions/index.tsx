import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TableWrapper,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const { transactions, totalTransactions, fetchTransactions, currentPage } =
    useContextSelector(TransactionsContext, (context) => context)
  const handlePageChange = (page: number) => {
    fetchTransactions(undefined, page)
  }
  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TableWrapper>
          <TransactionsTable>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td width="50%">{transaction.description}</td>
                    <td>
                      <PriceHighlight variant={transaction.type}>
                        {transaction.type === 'outcome' && '- '}
                        {priceFormatter.format(transaction.price)}
                      </PriceHighlight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                      {dateFormatter.format(new Date(transaction.createdAt))}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </TransactionsTable>
        </TableWrapper>
        <Pagination
          currentPage={currentPage}
          totalItems={totalTransactions}
          itemsPerPage={10}
          onPageChange={handlePageChange}
        />
      </TransactionsContainer>
    </div>
  )
}
