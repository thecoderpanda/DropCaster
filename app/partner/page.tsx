// app/partner/page.tsx
'use client'

import { useState } from 'react'
import TopBar from '../components/TopBar'

export default function PartnerDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [airdropName, setAirdropName] = useState('')
  const [tokenAmount, setTokenAmount] = useState('')

  const handleCreateAirdrop = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Logic to create and broadcast airdrop
    console.log('Creating airdrop:', { airdropName, tokenAmount })
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Partner Dashboard</h1>
        <form onSubmit={handleCreateAirdrop} className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
          <div className="mb-4">
            <label htmlFor="airdropName" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Airdrop Name</label>
            <input
              type="text"
              id="airdropName"
              value={airdropName}
              onChange={(e) => setAirdropName(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black dark:text-white bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tokenAmount" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Token Amount</label>
            <input
              type="number"
              id="tokenAmount"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black dark:text-white bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors">
            Create & Broadcast Airdrop
          </button>
        </form>
      </main>
    </div>
  )
}