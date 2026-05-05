import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react'

export function Hero() {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    let timeoutId: number
    const handleScroll = () => {
      if (timeoutId) window.cancelAnimationFrame(timeoutId)
      timeoutId = window.requestAnimationFrame(() => {
        setOffsetY(window.scrollY)
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    document.getElementById('cadastro')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToNext = () => {
    document.getElementById('diferenciais')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#F8FAFC]">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#00B4D8]/20 to-transparent blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#1A3A52]/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-8 text-center lg:text-left animate-fade-in-up duration-500">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] font-semibold text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B4D8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00B4D8]"></span>
              </span>
              A Revolução nos Pagamentos
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A3A52] leading-[1.15] tracking-tight">
              Escale seu negócio com <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A3A52] to-[#00B4D8]">
                inteligência financeira
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Maquininha, Pix, Boleto, Link de Pagamento e Conta Digital. A infraestrutura completa
              para você focar no que importa: o crescimento da sua empresa.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button
                className="w-full sm:w-auto h-14 px-8 rounded-xl bg-[#1A3A52] hover:bg-[#1A3A52]/90 text-white shadow-lg shadow-[#1A3A52]/20 hover:-translate-y-1 transition-all duration-300 text-base font-semibold"
                onClick={scrollToForm}
              >
                Abra sua conta grátis
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 rounded-xl border-2 border-gray-200 text-[#1A3A52] hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-base font-semibold"
                onClick={scrollToNext}
              >
                Conhecer soluções
              </Button>
            </div>

            <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00B4D8]" />
                <span>Aprovação rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00B4D8]" />
                <span>Taxas competitivas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00B4D8]" />
                <span>Suporte humanizado</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-[600px] lg:max-w-none lg:flex lg:justify-end animate-fade-in-up duration-700">
            <div
              className="relative rounded-2xl bg-white p-2 shadow-2xl shadow-[#1A3A52]/10 border border-gray-100 w-full lg:w-[90%]"
              style={{ transform: `translateY(${offsetY * 0.05}px)` }}
            >
              <img
                src="https://img.usecurling.com/p/800/600?q=financial%20dashboard%20modern&color=white"
                alt="Plataforma Sea Connection"
                loading="lazy"
                className="w-full h-auto rounded-xl object-cover"
              />

              {/* Floating metrics card */}
              <div className="absolute -left-4 md:-left-12 top-12 bg-white p-4 rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                      Vendas de hoje
                    </p>
                    <p className="text-xl font-bold text-[#1A3A52]">R$ 12.450,00</p>
                  </div>
                </div>
              </div>

              {/* Floating security card */}
              <div
                className="absolute -right-4 md:-right-8 bottom-16 bg-white p-4 rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00B4D8]/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#00B4D8]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A3A52]">Transação Segura</p>
                    <p className="text-xs text-gray-500">Criptografia de ponta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
