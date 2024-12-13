import styled, { css } from 'styled-components'

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
}

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: -3rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: -2rem;
    padding: 0 1rem;
  }
`

interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme['gray-600']};
  border-radius: 6px;

  padding: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme['gray-300']};

    @media (max-width: ${breakpoints.mobile}) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.6;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 1.5rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.25rem;
      margin-top: 0.5rem;
    }
  }

  ${(props) =>
    props.variant === 'green' &&
    css`
      background: ${(props) => props.theme['green-700']};
    `}

  // Ícone do header
  svg {
    @media (max-width: ${breakpoints.mobile}) {
      width: 20px;
      height: 20px;
    }
  }
`
