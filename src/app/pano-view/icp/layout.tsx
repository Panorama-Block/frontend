import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panorama Block - ICP',
  description: 'Internet Computer Protocol analytics and insights',
  icons: {
    icon: '/icp.ico',
  },
}

export default function ICPLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}