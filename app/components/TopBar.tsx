// components/TopBar.tsx
import Link from 'next/link'
import { Wifi, Bluetooth, Settings, Moon, Sun } from 'lucide-react'
import { Switch } from '../components/ui/switch'
import { useState } from 'react'

interface TopBarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function TopBar({ darkMode, setDarkMode }: TopBarProps) {
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(true)

  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Wifi className={wifi ? 'text-green-400' : 'text-red-400'} />
          <Bluetooth className={bluetooth ? 'text-green-400' : 'text-red-400'} />
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/dashboard" className="hover:text-purple-300 transition-colors">Dashboard</Link></li>
            <li><Link href="/partner" className="hover:text-purple-300 transition-colors">Partner</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-2">
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            className="data-[state=checked]:bg-purple-600"
          />
          {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </div>
      </div>
    </header>
  )
}