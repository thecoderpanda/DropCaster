// components/AirdropRadar.tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { localNetworkService } from '../lib/LocalNetworkService'

export default function AirdropRadar({ onAirdropFound }: { onAirdropFound: (airdrop: any) => void }) {
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.type === 'airdrop') {
        onAirdropFound(message.data);
      }
    };

    localNetworkService.on('message', handleMessage);

    return () => {
      localNetworkService.off('message', handleMessage);
    };
  }, [onAirdropFound]);

  const startSearching = () => {
    setSearching(true);
    localNetworkService.startSearching();
  };

  return (
    <div className="relative w-64 h-64 mx-auto">
      <motion.div
        className="absolute inset-0 bg-purple-500 rounded-full opacity-25"
        animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 border-2 border-purple-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <button
        className="absolute inset-0 flex items-center justify-center text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
        onClick={startSearching}
      >
        {searching ? 'Fetching Airdrops...' : 'Start Search'}
      </button>
    </div>
  )
}