'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import CodeLock from '../code-lock/code-lock'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const pathname = usePathname()
  const isNewLanding = pathname === '/new-landing'

  const initialLockState = !localStorage.getItem('isUnlocked')
  const [isLocked, setIsLocked] = useState(initialLockState)
  const [showLock, setShowLock] = useState(initialLockState)

  if (isNewLanding) {
    return <>{children}</>
  }

  const handleSuccess = () => {
    setIsLocked(false)
    setShowLock(false)
    localStorage.setItem('isUnlocked', 'true')
  }

  if (isLocked) {
    return (
      <CodeLock
        isOpen={showLock}
        onClose={() => { }}
        onSuccess={handleSuccess}
      />
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
