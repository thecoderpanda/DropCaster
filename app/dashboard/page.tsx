// app/dashboard/page.tsx
'use client'

import { useState } from 'react'
import TopBar from '../components/TopBar'
import AirdropRadar from '../components/AirdropRadar'
import AirdropPopup from '../components/AirdropPopup'

export default function Dashboard() {
  const [showPopup, setShowPopup] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [foundAirdrop, setFoundAirdrop] = useState(null)

  const handleAirdropFound = (airdrop: any) => {
    setFoundAirdrop(airdrop);
    setShowPopup(true);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">User Dashboard</h1>
        <AirdropRadar onAirdropFound={handleAirdropFound} />
        {showPopup && <AirdropPopup airdrop={foundAirdrop} onClose={() => setShowPopup(false)} />}
      </main>
    </div>
  )
}
