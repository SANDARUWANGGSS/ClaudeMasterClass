import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HeistCard from '@/components/HeistCard'
import type { Heist } from '@/types/firestore'

const mockHeist: Heist = {
  id: 'mock-id',
  title: 'The Diamond Exchange',
  description: 'Infiltrate the downtown diamond exchange.',
  createdBy: 'uid-1',
  createdByCodename: 'GhostWalker',
  assignedTo: 'uid-2',
  assignedToCodename: 'SilverFox',
  deadline: new Date(Date.now() + 1000 * 60 * 60 * 48),
  finalStatus: null,
  createdAt: new Date(),
}

describe('HeistCard', () => {
  it('renders the title', () => {
    render(<HeistCard heist={mockHeist} />)
    expect(screen.getByText('The Diamond Exchange')).toBeInTheDocument()
  })

  it('renders title as a link to the heist detail page', () => {
    render(<HeistCard heist={mockHeist} />)
    const link = screen.getByRole('link', { name: 'The Diamond Exchange' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/heists/mock-id')
  })

  it('renders the assignee codename', () => {
    render(<HeistCard heist={mockHeist} />)
    expect(screen.getByText('SilverFox')).toBeInTheDocument()
  })

  it('renders the deadline', () => {
    render(<HeistCard heist={mockHeist} />)
    const formatted = new Date(mockHeist.deadline).toLocaleDateString()
    expect(screen.getByText(formatted)).toBeInTheDocument()
  })

  it('does not render a status badge when finalStatus is null', () => {
    render(<HeistCard heist={mockHeist} />)
    expect(screen.queryByText('success')).not.toBeInTheDocument()
    expect(screen.queryByText('failure')).not.toBeInTheDocument()
  })

  it('renders a success badge when finalStatus is "success"', () => {
    render(<HeistCard heist={{ ...mockHeist, finalStatus: 'success' }} />)
    expect(screen.getByText('success')).toBeInTheDocument()
  })

  it('renders a failure badge when finalStatus is "failure"', () => {
    render(<HeistCard heist={{ ...mockHeist, finalStatus: 'failure' }} />)
    expect(screen.getByText('failure')).toBeInTheDocument()
  })

  it('renders "Unassigned" when assignedToCodename is empty string', () => {
    render(<HeistCard heist={{ ...mockHeist, assignedToCodename: '' }} />)
    expect(screen.getByText('Unassigned')).toBeInTheDocument()
  })
})
