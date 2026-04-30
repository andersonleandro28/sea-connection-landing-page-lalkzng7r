import { Button } from '@/components/ui/button'

import { useEffect, useState } from 'react'

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
    <section className="relative overflow-hidden px-[40px] md:px-[80px] py-[60px] md:py-[120px] animate-fade-in duration-300">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #1A3A52 0%, #00B4D8 100%)',
          transform: `translateY(${offsetY * 0.2}px)`,
        }}
      >
        <div className="absolute inset-0 bg-white/5" />
      </div>

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center gap-[24px]">
        <div className="flex-1 space-y-[24px] text-center md:text-left">
          <h1 className="text-[32px] md:text-[48px] font-bold text-[#1A3A52] leading-tight">
            Receba pagamentos de forma{' '}
            <span className="text-white bg-[#00B4D8] px-2 rounded whitespace-nowrap inline-block mt-2 sm:mt-0">
              simples e rápida
            </span>
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#333333] leading-relaxed max-w-2xl mx-auto md:mx-0">
            Maquininha, Pix, Boleto, Link de Pagamento e Conta Digital. Tudo em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-[24px] pt-4">
            <Button
              className="w-full sm:w-auto h-[48px] px-[32px] rounded-[8px] bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-white hover:shadow-medium hover:scale-105 transition-all duration-300"
              onClick={scrollToForm}
            >
              Começar Agora
            </Button>
            <Button
              className="w-full sm:w-auto h-[48px] px-[32px] rounded-[8px] bg-transparent border border-[#1A3A52] text-[#1A3A52] hover:bg-[#1A3A52]/5 hover:scale-105 transition-all duration-300"
              onClick={scrollToNext}
            >
              Saiba Mais
            </Button>
          </div>
        </div>
        <div className="flex-1 hidden lg:flex justify-center">
          <img
            src="https://img.usecurling.com/p/500/600?q=credit%20card%20machine&color=blue"
            alt="Máquina de Cartão e Soluções de Pagamento"
            loading="lazy"
            className="w-full max-w-md rounded-[16px] shadow-strong rotate-2 hover:rotate-0 transition-transform duration-500"
            style={{ transform: `translateY(${offsetY * 0.1}px) rotate(${2 - offsetY * 0.01}deg)` }}
          />
        </div>
      </div>
    </section>
  )
}
