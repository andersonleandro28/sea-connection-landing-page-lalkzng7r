import { useEffect, useState } from 'react'

const stats = [
  { label: 'clientes ativos', value: 50000, suffix: '+' },
  { label: 'transações processadas', value: 2500000, isMillion: true, suffix: 'M+' },
  {
    label: 'em volume movimentado',
    value: 500000000,
    isMillion: true,
    prefix: 'R$ ',
    suffix: 'M+',
  },
  { label: 'Operando desde', value: 2019 },
]

function AnimatedCounter({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  isMillion = false,
}: any) {
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
  return (
    <section id="numeros" className="section-padding bg-[#F5F5F5] border-y border-[#E0E0E0]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] max-w-6xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center bg-white rounded-[12px] shadow-subtle animate-fade-in card-padding hover:shadow-medium transition-shadow duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="space-y-[8px]">
                <p className="text-[24px] font-bold text-[#00B4D8] leading-none">
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    isMillion={stat.isMillion}
                  />
                </p>
                <p className="p-small font-bold text-[#1A3A52] uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
