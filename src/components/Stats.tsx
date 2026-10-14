import { useEffect, useState } from 'react'
import { Users, Activity, BarChart3, Calendar, ArrowRight } from 'lucide-react'
import useRegistrationStore from '@/stores/use-registration-store'

const stats = [
  {
    icon: Users,
    label: 'Clientes ativos',
    description: 'Empresas e autônomos que confiam no nosso ecossistema',
    value: 50000,
    suffix: '+',
  },
  {
    icon: Activity,
    label: 'Transações processadas',
    description: 'Pagamentos liquidados com velocidade e estabilidade',
    value: 2500000,
    isMillion: true,
    suffix: 'M+',
  },
  {
    icon: BarChart3,
    label: 'Volume movimentado',
    description: 'Transacionados de forma segura e transparente',
    value: 500000000,
    isMillion: true,
    prefix: 'R$ ',
    suffix: 'M+',
  },
  {
    icon: Calendar,
    label: 'No mercado brasileiro',
    description: 'Conectando tecnologia e finanças com solidez',
    value: 2019,
    prefix: 'Desde ',
  },
]

function AnimatedCounter({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  isMillion = false,
}: {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  isMillion?: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTimestamp: number
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeProgress * end))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }
    window.requestAnimationFrame(step)
  }, [end, duration])

  let displayValue = count.toString()
  if (isMillion) {
    displayValue = (count / 1000000).toFixed(1).replace('.0', '')
  } else if (end >= 1000 && !isMillion && end !== 2019) {
    displayValue = count.toLocaleString('pt-BR')
  }

  return (
    <span>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}

export function Stats() {
  const { open } = useRegistrationStore()

  return (
    <section id="numeros" className="py-20 md:py-28 bg-[#FAFCFF] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-[#00B4D8]/5 via-[#1A3A52]/5 to-[#00B4D8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Inter style: "Join a global community of over..." */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16 space-y-4">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#00B4D8]">
            Solidez & Credibilidade
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A3A52] tracking-tight leading-[1.12]">
            Uma comunidade com mais de <span className="text-[#00B4D8]">50 mil clientes</span>{' '}
            crescendo juntos
          </h2>
          <p className="text-base sm:text-lg text-[#4A5568] max-w-2xl mx-auto leading-relaxed">
            Nossa tecnologia financeira impulsiona negócios em todo o Brasil com transparência,
            taxas justas e suporte que responde rápido.
          </p>
        </div>

        {/* Humanized Banner: Real happy business owners and customers across Brazil */}
        <div className="max-w-6xl mx-auto mb-10 rounded-3xl overflow-hidden relative shadow-lg shadow-[#1A3A52]/5 border border-slate-200/80 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Real photo of happy smiling team/business people */}
            <div className="lg:col-span-7 relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src="https://img.usecurling.com/p/900/500?q=happy%20smiling%20people%20team"
                alt="Empreendedores e comerciantes brasileiros felizes comemorando resultados"
                className="w-full h-full object-cover object-center"
                width={900}
                height={500}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1A3A52]/20 to-[#1A3A52]/80 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A52]/90 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 lg:hidden text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">
                  Histórias Reais
                </span>
                <p className="text-sm font-semibold">
                  Negócios que prosperam com apoio e tecnologia transparente.
                </p>
              </div>
            </div>

            {/* Content next to photo */}
            <div className="lg:col-span-5 p-8 lg:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#00B4D8]" />
                <span>Pessoas no Centro de Tudo</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A3A52] tracking-tight">
                Mais do que números, histórias de sucesso.
              </h3>
              <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
                De pequenos lojistas a grandes redes de varejo, conectamos quem vende a quem compra
                com a energia, alegria e proximidade que só o empreendedor brasileiro tem.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#1A3A52]">
                <div className="flex -space-x-2">
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=15"
                    alt="Cliente 1"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    width={32}
                    height={32}
                    loading="lazy"
                  />
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=22"
                    alt="Cliente 2"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    width={32}
                    height={32}
                    loading="lazy"
                  />
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=68"
                    alt="Cliente 3"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    width={32}
                    height={32}
                    loading="lazy"
                  />
                </div>
                <span className="text-slate-600">
                  <strong className="text-[#1A3A52]">98% de satisfação</strong> nos atendimentos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Big numbers grid - generous cards, rounded-3xl, friendly typography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="group relative bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#00B4D8]/10 hover:border-[#00B4D8]/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#00B4D8]/10 text-[#00B4D8] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#00B4D8] group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" strokeWidth={2} />
                  </div>

                  {/* Monumental number display */}
                  <p className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#1A3A52] tracking-tight leading-none mb-3 font-display">
                    <AnimatedCounter
                      end={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      isMillion={stat.isMillion}
                    />
                  </p>

                  <h3 className="text-base font-bold text-[#1A3A52] mb-1.5">{stat.label}</h3>

                  <p className="text-xs sm:text-sm text-[#718096] leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#00B4D8]">
                  <span>Verificado</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom invitation line */}
        <div className="mt-14 text-center">
          <button
            onClick={open}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#1A3A52] hover:text-[#00B4D8] transition-colors group cursor-pointer"
          >
            <span>Faça parte você também desse ecossistema</span>
            <ArrowRight className="w-4 h-4 text-[#00B4D8] group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
