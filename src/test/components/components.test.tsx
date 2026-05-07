import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../../styles/themes/default'

// Mock react-router-dom to avoid BrowserRouter issues
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
}))

// Helper to wrap components with ThemeProvider (required for styled-components)
function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>)
}

// --- Footer Component ---
import { Footer } from '../../components/Footer'

describe('Footer component', () => {
  it('should render the author name', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByText('Built by Rafael Zendron')).toBeInTheDocument()
  })

  it('should render the GitHub link', () => {
    renderWithTheme(<Footer />)
    const githubLink = screen.getByText('GitHub')
    expect(githubLink).toBeInTheDocument()
    expect(githubLink.closest('a')).toHaveAttribute('href', 'https://github.com/rafaumeu/dt-money')
  })

  it('should render the Portfolio link', () => {
    renderWithTheme(<Footer />)
    const portfolioLink = screen.getByText('Portfolio')
    expect(portfolioLink).toBeInTheDocument()
    expect(portfolioLink.closest('a')).toHaveAttribute('href', 'https://portfoliodev-blush-pi.vercel.app')
  })

  it('should render links with target="_blank" and rel="noopener noreferrer"', () => {
    renderWithTheme(<Footer />)
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})

// --- Pagination Component ---
import { Pagination } from '../../components/Pagination'

describe('Pagination component', () => {
  it('should render correct number of page buttons', () => {
    renderWithTheme(
      <Pagination currentPage={1} totalItems={30} itemsPerPage={10} onPageChange={() => {}} />,
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3) // 30 items / 10 per page = 3 pages
  })

  it('should render a single page when items fit in one page', () => {
    renderWithTheme(
      <Pagination currentPage={1} totalItems={5} itemsPerPage={10} onPageChange={() => {}} />,
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveTextContent('1')
  })

  it('should render correct page numbers', () => {
    renderWithTheme(
      <Pagination currentPage={1} totalItems={25} itemsPerPage={10} onPageChange={() => {}} />,
    )
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should call onPageChange when a page button is clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    renderWithTheme(
      <Pagination currentPage={1} totalItems={20} itemsPerPage={10} onPageChange={onPageChange} />,
    )
    await user.click(screen.getByText('2'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('should handle zero items gracefully', () => {
    renderWithTheme(
      <Pagination currentPage={1} totalItems={0} itemsPerPage={10} onPageChange={() => {}} />,
    )
    // Math.ceil(0/10) = 0, so the loop generates pages 1..0 = no pages
    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })
})
