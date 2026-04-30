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

        <nav className="hidden md:flex items-center gap-[32px] text-[16px] font-medium text-[#333333]">
          <a
            href="#produtos"
            className="hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
          >
            Produtos
          </a>
          <a
            href="#diferenciais"
            className="hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
          >
            Diferenciais
          </a>
          <a
            href="#contato"
            className="hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
          >
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-[16px]">
          <Button
            className="hidden sm:flex bg-[#00B4D8] text-white hover:bg-[#00B4D8]/90 shadow-sm"
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
            className="bg-[#1A3A52] text-white hover:bg-[#1A3A52]/90 shadow-sm"
            onClick={scrollToForm as any}
          >
            Criar Conta
          </Button>
        </div>
      </div>
    </header>
  )
}
