import {
  Smartphone,
  Wifi,
  CreditCard,
  CheckCircle2,
  Zap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Banknote,
  Clock,
  Layers,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import useRegistrationStore from '@/stores/use-registration-store'

export function TapToPaySection() {
  const { open } = useRegistrationStore()

  const benefits = [
    {
      icon: Smartphone,
      title: 'Sem maquininha física',
      description:
        'Chega de carregar equipamento extra. Seu smartphone Android ou iOS vira seu ponto de venda.',
    },
    {
      icon: Banknote,
      title: 'Zero aluguel ou mensalidade',
      description:
        'Livre de taxas de comodato, compra de maquininha ou custos fixos. Pague só quando vender.',
    },
    {
      icon: Wifi,
      title: 'Aproximação NFC instantânea',
      description:
        'Aceite cartões físicos, Apple Pay, Google Pay e relógios inteligentes num toque rápido.',
    },
    {
      icon: Clock,
      title: 'Dinheiro direto na conta',
      description:
        'Liquidação rápida e transparente no seu saldo Sea Connection com gestão em tempo real.',
    },
    {
      icon: ShieldCheck,
      title: 'Segurança criptografada',
      description:
        'Certificação com o mais alto padrão da indústria de cartões (PCI-CPOC) protegendo cada venda.',
    },
    {
      icon: Layers,
      title: 'Tudo dentro do app',
      description:
        'Extrato, comprovantes por WhatsApp ou e-mail e estornos simples na mesma plataforma.',
    },
  ]

  return (
    <section
      id="tap-to-pay"
      className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-[#142C3F] via-[#1A3A52] to-[#122738] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-[550px] h-[550px] rounded-full bg-[#00B4D8]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-[600px] h-[600px] rounded-full bg-[#00B4D8]/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00B4D8]/10 via-transparent to-transparent pointer-events-none" />

      {/* Decorative SVG grid / concentric waves */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tap-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tap-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00B4D8]/15 text-[#00B4D8] border border-[#00B4D8]/30 text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#00B4D8] animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-[#00B4D8]" />
            <span>Novidade Exclusiva • Tap to Pay</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.1]">
            Transforme seu celular em uma{' '}
            <span className="relative inline-block text-[#00B4D8] whitespace-nowrap">
              maquininha de cartão
              <svg
                className="absolute -bottom-2 left-0 w-full h-2.5 text-[#00B4D8]/40 -z-10"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                fill="currentColor"
              >
                <path d="M0,15 Q50,0 100,15 Q50,8 0,15 Z" />
              </svg>
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Receba pagamentos no crédito e débito por aproximação direto na tela do seu smartphone.
            Sem custo de aparelho, sem aluguel, sem burocracia.
          </p>
        </div>

        {/* Main Showcase: Visual interactive-feel Mockup + Human Photo + Floating Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-7xl mx-auto mb-16 md:mb-24">
          {/* Left Column: Contextual Photography + Interactive Highlight */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <div className="relative rounded-[32px] overflow-hidden bg-white/5 border border-white/15 p-2 shadow-2xl backdrop-blur-md group">
              <div className="relative h-72 sm:h-80 w-full rounded-[26px] overflow-hidden bg-slate-900">
                <img
                  src="https://img.usecurling.com/p/800/600?q=smiling%20merchant%20holding%20smartphone%20payment"
                  alt="Empreendedor recebendo pagamento com Tap to Pay pelo smartphone"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142C3F] via-[#142C3F]/30 to-transparent" />

                {/* Floating pill over photo */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-2 text-xs font-semibold text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Aproximou, pagou, vendeu</span>
                </div>

                {/* Testimonial snippet inside photo */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl text-[#1A3A52] flex items-center gap-3">
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=56"
                    alt="Rodrigo Neves, cliente Sea Connection"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#00B4D8] shrink-0"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate">Rodrigo Neves • Vendedor Autônomo</p>
                    <p className="text-[11px] text-[#4A5568] leading-tight">
                      &ldquo;Não levo mais maquininha pesada pra rua. Cobro tudo pelo celular em 5
                      segundos!&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick mini-benefits row */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                <p className="text-2xl font-extrabold text-[#00B4D8]">R$ 0</p>
                <p className="text-xs text-slate-300 font-medium">Custo de adesão ou aluguel</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                <p className="text-2xl font-extrabold text-emerald-400">100%</p>
                <p className="text-xs text-slate-300 font-medium">Pelo app Sea Connection</p>
              </div>
            </div>
          </div>

          {/* Right Column: Stylized NFC Smartphone Mockup with Animated Waves & Approaching Card */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center relative">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00B4D8]/20 via-[#00B4D8]/30 to-[#1A3A52]/30 rounded-[44px] blur-3xl -z-10" />

            {/* Mockup Canvas */}
            <div className="relative w-full max-w-[500px]">
              {/* Smartphone Frame */}
              <div className="relative rounded-[40px] p-3 sm:p-4 bg-gradient-to-b from-slate-700/80 via-slate-800/90 to-slate-950 border-2 border-white/20 shadow-2xl shadow-cyan-950/50">
                {/* Smartphone speaker notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-center">
                  <div className="w-10 h-1.5 bg-slate-800 rounded-full" />
                </div>

                {/* Smartphone Screen */}
                <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-[#0D2434] via-[#142F46] to-[#0A1A26] border border-white/10 p-5 sm:p-7 pt-12 space-y-6 text-white min-h-[460px] flex flex-col justify-between">
                  {/* Top Bar inside app */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#00B4D8] flex items-center justify-center text-[#1A3A52] font-black text-xs">
                        SC
                      </div>
                      <span className="text-xs font-bold text-white tracking-wide">
                        Sea Connection App
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold">
                      <Zap className="w-3 h-3" />
                      <span>Tap to Pay Ativo</span>
                    </div>
                  </div>

                  {/* Central Tap Area with NFC animation */}
                  <div className="py-2 text-center space-y-3 relative">
                    <span className="text-xs uppercase tracking-widest text-[#00B4D8] font-bold">
                      Aproxime o cartão na traseira do celular
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                      R$ 150,00
                    </div>
                    <p className="text-xs text-slate-400">Crédito à vista • Sem juros</p>

                    {/* NFC Waves Animation Centerpiece */}
                    <div className="relative w-36 h-36 mx-auto my-3 flex items-center justify-center">
                      {/* Pulse Ring 1 */}
                      <div className="absolute inset-0 rounded-full border-2 border-[#00B4D8]/30 animate-ping opacity-40" />
                      {/* Pulse Ring 2 */}
                      <div className="absolute inset-3 rounded-full border border-[#00B4D8]/50 animate-pulse" />
                      {/* Glowing center disc */}
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#00B4D8] to-[#1A3A52] shadow-lg shadow-[#00B4D8]/50 flex items-center justify-center text-white border-2 border-white/30">
                        <Wifi className="w-9 h-9 rotate-90 text-white animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Approaching contactless credit card illustration */}
                  <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-[#1A3A52] to-[#00B4D8] p-3.5 border border-white/20 shadow-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded bg-amber-400/90 flex items-center justify-center shadow-xs">
                        <div className="w-6 h-4 border border-amber-600/60 rounded-[2px]" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">
                          Cartão por Aproximação
                        </p>
                        <p className="text-xs font-mono text-white">•••• 4242</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#00B4D8]">
                      <Wifi className="w-4 h-4 rotate-90" />
                      <span className="text-[11px] font-bold">NFC OK</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Pill Badge 1: Approved payment */}
              <div className="absolute -top-4 -right-2 sm:-right-6 bg-white text-[#1A3A52] py-2.5 px-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 z-30 animate-bounce duration-1000">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Venda Concluída</p>
                  <p className="text-xs sm:text-sm font-extrabold text-emerald-600">
                    Aprovado • R$ 150,00
                  </p>
                </div>
              </div>

              {/* Floating Pill Badge 2: Sem maquininha física */}
              <div className="absolute -bottom-5 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md text-[#1A3A52] py-2.5 px-4 rounded-2xl shadow-2xl border border-white/60 flex items-center gap-3 z-30">
                <div className="w-8 h-8 rounded-full bg-[#00B4D8]/15 text-[#00B4D8] flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">100% no Celular</p>
                  <p className="text-xs sm:text-sm font-extrabold text-[#1A3A52]">
                    Sem maquininha • Zero aluguel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid: 6 cards in Inter/Nubank design style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-14">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <div
                key={i}
                className="group relative rounded-3xl p-7 sm:p-8 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-[#00B4D8]/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#00B4D8]/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 group-hover:bg-[#00B4D8] border border-white/15 text-[#00B4D8] group-hover:text-[#1A3A52] flex items-center justify-center mb-5 transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-[#00B4D8]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Disponível no seu app</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-white/10 via-white/[0.08] to-white/10 border border-white/20 p-8 sm:p-10 backdrop-blur-md text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Comece a cobrar por aproximação hoje mesmo
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Abra sua conta grátis na Sea Connection em minutos e ative o Tap to Pay direto pelo
              aplicativo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              onClick={open}
              size="lg"
              className="h-14 px-9 rounded-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-bold text-base shadow-xl shadow-[#00B4D8]/30 hover:shadow-2xl hover:shadow-[#00B4D8]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
            >
              <span>Quero ativar o Tap to Pay</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={open}
              variant="outline"
              size="lg"
              className="h-14 px-8 rounded-full border-2 border-white/30 text-white hover:bg-white hover:text-[#1A3A52] font-bold text-base transition-all bg-transparent"
            >
              Criar Conta Grátis
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-300 font-medium pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00B4D8]" /> Compatível com Android e iOS
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00B4D8]" /> Sem mensalidade
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00B4D8]" /> Ativação 100% digital
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
