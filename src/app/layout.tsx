import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThirdwebProvider } from "thirdweb/react"
import { ProtectionMobile } from "@/modules/mobile-protection"
import { ContextProvider } from "@/modules/wagmi-provider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Panorama Block",
  description: "Panorama Block was built on a strong academic foundation, with a focus on research and collaboration with top-tier talent. Our partnerships with UCLA's Economics Department and leading Brazilian universities and think tanks drive the development of decentralized data analytics and AI/ML tools, fully aligned with our mission to advance AI technologies, simplify user experiences, democratize data access, and provide action-oriented intelligence that empower participants and investment decisions, supporting the growth of a data-powered, agentic economy.",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <ContextProvider>
            <ThirdwebProvider>
              <ProtectionMobile>
                {children}
              </ProtectionMobile>
            </ThirdwebProvider>
          </ContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
