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
    <section id="diferenciais" className="py-16 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center bg-transparent animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="p-4 space-y-2">
                <p className="text-[24px] font-bold text-[#00B4D8]">
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    isMillion={stat.isMillion}
                  />
                </p>
                <p className="text-[14px] font-bold text-[#1A3A52] uppercase tracking-wider">
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
