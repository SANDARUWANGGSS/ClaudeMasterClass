import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HeistCardSkeleton from '@/components/HeistCardSkeleton'

describe('HeistCardSkeleton', () => {
  it('renders without errors', () => {
    render(<HeistCardSkeleton />)
  })

  it('renders the title placeholder', () => {
    render(<HeistCardSkeleton />)
    expect(screen.getByTestId('skeleton-title')).toBeInTheDocument()
  })

  it('renders the badge placeholder', () => {
    render(<HeistCardSkeleton />)
    expect(screen.getByTestId('skeleton-badge')).toBeInTheDocument()
  })

  it('renders three description line placeholders', () => {
    render(<HeistCardSkeleton />)
    expect(screen.getAllByTestId('skeleton-line')).toHaveLength(3)
  })

  it('renders the assignee placeholder', () => {
    render(<HeistCardSkeleton />)
    expect(screen.getByTestId('skeleton-assignee')).toBeInTheDocument()
  })

  it('renders the deadline placeholder', () => {
    render(<HeistCardSkeleton />)
    expect(screen.getByTestId('skeleton-deadline')).toBeInTheDocument()
  })
})
