"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import CodeLock from '@/components/code-lock/code-lock'

export const ProtectionMobile = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isNewLanding = pathname === '/'
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  // const initialLockState = !localStorage.getItem('isUnlocked')
  const initialLockState = false
  const [isLocked, setIsLocked] = useState(initialLockState)
  const [showLock, setShowLock] = useState(initialLockState)

  const handleSuccess = () => {
    setIsLocked(false)
    setShowLock(false)
    localStorage.setItem('isUnlocked', 'true')
  }

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [])

  useEffect(() => {
    const isLandingPage = pathname === '/';
    const isMobileRedirectPage = pathname === '/mobile-redirect';

    if (isMobile && !isLandingPage && !isMobileRedirectPage) {
      router.push('/mobile-redirect');
    }
  }, [isMobile, pathname, router]);

  if (isNewLanding) {
    return <>{children} </>
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

  return <>{children} </>
}