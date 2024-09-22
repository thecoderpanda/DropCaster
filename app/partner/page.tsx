// app/partner/page.tsx
'use client'

import { useState, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import TopBar from '../components/TopBar'
import { localNetworkService } from '../lib/LocalNetworkService'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function PartnerDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [airdropName, setAirdropName] = useState('')
  const [contractAddress, setContractAddress] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [isBroadcasting, setIsBroadcasting] = useState(false)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleCreateAirdrop = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsBroadcasting(true)

    let imageUrl = ''

    if (image) {
      // In a real application, you would upload the image to a server or IPFS here
      // For this example, we'll just use a fake URL
      imageUrl = URL.createObjectURL(image)
    }

    const airdropData = {
      name: airdropName,
      contractAddress: contractAddress || undefined,
      imageUrl
    }

    localNetworkService.broadcastAirdrop(airdropData)
    console.log('Broadcasting airdrop:', airdropData)

    // Simulate broadcasting delay
    setTimeout(() => {
      setIsBroadcasting(false)
      // Reset form
      setAirdropName('')
      setContractAddress('')
      setImage(null)
    }, 3000)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Partner Dashboard</h1>
        <form onSubmit={handleCreateAirdrop} className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl relative">
          <div className="space-y-4">
            <div>
              <Label htmlFor="airdropName">Airdrop Name</Label>
              <Input
                id="airdropName"
                value={airdropName}
                onChange={(e) => setAirdropName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="contractAddress">Contract Address (Optional)</Label>
              <Input
                id="contractAddress"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div>
              <Label htmlFor="image">Airdrop Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-6" disabled={isBroadcasting}>
            {isBroadcasting ? 'Broadcasting...' : 'Create & Broadcast Airdrop'}
          </Button>
          {isBroadcasting && (
            <motion.div
              className="absolute inset-0 bg-purple-500 bg-opacity-25 rounded-lg flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </form>
      </main>
    </div>
  )
}