import styled from 'styled-components'

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`
interface PaginationButtonProps {
  $active?: boolean
}
export const PaginationButton = styled.button<PaginationButtonProps>`
  background: ${(props) =>
    props.$active ? props.theme['green-500'] : props.theme['gray-600']};
  color: ${(props) =>
    props.$active ? props.theme.white : props.theme['gray-100']};
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background: ${(props) =>
      props.$active ? props.theme['green-700'] : props.theme['gray-500']};
  }
`
