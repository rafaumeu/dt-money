import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import styled from 'styled-components'

// Interfaces para tipagem
interface TransactionTypeButtonProps {
  $isActive: boolean
  $variant: 'municipal' | 'intermunicipal'
}

interface ActionButtonProps {
  variant?: 'edit' | 'delete'
}

// Breakpoints para responsividade
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
}

// Função auxiliar para cores dos botões
const getButtonColor = (theme: any, variant?: 'edit' | 'delete') => {
  switch (variant) {
    case 'edit':
      return theme['yellow-500']
    case 'delete':
      return theme['red-500']
    default:
      return theme['gray-300']
  }
}

// Container principal
export const TransactionsContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;

  @media (max-width: ${breakpoints.tablet}) {
    margin: 2rem auto 0;
    padding: 0 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin: 1rem auto 0;
    padding: 0 0.5rem;
  }
`

// Estilos da tabela
export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;
  background: ${({ theme }) => theme['gray-700']};
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    border-spacing: 0 0.25rem;
    margin-top: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.875rem;
  }

  thead {
    background: ${({ theme }) => theme['gray-600']};
    color: ${({ theme }) => theme['gray-100']};
  }

  th {
    padding: 1.25rem 2rem;
    text-align: left;
    font-weight: 500;

    @media (max-width: ${breakpoints.tablet}) {
      padding: 0.75rem 1rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      padding: 0.5rem 0.75rem;
    }
  }

  tbody tr {
    transition: background-color 0.2s;

    &:hover {
      background: ${({ theme }) => theme['gray-600']};
    }
  }

  td {
    padding: 1.25rem 2rem;
    background: ${({ theme }) => theme['gray-700']};

    @media (max-width: ${breakpoints.tablet}) {
      padding: 0.75rem 1rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      padding: 0.5rem 0.75rem;
    }

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

// Wrapper da tabela para responsividade
export const TableWrapper = styled.div`
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    overflow-x: auto;
  }
`

// Botões de ação (editar e remover)
export const ActionButton = styled.button<ActionButtonProps>`
  background: transparent;
  border: 0;
  color: ${({ theme, variant }) => getButtonColor(theme, variant)};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover {
    background: ${({ theme, variant }) =>
      variant === 'edit'
        ? theme['yellow-300'] // Cor do lápis no hover (amarelo mais claro)
        : variant === 'delete'
          ? theme['red-300'] // Cor da lixeira no hover (vermelho mais claro)
          : theme['gray-100']};
    // Cor padrão no hover
  }

  &:focus {
    box-shadow: 0 0 0 2px
      ${({ theme, variant }) =>
        variant === 'edit'
          ? theme['yellow-500'] // Cor do foco (amarelo)
          : variant === 'delete'
            ? theme['red-500'] // Cor do foco (vermelho)
            : theme['green-500']}; // Cor padrão do foco
  }

  & + & {
    margin-left: 0.5rem;
  }
`

// Estilos do ícone de transporte
export const TransportIcon = styled.span<{ type: string }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme, type }) =>
    type === 'municipal' ? theme['green-500'] : theme['blue-500']};
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;

  svg {
    width: 16px;
    height: 16px;
  }
`

// Estilos do diálogo
export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${({ theme }) => theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${({ theme }) => theme['gray-900']};
      color: ${({ theme }) => theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${({ theme }) => theme['gray-500']};
      }

      &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme['gray-500']};
      }
    }

    button[type='submit'] {
      height: 50px;
      border: 0;
      background: ${({ theme }) => theme['green-500']};
      color: ${({ theme }) => theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${({ theme }) => theme['green-700']};
        transition: background-color 0.2s;
      }

      &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme['green-300']};
      }
    }
  }
`

// Botão de fechar do diálogo
export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${({ theme }) => theme['gray-500']};

  &:hover {
    color: ${({ theme }) => theme['gray-300']};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme['gray-500']};
  }
`

// Estilos do botão de tipo de transação
export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  background: ${({ theme }) => theme['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  border: 0;
  color: ${({ theme }) => theme['gray-300']};
  cursor: pointer;

  svg {
    color: ${({ $variant, theme }) =>
      $variant === 'municipal' ? theme['green-300'] : theme['red-300']};
  }

  &[data-state='unchecked']:hover {
    background: ${({ theme }) => theme['gray-600']};
    transition: background-color 0.2s;
  }

  &[data-state='checked'] {
    color: ${({ theme }) => theme.white};
    background: ${({ $variant, theme }) =>
      $variant === 'municipal' ? theme['green-500'] : theme['red-500']};

    svg {
      color: ${({ theme }) => theme.white};
    }
  }
`

// Mensagem de erro
export const ErrorMessage = styled('span')`
  color: ${({ theme }) => theme['red-500']};
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`
// Célula de ações (para os botões de editar e remover)
export const ActionsCell = styled.td`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; // Espaçamento entre os botões
  align-items: center; // Centraliza os botões horizontalmente
  justify-content: center; // Centraliza os botões verticalmente
`
