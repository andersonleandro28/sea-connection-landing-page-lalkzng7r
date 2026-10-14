import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logoUrl from '@/assets/sea-connection-investimentos-s.a.ab60f.png'
import useRegistrationStore from '@/stores/use-registration-store'

export function Header() {
  const { open } = useRegistrationStore()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-white/60 backdrop-blur-sm py-4 md:py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-lg p-1"
            aria-label="Sea Connection Início"
          >
            <img
              src={logoUrl}
              alt="Sea Connection Investimentos Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
            <span className="font-extrabold text-xl text-[#1A3A52] tracking-tight hidden sm:inline-block">
              Sea Connection
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-[#1A3A52]/80">
            <a
              href="#produtos"
              className="hover:text-[#00B4D8] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-full px-2"
            >
              Soluções
            </a>
            <a
              href="#diferenciais"
              className="hover:text-[#00B4D8] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-full px-2"
            >
              Diferenciais
            </a>
            <a
              href="#numeros"
              className="hover:text-[#00B4D8] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-full px-2"
            >
              Sobre nós
            </a>
            <a
              href="#contato"
              className="hover:text-[#00B4D8] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-full px-2"
            >
              Contato
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="ghost"
              className="rounded-full text-[#1A3A52] hover:text-[#00B4D8] hover:bg-[#00B4D8]/10 font-semibold px-5 h-11 transition-all"
              asChild
            >
              <a
                href="https://seaconnection.new.paytime.com.br/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
              >
                <span>Acessar Conta</span>
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </a>
            </Button>
            <Button
              className="rounded-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-bold px-6 h-11 shadow-md shadow-[#00B4D8]/25 hover:shadow-lg hover:shadow-[#00B4D8]/35 hover:-translate-y-0.5 transition-all duration-200"
              onClick={open}
            >
              Criar Conta
            </Button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <Button
              size="sm"
              className="rounded-full bg-[#00B4D8] text-white text-xs font-bold px-4 h-9 shadow-sm"
              onClick={open}
            >
              Criar Conta
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#1A3A52] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-4 pb-4 border-t border-slate-100 bg-white/95 rounded-2xl shadow-xl p-5 space-y-4 animate-slide-up">
            <div className="flex flex-col space-y-3 font-semibold text-base text-[#1A3A52]">
              <a
                href="#produtos"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#00B4D8] py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Soluções
              </a>
              <a
                href="#diferenciais"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#00B4D8] py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Diferenciais
              </a>
              <a
                href="#numeros"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#00B4D8] py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Sobre nós
              </a>
              <a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#00B4D8] py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Contato
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <Button
                variant="outline"
                className="w-full rounded-full border-slate-200 text-[#1A3A52] font-semibold h-11"
                asChild
              >
                <a
                  href="https://seaconnection.new.paytime.com.br/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5"
                >
                  Acessar Conta <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
              <Button
                className="w-full rounded-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-bold h-11 shadow-md shadow-[#00B4D8]/20"
                onClick={() => {
                  setMobileMenuOpen(false)
                  open()
                }}
              >
                Criar Conta Grátis
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
