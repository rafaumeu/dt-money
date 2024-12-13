import styled from 'styled-components'
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
}
export const HeaderContainer = styled.header`
  background: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem 0 4.5rem;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem 0 3rem;
  }
`
export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }
`
export const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    height: 44px;
    font-size: 0.875rem;
  }

  &:hover {
    background: ${(props) => props.theme['green-700']};
    transition: background-color 0.2s;
  }
`
