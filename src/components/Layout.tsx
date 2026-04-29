import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Layout() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-50 font-sans pt-20">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}
