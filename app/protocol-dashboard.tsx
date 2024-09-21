"use client"

import { useState } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"

export function ProtocolDashboard() {
  const [selectedDrop, setSelectedDrop] = useState("")
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [mintedUsers, setMintedUsers] = useState([])

  const startBroadcasting = () => {
    if (!selectedDrop) {
      alert("Please select a drop to broadcast")
      return
    }
    setIsBroadcasting(true)
    // Mock broadcasting and minting
    setTimeout(() => {
      setMintedUsers([
        { id: 1, address: "0x1234...5678" },
        { id: 2, address: "0x5678...9ABC" },
        { id: 3, address: "0x9ABC...DEF0" },
      ])
      setIsBroadcasting(false)
    }, 3000)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Airdrop Broadcaster</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedDrop}>
            <SelectTrigger>
              <SelectValue placeholder="Select a drop to broadcast" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nft">Cool NFT #1</SelectItem>
              <SelectItem value="poap">POAP Token</SelectItem>
              <SelectItem value="rare">Rare Collectible</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
            onClick={startBroadcasting}
            disabled={isBroadcasting}
          >
            {isBroadcasting ? "Broadcasting..." : "Start Broadcasting"}
          </Button>
        </CardContent>
      </Card>
      {mintedUsers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Minted Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mintedUsers.map((user: { id: number; address: string }) => (
                <li key={user.id} className="flex justify-between items-center">
                  <span>{user.address}</span>
                  <span className="text-green-500">Minted</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}