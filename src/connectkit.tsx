'use client';

import React from 'react';

import { ConnectKitProvider, createConfig } from '@particle-network/connectkit';
import { authWalletConnectors } from '@particle-network/connectkit/auth';
import type { Chain } from '@particle-network/connectkit/chains';
import { mainnet, solana } from '@particle-network/connectkit/chains';
import { EntryPosition, wallet } from '@particle-network/connectkit/wallet';

import { arbitrum, base, lineaSepolia, polygon } from '@particle-network/connectkit/chains';
import { solanaWalletConnectors } from '@particle-network/connectkit/solana';
import { evmWalletConnectors } from '@particle-network/connectkit/evm';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY as string;
const appId = process.env.NEXT_PUBLIC_APP_ID as string;
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

if (!projectId || !clientKey || !appId) {
  throw new Error('Please configure the Particle project in .env first!');
}

const supportChains: Chain[] = [];
// evm start
supportChains.push(mainnet, base, arbitrum, polygon, lineaSepolia);
// evm end


const config = createConfig({
  projectId,
  clientKey,
  appId,
  appearance: {
    recommendedWallets: [
      { walletId: 'metaMask', label: 'Recommended' },
      { walletId: 'coinbaseWallet', label: 'Popular' },
    ],
    language: 'en-US',
  },
  walletConnectors: [
    evmWalletConnectors({
      metadata: { name: 'Panorama', icon: '', description: '', url: '' }, // Optional, this is Metadata used by WalletConnect and Coinbase
      walletConnectProjectId, // optional, retrieved from https://cloud.walletconnect.com
    }),
    authWalletConnectors({
      // Optional, configure this if you're using social logins
      authTypes: ['email', 'google', 'apple', 'twitter', 'github'], // Optional, restricts the types of social logins supported
      fiatCoin: 'USD', // Optional, also supports CNY, JPY, HKD, INR, and KRW
      promptSettingConfig: {
        // Optional, changes the frequency in which the user is asked to set a master or payment password
        // 0 = Never ask
        // 1 = Ask once
        // 2 = Ask always, upon every entry
        // 3 = Force the user to set this password
        promptMasterPasswordSettingWhenLogin: 1,
        promptPaymentPasswordSettingWhenSign: 1,
      },
    }),
    solanaWalletConnectors()

  ],
  plugins: [
    // embedded wallet start
    wallet({
      visible: true,
      entryPosition: EntryPosition.BR,
    }),
    // embedded wallet end

  ],
  chains: [mainnet, solana]
});

// Wrap your application with this component.
export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
