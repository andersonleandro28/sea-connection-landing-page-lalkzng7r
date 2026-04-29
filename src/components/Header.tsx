import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Header() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault()
    document.getElementById('cadastro')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://img.usecurling.com/i?q=waves&color=blue&shape=fill"
            alt="Sea Connection Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="font-bold text-xl text-sea-navy">Sea Connection</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <a href="#produtos" className="hover:text-sea-cyan transition-colors">
            Produtos
          </a>
          <a href="#diferenciais" className="hover:text-sea-cyan transition-colors">
            Diferenciais
          </a>
          <a href="#contato" className="hover:text-sea-cyan transition-colors">
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:flex" asChild>
            <a
              href="https://seaconnection.new.paytime.com.br/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acessar Conta
            </a>
          </Button>
          <Button
            className="bg-sea-cyan hover:bg-sea-cyan/90 text-white shadow-md hover:scale-105 transition-transform"
            onClick={scrollToForm as any}
          >
            Criar Conta
          </Button>
        </div>
      </div>
    </header>
  )
}
