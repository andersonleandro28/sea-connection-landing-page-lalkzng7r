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
    <section className="relative overflow-hidden section-padding px-[40px] md:px-[80px] animate-fade-in bg-[#F5F5F5]">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'linear-gradient(135deg, #1A3A52 0%, #00B4D8 100%)',
          transform: `translateY(${offsetY * 0.2}px)`,
        }}
      />

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center gap-[32px]">
        <div className="flex-1 space-y-[24px] text-center md:text-left">
          <h1 className="h1">
            Receba pagamentos de forma <span className="text-[#00B4D8]">simples e rápida</span>
          </h1>
          <p className="p-body text-[18px] max-w-2xl mx-auto md:mx-0">
            Maquininha, Pix, Boleto, Link de Pagamento e Conta Digital. Tudo em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-[16px] pt-4">
            <Button className="w-full sm:w-auto" onClick={scrollToForm}>
              Começar Agora
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={scrollToNext}>
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
