import * as Dialog from '@radix-ui/react-dialog'
import logoImg from '../../assets/ignite-logo.svg'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Close />
              <Dialog.Title>Nova Transação</Dialog.Title>
              
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}