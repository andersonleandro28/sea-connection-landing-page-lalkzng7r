import { useState, useEffect } from 'react'
import {
  CircleDollarSign,
  Headset,
  ArrowRightLeft,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import useRegistrationStore from '@/stores/use-registration-store'

const features = [
  {
    title: 'SEM MENSALIDADE',
    icon: CircleDollarSign,
    description:
      'Conta digital completa sem taxas escondidas ou anuidade. Receba via maquininha, Pix, boleto e link pagando apenas pelo que usar.',
    highlight: '100% Grátis',
    benefit: 'Economia real todo mês',
    details: 'Sem tarifa de manutenção ou surpresas no extrato.',
  },
  {
    title: 'ATENDIMENTO HUMANIZADO',
    icon: Headset,
    description:
      'Suporte feito por pessoas de verdade, sem robôs que dão voltas. Falamos a língua do seu negócio e resolvemos rápido.',
    highlight: 'Suporte 24/7',
    benefit: 'Gente que entende você',
    details: 'Canais diretos via WhatsApp, telefone e chat.',
  },
  {
    title: 'TRANSFERÊNCIAS GRATUITAS',
    icon: ArrowRightLeft,
    description:
      'Seu dinheiro entra direto na sua conta Sea Connection. Sem taxas abusivas, sem espera. Liquidação garantida em 1 dia útil.',
    highlight: '1 Dia Útil',
    benefit: 'Fluxo de caixa ágil',
    details: 'Pix e transferências sem custo adicional.',
  },
]

export function Features() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const { open } = useRegistrationStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success')
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const handleRetry = () => {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
    }, 600)
  }

  return (
    <section
      id="diferenciais"
      className="py-24 md:py-32 bg-[#1A3A52] text-white relative overflow-hidden"
    >
      {/* Background organic glow circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00B4D8]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00B4D8]/15 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Inter style: "Your money, protected every step of the way" */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#00B4D8] border border-white/10 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Por que escolher a Sea Connection</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            Diferenciais pensados para o seu{' '}
            <span className="text-[#00B4D8]">crescimento real</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Somos diferentes porque entendemos os desafios de empreender no Brasil. Aliamos
            segurança bancária de ponta com um atendimento caloroso.
          </p>
        </div>

        {/* Loading State Skeleton */}
        {status === 'loading' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center"
              >
                <Skeleton className="w-16 h-16 rounded-2xl mb-6 bg-white/10" />
                <Skeleton className="h-6 w-3/4 mb-4 bg-white/10" />
                <Skeleton className="h-4 w-full mb-2 bg-white/10" />
                <Skeleton className="h-4 w-5/6 mb-6 bg-white/10" />
                <Skeleton className="h-7 w-28 rounded-full mt-auto bg-white/10" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="flex flex-col items-center justify-center p-8 text-center border border-white/20 rounded-3xl max-w-2xl mx-auto bg-white/5">
            <AlertCircle className="w-12 h-12 text-[#E53E3E] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Ops! Ocorreu um erro</h3>
            <p className="text-slate-300 mb-6 text-sm">
              Não foi possível carregar nossos diferenciais no momento.
            </p>
            <Button
              onClick={handleRetry}
              className="rounded-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-bold"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        )}

        {/* Success State: 3 pillars with dark navy background, large icons, high-contrast white & cyan */}
        {status === 'success' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              // Corresponding real photo for each pillar
              const pillarPhotos = [
                'https://img.usecurling.com/p/600/340?q=smiling%20happy%20merchant%20shop', // Sem mensalidade
                'https://img.usecurling.com/p/600/340?q=smiling%20support%20headset%20customer', // Atendimento humanizado
                'https://img.usecurling.com/p/600/340?q=happy%20businessman%20mobile%20success', // Transferencias gratuitas
              ]
              const currentPhoto = pillarPhotos[index]

              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-[#00B4D8]/50 backdrop-blur-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00B4D8]/10"
                >
                  {/* Photo at the top of card with subtle duotone effect */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-800">
                    <img
                      src={currentPhoto}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      width={600}
                      height={340}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A52] via-[#1A3A52]/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-[#00B4D8] flex items-center justify-center group-hover:bg-[#00B4D8] group-hover:text-[#1A3A52] transition-all duration-300 shadow-md">
                        <Icon className="w-6 h-6" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-[#1A3A52]/90 backdrop-blur-md text-[#00B4D8] text-xs font-extrabold uppercase tracking-wider border border-white/10">
                        {feature.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Body content */}
                  <div className="p-7 sm:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 tracking-tight">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                        {feature.description}
                      </p>
                    </div>

                    {/* Benefit footer */}
                    <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                      <ShieldCheck className="w-4 h-4 text-[#00B4D8]" />
                      <span>{feature.benefit}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Extra trust bar below pillars */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto">
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-extrabold text-[#00B4D8]">100% Digital</p>
            <p className="text-xs text-slate-300">Sem filas nem agências</p>
          </div>
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-extrabold text-[#00B4D8]">Criptografia</p>
            <p className="text-xs text-slate-300">Padrão bancário internacional</p>
          </div>
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-extrabold text-[#00B4D8]">Até 1 Dia Útil</p>
            <p className="text-xs text-slate-300">Liquidação rápida na conta</p>
          </div>
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-extrabold text-[#00B4D8]">Sem Fidelidade</p>
            <p className="text-xs text-slate-300">Você fica porque gosta</p>
          </div>
        </div>

        {/* Middle action button */}
        <div className="mt-12 text-center">
          <Button
            onClick={open}
            className="h-13 px-8 rounded-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#00B4D8]/20 transition-all hover:scale-105"
          >
            Quero Abrir Minha Conta
          </Button>
        </div>
      </div>
    </section>
  )
}
