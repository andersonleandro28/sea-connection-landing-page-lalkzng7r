import { useState, useEffect } from 'react'
import { CircleDollarSign, Headset, ArrowRightLeft, AlertCircle, RefreshCw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

const features = [
  {
    title: 'SEM MENSALIDADE',
    icon: CircleDollarSign,
    description:
      'Conta digital sem mensalidade. Receba via maquininha, Pix, boleto e link. Sem surpresas.',
    highlight: '100% Grátis',
  },
  {
    title: 'ATENDIMENTO HUMANIZADO',
    icon: Headset,
    description: 'Atendimento rápido e humanizado. Falamos sua língua, entendemos seus desafios.',
    highlight: 'Suporte 24/7',
  },
  {
    title: 'TRANSFERÊNCIAS GRATUITAS',
    icon: ArrowRightLeft,
    description: 'Dinheiro direto na conta Sea Connection. Sem taxas, sem demora. Receba em 1 dia.',
    highlight: '1 Dia Útil',
  },
]

export function Features() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success')
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const handleRetry = () => {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
    }, 1200)
  }

  return (
    <section className="section-padding px-4 bg-white" id="diferenciais">
      <div className="container mx-auto">
        <div className="text-center mb-[40px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="h2 mb-[16px]">Por que escolher Sea Connection?</h2>
          <p className="p-body text-[18px]">Somos diferentes porque entendemos seu negócio</p>
        </div>

        {status === 'loading' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-[32px] rounded-[12px] border border-[#E0E0E0] bg-[#F5F5F5] flex flex-col items-center text-center"
              >
                <Skeleton className="w-[64px] h-[64px] rounded-full mb-[24px]" />
                <Skeleton className="h-6 w-3/4 mb-[16px]" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-[32px]" />
                <Skeleton className="h-6 w-24 rounded-full mt-auto" />
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center justify-center p-[40px] text-center border border-dashed border-[#E0E0E0] rounded-[12px] max-w-2xl mx-auto bg-[#F5F5F5]">
            <AlertCircle className="w-12 h-12 text-[#E53E3E] mb-4" />
            <h3 className="h3 mb-2">Ops! Ocorreu um erro</h3>
            <p className="p-body mb-6">Não foi possível carregar nossos diferenciais no momento.</p>
            <Button onClick={handleRetry}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        )}

        {status === 'success' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-[32px] rounded-[12px] border-2 border-[#00B4D8] bg-gradient-to-b from-[#FFFFFF] to-[#F5F5F5] flex flex-col items-center text-center animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both hover:shadow-medium hover:-translate-y-1 transition-all"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-[24px]">
                  <feature.icon className="w-[64px] h-[64px] text-[#00B4D8]" strokeWidth={1.5} />
                </div>
                <h3 className="h3 mb-[16px]">{feature.title}</h3>
                <p className="p-body mb-[32px] flex-grow">{feature.description}</p>
                <Badge className="bg-[#00B4D8] hover:bg-[#00B4D8] text-[#FFFFFF] text-[12px] px-[12px] py-[4px] font-bold rounded-full mt-auto border-none shadow-subtle">
                  {feature.highlight}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
