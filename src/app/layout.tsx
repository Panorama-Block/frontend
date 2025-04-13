import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThirdwebProvider } from "thirdweb/react"
import { ProtectionMobile } from "@/modules/mobile-protection"

import '@rainbow-me/rainbowkit/styles.css';
import { ChakraProvider, defineStyleConfig, extendTheme } from '@chakra-ui/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  bsc,
} from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';


const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    bsc,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});

const ButtonStyles = defineStyleConfig({
  variants: {
    greenCustom: {
      fontFamily: 'Inter',
      fontSize: '16px',
      background: '#59F886',
      borderRadius: '24px',
      color: 'var(--background-secondary)',
      '&:hover': {
        background: '#59F886',
        color: 'var(--background-secondary)',
        transform: 'scale(1.05)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        border: '1px solid #59F886'
      }
    }
  }
})

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  colors: {
    'header': 'var(--background-secondary)',
    'pop-up-bg': '#1C201D',
  },
  components: {
    Button: ButtonStyles,
  },
  Text: {
    baseStyle: {
      fontFamily: 'Inter',
      fontSize: '16px',
      color: 'var(--dark-text-90, rgba(255, 255, 255, 0.90))'
    }
  },
})

const client = new QueryClient();

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
  description: "Panorama Block was built on a strong academic foundation, with a focus on research and collaboration with top-tier talent. Our partnerships with UCLA’s Economics Department and leading Brazilian universities and think tanks drive the development of decentralized data analytics and AI/ML tools, fully aligned with our mission to advance AI technologies, simplify user experiences, democratize data access, and provide action-oriented intelligence that empower participants and investment decisions, supporting the growth of a data-powered, agentic economy.",
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
          <ThirdwebProvider>
            <WagmiProvider config={config}>
              <QueryClientProvider client={client}>
                <RainbowKitProvider theme={darkTheme({
                  accentColor: '#111613',
                  accentColorForeground: 'white',
                  borderRadius: 'small',
                  fontStack: 'system',
                  overlayBlur: 'small',
                })}>
                  <ChakraProvider theme={theme}>
                    <ProtectionMobile>
                      {children}
                    </ProtectionMobile>
                  </ChakraProvider>
                </RainbowKitProvider>
              </QueryClientProvider>
            </WagmiProvider>
          </ThirdwebProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
