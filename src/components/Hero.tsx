import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowUpRight,
  Sparkles,
  Smartphone,
  CreditCard,
  QrCode,
} from 'lucide-react'
import useRegistrationStore from '@/stores/use-registration-store'

export function Hero() {
  const { open } = useRegistrationStore()

  const scrollToProducts = () => {
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-44 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F2F8FC] via-[#FAFCFF] to-white">
      {/* Organic fluid background shapes with brand colors */}
      <div className="absolute -top-32 -right-32 w-[620px] h-[620px] rounded-full bg-gradient-to-br from-[#00B4D8]/15 via-[#00B4D8]/5 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 -left-40 w-[540px] h-[540px] rounded-full bg-gradient-to-tr from-[#1A3A52]/10 via-[#00B4D8]/10 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#00B4D8]/5 blur-2xl pointer-events-none -z-0" />

      {/* Subtle organic wavy lines (SVG decorative element) */}
      <div className="absolute inset-0 pointer-events-none opacity-40 -z-0 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 200 C 300 120, 600 350, 1000 220 C 1300 100, 1500 260, 1600 240"
            stroke="url(#paint0_linear)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <path
            d="M-50 480 C 350 420, 700 620, 1100 480 C 1350 400, 1520 540, 1650 510"
            stroke="url(#paint1_linear)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="0"
              y1="0"
              x2="1440"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00B4D8" stopOpacity="0.2" />
              <stop offset="0.5" stopColor="#1A3A52" stopOpacity="0.25" />
              <stop offset="1" stopColor="#00B4D8" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="0"
              y1="0"
              x2="1440"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A3A52" stopOpacity="0.15" />
              <stop offset="0.5" stopColor="#00B4D8" stopOpacity="0.3" />
              <stop offset="1" stopColor="#1A3A52" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Big typography, humanized tone, pill CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            {/* Pill badge + Happy customers mini-avatars */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#00B4D8]/20 shadow-sm text-[#1A3A52] text-xs sm:text-sm font-semibold hover:border-[#00B4D8]/40 transition-all">
                <span className="flex h-2 w-2 rounded-full bg-[#00B4D8] animate-pulse" />
                <Sparkles className="w-3.5 h-3.5 text-[#00B4D8]" />
                <span>O banco que conecta o seu negócio</span>
              </div>

              {/* Real happy customers avatar cluster */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200/60 shadow-xs">
                <div className="flex -space-x-2">
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12"
                    alt="Cliente satisfeita da Sea Connection"
                    className="w-7 h-7 rounded-full object-cover border-2 border-white ring-1 ring-slate-100"
                    width={28}
                    height={28}
                    loading="eager"
                  />
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45"
                    alt="Empreendedor cliente da Sea Connection"
                    className="w-7 h-7 rounded-full object-cover border-2 border-white ring-1 ring-slate-100"
                    width={28}
                    height={28}
                    loading="eager"
                  />
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=77"
                    alt="Comerciante usuária da Sea Connection"
                    className="w-7 h-7 rounded-full object-cover border-2 border-white ring-1 ring-slate-100"
                    width={28}
                    height={28}
                    loading="eager"
                  />
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=88"
                    alt="Cliente satisfeito usando maquininha"
                    className="w-7 h-7 rounded-full object-cover border-2 border-white ring-1 ring-slate-100"
                    width={28}
                    height={28}
                    loading="eager"
                  />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#1A3A52]">
                  <span className="text-amber-500">★ 4.9</span>
                  <span className="text-slate-400 font-normal">| +50 mil felizes</span>
                </div>
              </div>
            </div>

            {/* Main Headline - Inter & Nubank style with big expressive typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-extrabold text-[#1A3A52] tracking-tight leading-[1.08]">
              Receba pagamentos de forma{' '}
              <span className="relative inline-block text-[#00B4D8] whitespace-nowrap">
                simples e rápida
                <svg
                  className="absolute -bottom-2 left-0 w-full h-2.5 text-[#00B4D8]/30 -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M0,15 Q50,0 100,15 Q50,8 0,15 Z" />
                </svg>
              </span>
            </h1>

            {/* Subheadline - Clear, friendly, comprehensive */}
            <p className="text-lg sm:text-xl text-[#4A5568] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Tap to Pay no celular, Maquininha, Pix, Boleto, Link de Pagamento e Conta Digital.
              Tudo o que sua empresa precisa em um só lugar, com atendimento próximo e sem
              burocracia.
            </p>

            {/* Pill CTAs - Big, expressive, high contrast */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                onClick={open}
                size="lg"
                className="h-14 px-9 rounded-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-bold text-base shadow-lg shadow-[#00B4D8]/30 hover:shadow-xl hover:shadow-[#00B4D8]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
              >
                <span>Começar Agora</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={scrollToProducts}
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-full border-2 border-[#1A3A52] text-[#1A3A52] hover:bg-[#1A3A52] hover:text-white font-bold text-base transition-all duration-200"
              >
                Saiba Mais
              </Button>
            </div>

            {/* Trust bullet points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-[#4A5568] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" />
                <span>Sem taxa de adesão</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" />
                <span>Receba em até 1 dia útil</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" />
                <span>Suporte humanizado 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Column: Modern visual composition combining real happy entrepreneur photography + stylized digital banking card mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Main Phone / Photo & Dashboard Composition Container */}
            <div className="relative w-full max-w-[420px] sm:max-w-[470px]">
              {/* Outer decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#00B4D8]/20 via-[#1A3A52]/10 to-[#00B4D8]/20 rounded-[36px] blur-2xl -z-10" />

              {/* Real Human Photography card: Happy entrepreneur smiling with smartphone receiving payment */}
              <div className="relative rounded-[32px] overflow-hidden bg-white shadow-2xl shadow-[#1A3A52]/15 border border-slate-100/90 group">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                  <img
                    src="https://img.usecurling.com/p/800/600?q=smiling%20happy%20business%20phone"
                    alt="Empreendedora feliz conferindo pagamentos recebidos no celular com a Sea Connection"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    width={800}
                    height={600}
                    loading="eager"
                  />
                  {/* Subtle brand gradient overlay on bottom of photo to merge into card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A52]/85 via-transparent to-black/10" />

                  {/* Customer testimonial quote pill inside photo */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/50 flex items-center gap-3">
                    <img
                      src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12"
                      alt="Mariana Costa, cliente Sea Connection"
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#00B4D8] shrink-0"
                      width={40}
                      height={40}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#1A3A52] truncate">
                        Mariana Costa • Sócia de Cafeteria
                      </p>
                      <p className="text-[11px] text-[#4A5568] leading-tight">
                        &ldquo;Recebo no Pix na hora e as taxas da maquininha são as
                        melhores!&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Central stylized modern bank app card body */}
                <div className="p-5 sm:p-6 space-y-4 bg-white">
                  {/* Header inside mockup */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1A3A52] to-[#00B4D8] flex items-center justify-center text-white font-extrabold text-xs shadow-sm">
                        SC
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          Conta Digital PJ
                        </p>
                        <p className="text-xs font-bold text-[#1A3A52]">Sea Connection</p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/50">
                      <Zap className="w-3 h-3" />
                      <span>Saldo em Tempo Real</span>
                    </div>
                  </div>

                  {/* Balance display */}
                  <div className="py-2 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Saldo disponível
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#1A3A52] tracking-tight">
                        R$ 48.920,50
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="inline-flex items-center text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <ArrowUpRight className="w-3 h-3 mr-0.5" /> +18.4%
                      </span>
                      <span className="text-[11px] text-slate-400">vs. mês anterior</span>
                    </div>
                  </div>

                  {/* Stylized physical/virtual card preview */}
                  <div className="relative rounded-2xl bg-gradient-to-br from-[#1A3A52] via-[#1E4360] to-[#0D2434] p-4 text-white shadow-lg overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#00B4D8]/25 blur-xl pointer-events-none" />
                    <div className="flex justify-between items-start mb-3">
                      <div className="space-y-0.5">
                        <p className="text-[9px] font-bold tracking-widest text-[#00B4D8] uppercase">
                          Sea Platinum Business
                        </p>
                        <p className="text-[11px] text-white/70">Cartão Corporativo</p>
                      </div>
                      <CreditCard className="w-5 h-5 text-[#00B4D8]" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-mono text-xs tracking-widest text-white/90">
                        •••• •••• •••• 8842
                      </span>
                      <div className="w-7 h-4 rounded bg-white/20 backdrop-blur-sm border border-white/30" />
                    </div>
                  </div>

                  {/* Quick actions row inside card */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="p-2 rounded-xl bg-slate-50 hover:bg-[#00B4D8]/5 border border-slate-100 transition-colors text-center">
                      <QrCode className="w-4 h-4 mx-auto text-[#00B4D8] mb-1" />
                      <span className="text-[10px] font-bold text-[#1A3A52] block">Cobrar Pix</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 hover:bg-[#00B4D8]/5 border border-slate-100 transition-colors text-center">
                      <Smartphone className="w-4 h-4 mx-auto text-[#00B4D8] mb-1" />
                      <span className="text-[10px] font-bold text-[#1A3A52] block">Maquininha</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 hover:bg-[#00B4D8]/5 border border-slate-100 transition-colors text-center">
                      <ShieldCheck className="w-4 h-4 mx-auto text-[#00B4D8] mb-1" />
                      <span className="text-[10px] font-bold text-[#1A3A52] block">Segurança</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating pill badge 1: Instant transaction received with happy sender avatar */}
              <div className="absolute -left-4 sm:-left-7 top-10 bg-white/95 backdrop-blur-md py-2 px-3.5 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 flex items-center gap-2.5 z-20">
                <img
                  src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=33"
                  alt="Cliente pagador feliz"
                  className="w-8 h-8 rounded-full object-cover border border-emerald-400"
                  width={32}
                  height={32}
                />
                <div className="text-left">
                  <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 text-[#00B4D8]" /> Pix Recebido
                  </p>
                  <p className="text-xs font-bold text-emerald-600">+ R$ 1.420,00</p>
                </div>
              </div>

              {/* Floating pill badge 2: Protected/verified by security with advisor photo */}
              <div className="absolute -right-3 sm:-right-6 -bottom-3 bg-white/95 backdrop-blur-md py-2 px-3.5 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 flex items-center gap-2.5 z-20">
                <img
                  src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=94"
                  alt="Consultora de suporte Sea Connection sorrindo"
                  className="w-8 h-8 rounded-full object-cover border border-[#00B4D8]"
                  width={32}
                  height={32}
                />
                <div className="text-left">
                  <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Suporte 24h Online
                  </p>
                  <p className="text-xs font-bold text-[#1A3A52]">Atendimento Humano</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
