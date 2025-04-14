"use client"

import '@rainbow-me/rainbowkit/styles.css';
// import { ChakraProvider, defineStyleConfig, extendTheme } from '@chakra-ui/react'
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
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

const queryClient = new QueryClient();

// Create emotion cache for MUI and Chakra to share
const emotionCache = createCache({
    key: 'css',
    prepend: true,
});

const config = getDefaultConfig({
    appName: 'Panorama Block',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
    chains: [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        base,
        bsc,
    ],
    ssr: true
});

// const ButtonStyles = defineStyleConfig({
//     variants: {
//         greenCustom: {
//             fontFamily: 'Inter',
//             fontSize: '16px',
//             background: '#59F886',
//             borderRadius: '24px',
//             color: 'var(--background-secondary)',
//             '&:hover': {
//                 background: '#59F886',
//                 color: 'var(--background-secondary)',
//                 transform: 'scale(1.05)',
//                 boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
//                 border: '1px solid #59F886'
//             }
//         }
//     }
// })

// const theme = extendTheme({
//     initialColorMode: 'dark',
//     useSystemColorMode: false,
//     colors: {
//         'header': 'var(--background-secondary)',
//         'pop-up-bg': '#1C201D',
//     },
//     components: {
//         Button: ButtonStyles,
//     },
//     Text: {
//         baseStyle: {
//             fontFamily: 'Inter',
//             fontSize: '16px',
//             color: 'var(--dark-text-90, rgba(255, 255, 255, 0.90))'
//         }
//     },
// })

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <CacheProvider value={emotionCache}>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider theme={darkTheme({
                        accentColor: '#111613',
                        accentColorForeground: 'white',
                        borderRadius: 'small',
                        fontStack: 'system',
                        overlayBlur: 'small',
                    })}>
                        {children}
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </CacheProvider>
    )
}