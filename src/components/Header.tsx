import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Header() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault()
    document.getElementById('cadastro')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://img.usecurling.com/i?q=waves&color=blue&shape=fill"
            alt="Sea Connection Logo"
            className="h-[40px] w-[40px] object-contain"
          />
          <span className="font-bold text-xl text-sea-navy">Sea Connection</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#333333]">
          <a href="#produtos" className="hover:text-[#00B4D8] transition-colors">
            Produtos
          </a>
          <a href="#diferenciais" className="hover:text-[#00B4D8] transition-colors">
            Diferenciais
          </a>
          <a href="#contato" className="hover:text-[#00B4D8] transition-colors">
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="hidden sm:flex text-[#00B4D8] hover:text-[#00B4D8]/80 hover:bg-[#00B4D8]/10 h-[48px] px-6 rounded-[8px]"
            asChild
          >
            <a
              href="https://seaconnection.new.paytime.com.br/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acessar Conta
            </a>
          </Button>
          <Button
            className="bg-[#1A3A52] hover:bg-[#1A3A52]/90 text-white shadow-md hover:scale-105 transition-transform h-[48px] px-6 rounded-[8px]"
            onClick={scrollToForm as any}
          >
            Criar Conta
          </Button>
        </div>
      </div>
    </header>
  )
}
