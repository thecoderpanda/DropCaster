"use client"

import { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { UserDashboard } from "./user-dashboard"
import { ProtocolDashboard } from "./protocol-dashboard"
import { Settings } from "./settings"
import { Wallet, Settings as SettingsIcon, User, Bluetooth } from "lucide-react"

export default function Component() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("user")
  const [showSettings, setShowSettings] = useState(false)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false)

  const handleLogin = (type: "wallet" | "email") => {
    if (type === "wallet") {
      // Implement wallet connection logic here
      console.log("Connecting wallet...")
      // For demonstration, we'll just set isLoggedIn to true
      setIsLoggedIn(true)
    } else {
      // Implement email login logic here
      console.log("Logging in with email...")
      setIsLoggedIn(true)
    }
  }

  const toggleBluetooth = async () => {
    if (!bluetoothEnabled) {
      try {
        await (navigator as any).bluetooth.requestDevice({ acceptAllDevices: true })
        setBluetoothEnabled(true)
      } catch (error) {
        console.error("Bluetooth error:", error)
      }
    } else {
      setBluetoothEnabled(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-4">
        <div className="w-full max-w-md space-y-8 bg-black bg-opacity-50 p-6 rounded-xl shadow-2xl">
          <h1 className="text-3xl font-bold text-center text-white">Airdrop Streamer</h1>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => handleLogin("wallet")}
          >
            <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-white">Or</span>
            </div>
          </div>
          <Input type="email" placeholder="Enter your email" className="w-full" />
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={() => handleLogin("email")}
          >
            Login with Email
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <header className="bg-black bg-opacity-50 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Airdrop Streamer</h1>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleBluetooth}>
              <Bluetooth className={`h-5 w-5 ${bluetoothEnabled ? 'text-blue-500' : 'text-gray-500'}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
              <SettingsIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="protocol">Protocol</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <UserDashboard bluetoothEnabled={false} />
          </TabsContent>
          <TabsContent value="protocol">
            <ProtocolDashboard />
          </TabsContent>
        </Tabs>
      </main>
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  )
}