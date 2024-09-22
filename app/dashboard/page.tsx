// app/dashboard/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import TopBar from '../components/TopBar'
import AirdropRadar from '../components/AirdropRadar'
import AirdropPopup from '../components/AirdropPopup'

export default function Dashboard() {
  const [showPopup, setShowPopup] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">User Dashboard</h1>
        <AirdropRadar onAirdropFound={() => setShowPopup(true)} />
        {showPopup && <AirdropPopup onClose={() => setShowPopup(false)} />}      </main>
    </div>
  )
}
