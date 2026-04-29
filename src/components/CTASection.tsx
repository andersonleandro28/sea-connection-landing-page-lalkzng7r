import { Button } from '@/components/ui/button'

export function CTASection() {
  const scrollToCadastro = () => {
    const el = document.getElementById('cadastro')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-20 md:py-28 px-4 bg-white text-center">
      <div
        className="container mx-auto max-w-4xl space-y-8 animate-slide-up opacity-0"
        style={{ animationFillMode: 'forwards' }}
      >
        <div className="space-y-4">
          <h2 className="text-[32px] md:text-[48px] font-bold text-[#1A3A52] leading-tight">
            Pronto para começar?
          </h2>
          <p className="text-[16px] md:text-[20px] text-[#333333]">
            Junte-se a 50.000+ clientes que já confiam na Sea Connection
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={scrollToCadastro}
            className="w-full sm:w-auto bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-white font-bold h-[56px] px-8 rounded-[8px] transition-all hover:scale-105 hover:shadow-lg"
          >
            Criar Conta Agora
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto border-2 border-[#1A3A52] text-[#1A3A52] hover:bg-[#1A3A52] hover:text-white font-bold h-[56px] px-8 rounded-[8px] transition-all hover:scale-105 bg-transparent"
          >
            <a
              href="https://seaconnection.new.paytime.com.br/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acessar Conta
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
