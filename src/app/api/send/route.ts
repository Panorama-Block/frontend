import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { EmailTemplate } from '@/components/email-template'
import { saveEmail } from '@/lib/blob-emails'

const emailTo = process.env.EMAIL_TO || ''
const resend = new Resend(process.env.RESEND_API_KEY)

import { getEmails } from '@/lib/blob-emails'

export async function GET() {
  const emails = await getEmails()
  return NextResponse.json({ emails })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email } = body

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    const isNew = await saveEmail(email)

    if (!isNew) {
      return NextResponse.json(
        { message: 'Email already registered', alreadyRegistered: true },
        { status: 200 }
      )
    }

    const { data } = await resend.emails.send({
      from: 'Panorama Block <mail-collector@panoramablock.com>',
      to: [emailTo],
      subject: 'New email received',
      react: EmailTemplate({ title: 'A new email has been received', description: `Email: ${email}` }),
    })

    return NextResponse.json({ message: 'Email registered successfully', data })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
