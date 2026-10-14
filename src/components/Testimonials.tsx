import { Star, Quote, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useRegistrationStore from '@/stores/use-registration-store'

const testimonials = [
  {
    id: 1,
    name: 'Camila Ferreira',
    role: 'Proprietária da Boutique Bloom',
    location: 'São Paulo, SP',
    photo: 'https://img.usecurling.com/p/600/700?q=smiling%20happy%20woman%20store',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=18',
    highlight: 'Recebimento no Pix instantâneo',
    quote:
      'Com a maquininha da Sea Connection e o Pix direto na conta, o fechamento do meu caixa ficou muito mais simples. Além das taxas serem as melhores, o suporte me atende na hora por WhatsApp com um carinho que nenhum bancão tem.',
    tag: 'Varejo & Moda',
    metrics: '+35% de vendas no cartão',
  },
  {
    id: 2,
    name: 'Rodrigo Medeiros',
    role: 'Fundador do Café & Empório Grão Nobre',
    location: 'Belo Horizonte, MG',
    photo: 'https://img.usecurling.com/p/600/700?q=smiling%20happy%20barista%20cafe',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=42',
    highlight: 'Liquidação pontual em 1 dia útil',
    quote:
      'Nunca mais tive dor de cabeça com atraso de pagamento ou cobrança misteriosa no extrato. A conta digital é super prática e a equipe da Sea Connection realmente se importa com quem tá na linha de frente empreendendo.',
    tag: 'Gastronomia',
    metrics: 'Zero mensalidade e surpresas',
  },
  {
    id: 3,
    name: 'Juliana e Renato Prado',
    role: 'Sócios na Prado Cosméticos & Beleza',
    location: 'Curitiba, PR',
    photo: 'https://img.usecurling.com/p/600/700?q=smiling%20happy%20couple%20business',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=63',
    highlight: 'Link de pagamento que converte',
    quote:
      'Vendemos pelo Instagram e WhatsApp usando o Link de Pagamento da Sea. Nossos clientes adoram a facilidade de parcelar e nós temos a segurança contra fraudes com taxas que não pesam na margem.',
    tag: 'E-commerce & WhatsApp',
    metrics: 'Triplicou vendas online',
  },
]

export function Testimonials() {
  const { open } = useRegistrationStore()

  return (
    <section id="depoimentos" className="py-20 md:py-28 bg-[#FAFCFF] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#00B4D8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#1A3A52]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#00B4D8]" />
            <span>Gente Real, Resultados Reais</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A3A52] tracking-tight leading-[1.12]">
            O sorriso de quem tem um parceiro{' '}
            <span className="text-[#00B4D8]">financeiro de verdade</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4A5568] max-w-2xl mx-auto leading-relaxed">
            Conheça histórias de quem já transformou o ritmo de recebimentos do próprio negócio com
            a Sea Connection.
          </p>
        </div>

        {/* Testimonials cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#00B4D8]/10 hover:border-[#00B4D8]/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              {/* Photo top with happy person */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.photo}
                  alt={`${item.name} sorrindo em seu negócio`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  width={600}
                  height={700}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

                {/* Badge top-left */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#1A3A52] shadow-sm">
                  {item.tag}
                </div>

                {/* Star rating top-right */}
                <div className="absolute top-4 right-4 bg-[#1A3A52]/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Person details overlay on photo bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#00B4D8] shrink-0"
                      width={44}
                      height={44}
                    />
                    <div>
                      <p className="font-extrabold text-sm sm:text-base leading-tight">
                        {item.name}
                      </p>
                      <p className="text-xs text-white/80">{item.role}</p>
                      <p className="text-[11px] text-[#00B4D8] font-medium">{item.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card content bottom */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00B4D8] bg-[#00B4D8]/10 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.highlight}</span>
                  </div>

                  <div className="relative pt-1">
                    <Quote className="w-6 h-6 text-[#00B4D8]/20 absolute -top-1 -left-1 -z-0" />
                    <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed italic relative z-10">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1A3A52]">{item.metrics}</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Cliente Ativo
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom invitation card */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1A3A52] to-[#00B4D8] text-white flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-md">
              <Star className="w-7 h-7 fill-white" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-extrabold text-[#1A3A52]">
                Sua empresa merece essa tranquilidade
              </h4>
              <p className="text-xs sm:text-sm text-[#4A5568]">
                Abra sua conta em menos de 5 minutos e receba suporte dedicado desde o primeiro dia.
              </p>
            </div>
          </div>
          <Button
            onClick={open}
            className="rounded-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-bold px-7 h-12 shrink-0 shadow-md shadow-[#00B4D8]/20"
          >
            <span>Quero Fazer Parte</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
