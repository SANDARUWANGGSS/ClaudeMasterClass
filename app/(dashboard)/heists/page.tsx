'use client'

import { useState, useEffect } from 'react'
import type { Heist } from '@/types/firestore'
import HeistCard from '@/components/HeistCard'
import HeistCardSkeleton from '@/components/HeistCardSkeleton'

const MOCK_HEISTS: Heist[] = [
  {
    id: 'heist-1',
    title: 'The Diamond Exchange',
    description: 'Infiltrate the downtown diamond exchange and extract the Vanderbilt collection before the annual audit triggers a lockdown.',
    createdBy: 'uid-1',
    createdByCodename: 'GhostWalker',
    assignedTo: 'uid-2',
    assignedToCodename: 'SilverFox',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 48), // 48 hours from now
    finalStatus: null,
    createdAt: new Date(),
  },
  {
    id: 'heist-2',
    title: 'Offshore Account Sweep',
    description: 'Access the Cayman Islands routing servers and redirect dormant funds before the quarterly reconciliation window closes.',
    createdBy: 'uid-1',
    createdByCodename: 'GhostWalker',
    assignedTo: '',
    assignedToCodename: '',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    finalStatus: null,
    createdAt: new Date(),
  },
  {
    id: 'heist-3',
    title: 'The Museum Night',
    description: 'Extract three paintings from the east wing during the charity gala. Security rotates at 22:00.',
    createdBy: 'uid-2',
    createdByCodename: 'SilverFox',
    assignedTo: 'uid-3',
    assignedToCodename: 'NightOwl',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 72), // 72 hours from now
    finalStatus: 'success',
    createdAt: new Date(),
  },
  {
    id: 'heist-4',
    title: 'Vault Zero',
    description: 'Breach the underground vault beneath Central Station. Intel suggests a 6-minute window between guard rotations.',
    createdBy: 'uid-3',
    createdByCodename: 'NightOwl',
    assignedTo: 'uid-1',
    assignedToCodename: 'GhostWalker',
    deadline: new Date(Date.now() - 1000 * 60 * 60 * 24), // EXPIRED: 24 hours ago
    finalStatus: 'failure',
    createdAt: new Date(),
  },
]

export default function HeistsPage() {
  const [heists, setHeists] = useState<Heist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeists(MOCK_HEISTS)
      setLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const visibleHeists = heists.filter(h => h.deadline > new Date())

  return (
    <div className="page-content">
      <h2>Active Heists</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.25rem',
        marginTop: '1.5rem',
      }}>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <HeistCardSkeleton key={i} />
          ))
        ) : visibleHeists.length > 0 ? (
          visibleHeists.map(h => (
            <HeistCard key={h.id} heist={h} />
          ))
        ) : (
          <p style={{ color: '#99A1AF', gridColumn: '1 / -1' }}>No active heists.</p>
        )}
      </div>
    </div>
  )
}
