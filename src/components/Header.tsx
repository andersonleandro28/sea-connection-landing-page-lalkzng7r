import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import logoUrl from '@/assets/sea-connection-investimentos-s.a.ab60f.png'

export function Header() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault()
    document.getElementById('cadastro')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-subtle transition-all">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoUrl}
            alt="Sea Connection Investimentos Logo"
            className="h-12 w-auto object-contain"
          />
          <span className="font-bold text-xl text-[#1A3A52] hidden sm:block">Sea Connection</span>
        </Link>

        <nav className="hidden md:flex items-center gap-[32px] text-[14px] font-medium text-[#333333]">
          <a
            href="#produtos"
            className="hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-[4px]"
          >
            Produtos
          </a>
          <a
            href="#diferenciais"
            className="hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-[4px]"
          >
            Diferenciais
          </a>
          <a
            href="#contato"
            className="hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-[4px]"
          >
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-[16px]">
          <Button
            className="hidden sm:flex bg-[#00B4D8] text-white hover:bg-[#00B4D8]/90 hover:shadow-medium hover:scale-105 transition-all duration-300 shadow-sm h-[48px] px-[32px] rounded-[8px]"
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
            className="bg-[#1A3A52] text-white hover:bg-[#1A3A52]/90 hover:shadow-medium hover:scale-105 transition-all duration-300 shadow-sm h-[48px] px-[32px] rounded-[8px]"
            onClick={scrollToForm as any}
          >
            Criar Conta
          </Button>
        </div>
      </div>
    </header>
  )
}
