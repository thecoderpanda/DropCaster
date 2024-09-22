// app/page.tsx
import dynamic from 'next/dynamic'

const DynamicWalletLogin = dynamic(() => import('./components/WalletLogin'), { ssr: false })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black to-purple-900 text-white p-4">
      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Airdrop Streamer</h1>
        <DynamicWalletLogin />
      </div>
    </main>
  )
}