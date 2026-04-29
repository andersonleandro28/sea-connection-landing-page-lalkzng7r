import { Button } from '@/components/ui/button'

export function Hero() {
  const scrollToForm = () => {
    document.getElementById('cadastro')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToNext = () => {
    document.getElementById('diferenciais')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative overflow-hidden py-[60px] md:py-[120px] px-[40px] md:px-[80px] animate-fade-in"
      style={{ background: 'linear-gradient(135deg, #1A3A52 0%, #00B4D8 100%)' }}
    >
      <div className="absolute inset-0 bg-white/5 pointer-events-none" />

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 space-y-[24px] text-center md:text-left">
          <h1 className="text-[32px] md:text-[48px] font-bold leading-tight text-[#1A3A52]">
            Receba pagamentos de forma <span className="text-[#00B4D8]">simples e rápida</span>
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#333333] font-normal max-w-2xl mx-auto md:mx-0">
            Maquininha, Pix, Boleto, Link de Pagamento e Conta Digital. Tudo em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-[24px] pt-4">
            <Button
              className="w-full sm:w-auto bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-white shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200 h-[48px] px-[32px] rounded-[8px] font-bold"
              onClick={scrollToForm}
            >
              Começar Agora
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-[#1A3A52] text-[#1A3A52] hover:bg-[#1A3A52]/5 hover:scale-105 transition-all duration-200 h-[48px] px-[32px] rounded-[8px] font-bold"
              onClick={scrollToNext}
            >
              Saiba Mais
            </Button>
          </div>
        </div>
        <div className="flex-1 hidden lg:flex justify-center">
          <img
            src="https://img.usecurling.com/p/500/600?q=credit%20card%20machine&color=blue"
            alt="Payment Terminal"
            className="w-full max-w-md rounded-[16px] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  )
}
