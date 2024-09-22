// components/WalletLogin.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { localNetworkService } from '../lib/LocalNetworkService'

function WalletLoginContent() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    localNetworkService.initializePeerConnection();
  }, []);

  useEffect(() => {
    if (isAuthenticated && walletAddress) {
      localNetworkService.broadcastWalletAddress(walletAddress);
      router.push('/dashboard')
    }
  }, [isAuthenticated, walletAddress, router]);

  const handleAuthSuccess = (authData: any) => {
    setIsAuthenticated(true);
    setWalletAddress(authData.wallet?.address || '');
  };

  return (
    <DynamicWidget
      buttonClassName="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      onAuthSuccess={handleAuthSuccess}
    />
  )
}

export default function WalletLogin() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "851a76ca-4601-455f-bd29-e146d9cfd34e",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WalletLoginContent />
    </DynamicContextProvider>
  )
}
