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
    <section className="py-10 md:py-20 px-4 bg-white" id="diferenciais">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A3A52] mb-4">
            Por que escolher Sea Connection?
          </h2>
          <p className="text-lg text-[#333333]">Somos diferentes porque entendemos seu negócio</p>
        </div>

        {status === 'loading' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-8 rounded-xl border-2 border-gray-100 bg-gray-50 flex flex-col items-center text-center"
              >
                <Skeleton className="w-16 h-16 rounded-full mb-6" />
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-6" />
                <Skeleton className="h-6 w-24 rounded-full mt-auto" />
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 rounded-xl max-w-2xl mx-auto">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-[#1A3A52] mb-2">Ops! Ocorreu um erro</h3>
            <p className="text-[#333333] mb-6">
              Não foi possível carregar nossos diferenciais no momento.
            </p>
            <Button onClick={handleRetry} className="bg-[#00B4D8] hover:bg-[#0096B4] text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        )}

        {status === 'success' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-xl border-2 border-[#00B4D8] bg-gradient-to-b from-white to-[#F5F5F5] flex flex-col items-center text-center animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-6">
                  <feature.icon className="w-16 h-16 text-[#00B4D8]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[20px] font-bold text-[#1A3A52] mb-3">{feature.title}</h3>
                <p className="text-[16px] text-[#333333] mb-8 flex-grow">{feature.description}</p>
                <Badge className="bg-[#00B4D8] hover:bg-[#00B4D8] text-white text-[12px] px-3 py-1 font-semibold rounded-full mt-auto border-none">
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
