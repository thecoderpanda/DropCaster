// components/WalletLogin.tsx
'use client'

import { useRouter } from 'next/navigation'
import {
    DynamicContextProvider,
    DynamicWidget,
  } from "@dynamic-labs/sdk-react-core";
  
  import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

function WalletLoginContent() {
  const router = useRouter()
  const isAuthenticated  = false;

  if (isAuthenticated) {
    router.push('/dashboard')
    return null
  }

  return <DynamicWidget />
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

function useDynamicContext(): { isAuthenticated: any; } {
    throw new Error('Function not implemented.');
}
