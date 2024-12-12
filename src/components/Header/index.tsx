import logoImg from '../../assets/ignite-logo.svg'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <NewTransactionButton>Nova Transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}