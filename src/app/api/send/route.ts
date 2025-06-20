import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { promises as fs } from 'fs'
import path from 'path'

import { EmailTemplate } from '@/components/email-template'
const emailTo = process.env.EMAIL_TO || ''

const resend = new Resend(process.env.RESEND_API_KEY);

async function getStoredEmails() {
  const filePath = path.join(process.cwd(), 'src/app/api/send/emails.json')
  try {
    const data = await fs.readFile(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error: any) {
    return { emails: [] }
  }
}

async function saveEmail(email: string) {
  if (!email) return false;

  const filePath = path.join(process.cwd(), 'src/app/api/send/emails.json')
  const data = await getStoredEmails()
  if (!data.emails.includes(email)) {
    data.emails.push(email)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    return true
  }
  return false
}

async function removeEmail(email: string) {
  if (!email) return;

  const filePath = path.join(process.cwd(), 'src/app/api/send/emails.json')
  const data = await getStoredEmails()
  data.emails = data.emails.filter((e: string) => e !== email)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

export async function GET() {
  const emails = await getStoredEmails()
  return NextResponse.json(emails)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email } = body

  try {
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const isNewEmail = await saveEmail(email)

    if (!isNewEmail) {
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

    return NextResponse.json({
      message: 'Email registered successfully',
      data
    })
  } catch (error) {
    console.error('Error:', error)
    removeEmail(email)
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}