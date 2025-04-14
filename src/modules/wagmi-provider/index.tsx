"use client"

import '@rainbow-me/rainbowkit/styles.css';
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