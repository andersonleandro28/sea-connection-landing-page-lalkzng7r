import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer
      className="bg-[#1A3A52] text-white animate-fade-in opacity-0"
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="container mx-auto py-[30px] px-[30px] md:py-[40px] md:px-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] py-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://img.usecurling.com/i?q=waves&color=white&shape=fill"
                alt="Sea Connection Logo White"
                className="h-8 w-8 object-contain"
              />
              <span className="font-bold text-[20px]">Sea Connection</span>
            </div>
            <p className="text-white/80 text-[14px] leading-relaxed">
              Receba pagamentos de forma simples e rápida
            </p>
            <p className="text-white/80 text-[14px]">Operando desde 2019</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-[14px] uppercase tracking-wider text-white">Produtos</h4>
            <ul className="space-y-3">
              {[
                'Maquininha de Cartão',
                'Boleto Bancário',
                'Pix Copia e Cola',
                'Link de Pagamento',
                'Conta Digital',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[14px] text-white/80 hover:text-[#00B4D8] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-[14px] uppercase tracking-wider text-white">Suporte</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contato@seaconnection.com.br"
                  className="text-[14px] text-white/80 hover:text-[#00B4D8] transition-colors"
                >
                  contato@seaconnection.com.br
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[14px] text-white/80 hover:text-[#00B4D8] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[14px] text-white/80 hover:text-[#00B4D8] transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[14px] text-white/80 hover:text-[#00B4D8] transition-colors"
                >
                  Documentação
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-[14px] uppercase tracking-wider text-white">
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              <a href="#" className="text-white/80 hover:text-[#00B4D8] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-[#00B4D8] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-[#00B4D8] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-[#00B4D8] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#444444] pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/80 text-[14px] text-center md:text-left">
            © 2019-2026 Sea Connection. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-white/80 hover:text-[#00B4D8] text-[14px] transition-colors"
            >
              Privacidade
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-[#00B4D8] text-[14px] transition-colors"
            >
              Termos de Uso
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-[#00B4D8] text-[14px] transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
