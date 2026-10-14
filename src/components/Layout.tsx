import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Layout() {
  return (
    <main className="flex flex-col min-h-screen bg-[#FAFCFF] font-sans">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}
