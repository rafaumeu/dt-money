import styled from 'styled-components'

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
}

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

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  @media (max-width: ${breakpoints.tablet}) {
    border-spacing: 0 0.25rem;
    margin-top: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.875rem;
  }

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    @media (max-width: ${breakpoints.tablet}) {
      padding: 0.75rem 1rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      padding: 0.5rem 0.75rem;
    }
  }

  // Melhor tratamento para descrição em mobile
  td:nth-child(2) {
    max-width: 300px; // Limita largura da descrição
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: ${breakpoints.mobile}) {
      max-width: 150px; // Ajuste para mobile
    }
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.875rem;
  }
`

export const TableWrapper = styled.div`
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    overflow-x: auto;
  }
`
