import { PaginationButton, PaginationContainer } from './styles'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}
export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const generatePageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }
  return (
    <PaginationContainer>
      {generatePageNumbers().map((page) => (
        <PaginationButton
          key={page}
          onClick={() => onPageChange(page)}
          $active={page === currentPage}
        >
          {page}
        </PaginationButton>
      ))}
    </PaginationContainer>
  )
}
