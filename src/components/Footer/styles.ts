import styled from 'styled-components'

export const FooterContainer = styled.footer`
  width: 100%;
  padding: 2rem 1.5rem;
  margin-top: 4rem;
  border-top: 1px solid ${(props) => props.theme['gray-600']};
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding: 1.5rem 1rem;
  }
`

export const FooterContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`

export const FooterText = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.theme['gray-400']};
`

export const FooterLink = styled.a`
  font-size: 0.875rem;
  color: ${(props) => props.theme['green-300']};
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`
