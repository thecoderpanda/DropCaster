"use client"

import { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Wifi, Bluetooth, AlertCircle } from "lucide-react"

export function UserDashboard({ bluetoothEnabled }: { bluetoothEnabled: boolean }) {
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [airdrops, setAirdrops] = useState<Array<{ id: number, name: string }>>([])
  const [wifiEnabled, setWifiEnabled] = useState<boolean>(false)

  useEffect(() => {
    // Check for WiFi connectivity
    setWifiEnabled(navigator.onLine)
    window.addEventListener('online', () => setWifiEnabled(true))
    window.addEventListener('offline', () => setWifiEnabled(false))

    return () => {
      window.removeEventListener('online', () => setWifiEnabled(true))
      window.removeEventListener('offline', () => setWifiEnabled(false))
    }
  }, [])

  const startReceiving = () => {
    if (!wifiEnabled || !bluetoothEnabled) {
      alert("Please enable both WiFi and Bluetooth to start receiving airdrops.")
      return
    }
    setIsScanning(true)
    // Mock finding airdrops
    setTimeout(() => {
      setAirdrops([
        { id: 1, name: "Cool NFT #1" },
        { id: 2, name: "POAP Token" },
        { id: 3, name: "Rare Collectible" },
      ])
      setIsScanning(false)
    }, 3000)
  }

  const receiveAirdrop = (id: number) => {
    // Mock receiving airdrop
    setAirdrops(airdrops.filter((airdrop) => airdrop.id !== id))
    alert(`Airdrop ${id} received!`)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Airdrop Receiver</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className={`flex items-center ${wifiEnabled ? "text-green-500" : "text-red-500"}`}>
              <Wifi className="mr-2" />
              {wifiEnabled ? "WiFi Connected" : "WiFi Disconnected"}
            </div>
            <div className={`flex items-center ${bluetoothEnabled ? "text-green-500" : "text-red-500"}`}>
              <Bluetooth className="mr-2" />
              {bluetoothEnabled ? "Bluetooth On" : "Bluetooth Off"}
            </div>
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={startReceiving}
            disabled={isScanning}
          >
            {isScanning ? "Scanning for Airdrops..." : "Start Receiving"}
          </Button>
        </CardContent>
      </Card>
      {isScanning && (
        <div className="flex justify-center items-center h-64">
          <div className="w-32 h-32 border-4 border-blue-500 rounded-full animate-ping" />
        </div>
      )}
      {airdrops.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Available Airdrops</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {airdrops.map((airdrop) => (
                <li key={airdrop.id} className="flex justify-between items-center">
                  <span>{airdrop.name}</span>
                  <Button onClick={() => receiveAirdrop(airdrop.id)}>Receive</Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}