import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import logoImg from '../../assets/ignite-logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Novo Transporte</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
          />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
