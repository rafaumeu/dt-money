import { ThemeProvider } from 'styled-components'
import { Footer } from './components/Footer'
import { TransactionsProvider } from './contexts/TransactionContext'
import { Transactions } from './pages/Transactions'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionsProvider>
        <Transactions />
        <Footer />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
