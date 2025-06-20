'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface EmailModalProps {
  onSubmit: (email: string) => void
}

export function EmailModal({ onSubmit }: EmailModalProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!email) {
      setError('Please enter your email')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }

    onSubmit(email)
  }

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='text-black'>Welcome to Panorama Block</DialogTitle>
          <DialogDescription>
            Please provide your email for access
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-2">
          <div className="grid gap-2">
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              className={error ? 'border-red-500' : ''}
            />
            {error && (
              <span className="text-sm text-red-500">{error}</span>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button className='w-full' onClick={handleSubmit}>
            Access Dossier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
