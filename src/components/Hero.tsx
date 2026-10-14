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
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#00B4D8]/20 shadow-sm text-[#1A3A52] text-xs sm:text-sm font-semibold hover:border-[#00B4D8]/40 transition-all">
              <span className="flex h-2 w-2 rounded-full bg-[#00B4D8] animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-[#00B4D8]" />
              <span>O banco que conecta o seu negócio</span>
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
              Maquininha, Pix, Boleto, Link de Pagamento e Conta Digital. Tudo o que sua empresa
              precisa em um só lugar, com atendimento próximo e sem burocracia.
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

          {/* Right Column: Modern visual composition / stylized digital banking card mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Main Phone / Dashboard Mockup Container */}
            <div className="relative w-full max-w-[420px] sm:max-w-[460px]">
              {/* Outer decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#00B4D8]/20 via-[#1A3A52]/10 to-[#00B4D8]/20 rounded-[36px] blur-2xl -z-10" />

              {/* Central stylized modern bank app card */}
              <div className="relative rounded-[32px] bg-white p-6 sm:p-7 shadow-2xl shadow-[#1A3A52]/15 border border-slate-100/80">
                {/* Header inside mockup */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1A3A52] to-[#00B4D8] flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                      SC
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Conta Digital PJ
                      </p>
                      <p className="text-sm font-bold text-[#1A3A52]">Sea Connection</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/50">
                    <Zap className="w-3 h-3" />
                    <span>Ao vivo</span>
                  </div>
                </div>

                {/* Balance display */}
                <div className="py-6 space-y-1.5">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Saldo disponível
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#1A3A52] tracking-tight">
                      R$ 48.920,50
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <ArrowUpRight className="w-3 h-3 mr-0.5" /> +18.4%
                    </span>
                    <span className="text-xs text-slate-400">vs. mês anterior</span>
                  </div>
                </div>

                {/* Stylized physical/virtual card preview */}
                <div className="relative rounded-2xl bg-gradient-to-br from-[#1A3A52] via-[#1E4360] to-[#0D2434] p-5 text-white shadow-xl overflow-hidden my-2">
                  <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#00B4D8]/25 blur-xl pointer-events-none" />
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-bold tracking-widest text-[#00B4D8] uppercase">
                        Sea Platinum Business
                      </p>
                      <p className="text-xs text-white/70">Cartão Corporativo</p>
                    </div>
                    <CreditCard className="w-6 h-6 text-[#00B4D8]" />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <span className="font-mono text-sm tracking-widest text-white/90">
                      •••• •••• •••• 8842
                    </span>
                    <div className="w-8 h-5 rounded-md bg-white/20 backdrop-blur-sm border border-white/30" />
                  </div>
                </div>

                {/* Quick actions row inside card */}
                <div className="grid grid-cols-3 gap-2.5 pt-4">
                  <div className="p-3 rounded-xl bg-slate-50 hover:bg-[#00B4D8]/5 border border-slate-100 transition-colors text-center">
                    <QrCode className="w-5 h-5 mx-auto text-[#00B4D8] mb-1" />
                    <span className="text-[11px] font-bold text-[#1A3A52] block">Cobrar Pix</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 hover:bg-[#00B4D8]/5 border border-slate-100 transition-colors text-center">
                    <Smartphone className="w-5 h-5 mx-auto text-[#00B4D8] mb-1" />
                    <span className="text-[11px] font-bold text-[#1A3A52] block">Maquininha</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 hover:bg-[#00B4D8]/5 border border-slate-100 transition-colors text-center">
                    <ShieldCheck className="w-5 h-5 mx-auto text-[#00B4D8] mb-1" />
                    <span className="text-[11px] font-bold text-[#1A3A52] block">Segurança</span>
                  </div>
                </div>
              </div>

              {/* Floating pill badge 1: Instant transaction received */}
              <div className="absolute -left-4 sm:-left-8 top-16 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div className="w-9 h-9 rounded-full bg-[#00B4D8]/15 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-[#00B4D8]" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-medium text-slate-400">Pix Recebido</p>
                  <p className="text-xs font-bold text-[#1A3A52]">+ R$ 1.420,00</p>
                </div>
              </div>

              {/* Floating pill badge 2: Protected/verified by security */}
              <div className="absolute -right-3 sm:-right-6 -bottom-4 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-medium text-slate-400">Proteção Ativa</p>
                  <p className="text-xs font-bold text-[#1A3A52]">Transações 100% Seguras</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
