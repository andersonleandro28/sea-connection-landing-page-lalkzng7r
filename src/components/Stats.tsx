import { Card, CardContent } from '@/components/ui/card'

const stats = [
  { label: 'clientes ativos', value: '50.000+' },
  { label: 'transações processadas', value: '2.5M+' },
  { label: 'em volume movimentado', value: 'R$ 500M+' },
  { label: 'Operando desde', value: '2019' },
]

export function Stats() {
  return (
    <section id="diferenciais" className="py-16 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="border-none shadow-none text-center bg-transparent animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <CardContent className="p-4 space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-sea-navy">{stat.value}</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
