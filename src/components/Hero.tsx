import { Button } from '@/components/ui/button'

export function Hero() {
  const scrollToForm = () => {
    document.getElementById('cadastro')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToNext = () => {
    document.getElementById('diferenciais')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sea-navy to-sea-cyan text-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1200/800?q=ocean%20waves&color=blue')] mix-blend-overlay opacity-10 bg-cover bg-center" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 text-center md:text-left animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Receba pagamentos de forma <span className="text-cyan-300">simples e rápida</span>
          </h1>
          <p className="text-lg md:text-xl text-cyan-50 max-w-2xl mx-auto md:mx-0 leading-relaxed opacity-90">
            Maquininha, Pix, Boleto, Link de Pagamento e Conta Digital. Tudo em um só lugar para o
            seu negócio decolar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-sea-cyan hover:bg-cyan-400 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-200 h-14 px-8 text-lg"
              onClick={scrollToForm}
            >
              Começar Agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/30 hover:bg-white/10 text-white hover:text-white h-14 px-8 text-lg hover:scale-105 transition-all duration-200"
              onClick={scrollToNext}
            >
              Saiba Mais
            </Button>
          </div>
        </div>
        <div
          className="flex-1 hidden lg:flex justify-center animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <img
            src="https://img.usecurling.com/p/500/600?q=credit%20card%20machine&color=blue"
            alt="Payment Terminal"
            className="w-full max-w-md rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  )
}
