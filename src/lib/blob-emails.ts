import { put, list } from '@vercel/blob'

const FILE_PATH = 'emails.json'

export async function getEmails(): Promise<string[]> {
  try {
    const { blobs } = await list()
    const emailsBlob = blobs.find(blob => blob.pathname === FILE_PATH)

    if (!emailsBlob) {
      return []
    }

    const res = await fetch(emailsBlob.url)
    if (!res.ok) {
      console.error('Failed to fetch blob:', res.status, res.statusText)
      return []
    }

    const data = await res.json()
    return data.emails ?? []
  } catch (error) {
    console.error('Error reading blob:', error)
    return []
  }
}

export async function saveEmail(email: string): Promise<{
  success: boolean
  alreadyExists: boolean
}> {
  const emails = await getEmails()

  if (emails.includes(email)) {
    return { success: false, alreadyExists: true }
  }

  emails.push(email)

  try {
    const { url } = await put(FILE_PATH, JSON.stringify({ emails }, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    })

    console.log('Saved to blob URL:', url)
    return { success: true, alreadyExists: false }
  } catch (error) {
    console.error('Error saving to blob:', error)
    return { success: false, alreadyExists: false }
  }
}