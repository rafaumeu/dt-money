import styled from 'styled-components'

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
}
export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 0.5rem;
  }

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;
    @media (max-width: ${breakpoints.mobile}) {
      padding: 0.75rem;
      font-size: 0.875rem;
    }
    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
      @media (max-width: ${breakpoints.mobile}) {
        font-size: 0.875rem;
      }
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border: 0;
    padding: 1rem;
    background: transparent;
    border: 1px solid ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme['green-300']};
    font-weight: bold;
    border-radius: 6px;
    white-space: nowrap;

    @media (max-width: ${breakpoints.mobile}) {
      padding: 0.75rem;
      font-size: 0.875rem;
      gap: 0.5rem;
    }
    cursor: pointer;
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-500']};
      border-color: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      transition:
        background-color 0.2s,
        color 0.2s,
        border-color 0.2s;
    }
    @media (max-width: ${breakpoints.tablet}) {
      width: 100%;
      justify-content: center;
    }
  }
`
