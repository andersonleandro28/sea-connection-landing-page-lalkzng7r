import { useState, useEffect } from 'react'
import {
  CreditCard,
  FileText,
  QrCode,
  Link as LinkIcon,
  Wallet,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  Sparkles,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import useRegistrationStore from '@/stores/use-registration-store'

const products = [
  {
    id: 'maquininha',
    title: 'Maquininha de Cartão',
    tagline: 'Presencial',
    description:
      'Receba no débito e crédito com as taxas mais competitivas do mercado e liquidação em 1 dia útil.',
    icon: CreditCard,
    badge: 'Taxa reduzida',
    features: ['Débito e crédito', 'Sem aluguel abusivo', 'NFC / Aproximação'],
    userImage: 'https://img.usecurling.com/p/400/220?q=smiling%20merchant%20payment',
    userCaption: 'Comerciantes atendem clientes com rapidez no balcão',
  },
  {
    id: 'pix',
    title: 'Pix Copia e Cola',
    tagline: 'Instantâneo',
    description:
      'Recebimento imediato 24 horas por dia. QR Code dinâmico, chave personalizada e conciliação em tempo real.',
    icon: QrCode,
    badge: 'Disponível 24/7',
    features: ['Liquidação no segundo', 'Chave personalizada', 'QR Code dinâmico'],
    userImage: 'https://img.usecurling.com/p/400/220?q=happy%20person%20phone%20pix',
    userCaption: 'Clientes pagam em segundos direto pelo celular',
  },
  {
    id: 'boleto',
    title: 'Boleto Bancário',
    tagline: 'Gestão de Cobrança',
    description:
      'Emissão rápida com registro automático e baixa facilitada. Perfeito para vendas B2B e prestadores.',
    icon: FileText,
    badge: 'Baixa automática',
    features: ['Registro instantâneo', 'Lembretes automáticos', 'Juros configuráveis'],
    userImage: 'https://img.usecurling.com/p/400/220?q=smiling%20office%20worker%20laptop',
    userCaption: 'Gestão financeira prática para o time da sua empresa',
  },
  {
    id: 'link',
    title: 'Link de Pagamento',
    tagline: 'Vendas Online',
    description:
      'Venda pelo WhatsApp, redes sociais ou e-mail sem precisar de site ou catálogo complexo.',
    icon: LinkIcon,
    badge: 'Sem complicação',
    features: ['Compartilhe no WhatsApp', 'Parcelamento em até 12x', 'Anti-fraude integrado'],
    userImage: 'https://img.usecurling.com/p/400/220?q=happy%20woman%20smartphone%20shopping',
    userCaption: 'Venda conversando direto com seus clientes',
  },
  {
    id: 'conta',
    title: 'Conta Digital PJ/PF',
    tagline: 'Super App',
    description:
      'Gerencie saldo, extrato, transferências e pagamentos em uma interface moderna, transparente e sem burocracia.',
    icon: Wallet,
    badge: '100% Gratuita',
    features: ['Zero mensalidade', 'Gestão multi-usuário', 'Relatórios detalhados'],
    userImage: 'https://img.usecurling.com/p/400/220?q=smiling%20entrepreneur%20success',
    userCaption: 'Controle total do negócio na palma da mão',
  },
]

export function Products() {
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
    <section id="produtos" className="py-20 md:py-28 lg:py-32 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ecossistema Completo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A3A52] tracking-tight leading-[1.12]">
            Tudo o que você precisa para <span className="text-[#00B4D8]">vender mais</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A5568] max-w-2xl mx-auto leading-relaxed">
            Soluções completas e integradas desenhadas para o dia a dia do empreendedor moderno. Sem
            letras miúdas, sem pegadinhas.
          </p>
        </div>

        {/* Loading State Skeleton */}
        {status === 'loading' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-[#FAFCFF] border border-slate-100 rounded-3xl p-8 flex flex-col h-[340px]"
              >
                <Skeleton className="w-14 h-14 rounded-2xl mb-6 bg-slate-200/70" />
                <Skeleton className="h-4 w-24 mb-2 bg-slate-200/70" />
                <Skeleton className="h-7 w-3/4 mb-4 bg-slate-200/70" />
                <Skeleton className="h-16 w-full mb-6 bg-slate-200/70" />
                <Skeleton className="h-6 w-28 mt-auto rounded-full bg-slate-200/70" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <Alert variant="destructive" className="max-w-md mx-auto rounded-2xl p-6">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-base font-bold">Erro ao carregar soluções</AlertTitle>
            <AlertDescription className="mt-2 flex flex-col gap-4">
              <p className="text-sm">Não foi possível carregar a lista de produtos no momento.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="w-fit rounded-full gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Tentar Novamente
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Success State: Modern digital-bank cards (Inter/Nubank inspired) */}
        {status === 'success' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {products.map((product, index) => {
              const Icon = product.icon
              const isHighlight = index === 0 // First card can have subtle prominence

              return (
                <div
                  key={product.id}
                  className={`group relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between border ${
                    isHighlight
                      ? 'bg-gradient-to-b from-[#F0F9FF] to-white border-[#00B4D8]/30 shadow-md shadow-[#00B4D8]/5 hover:shadow-xl hover:border-[#00B4D8]'
                      : 'bg-[#FAFCFF] hover:bg-white border-slate-100/90 hover:border-[#00B4D8]/30 shadow-sm hover:shadow-xl hover:shadow-slate-200/60'
                  } hover:-translate-y-1.5`}
                >
                  {/* Card top */}
                  <div>
                    {/* Real human context thumbnail */}
                    {product.userImage && (
                      <div className="relative h-32 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-slate-100">
                        <img
                          src={product.userImage}
                          alt={product.userCaption || product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          width={400}
                          height={220}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A52]/60 via-transparent to-transparent" />
                        <span className="absolute bottom-2 left-3 right-3 text-[11px] font-medium text-white/95 truncate">
                          {product.userCaption}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm text-[#00B4D8] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00B4D8] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" strokeWidth={1.8} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00B4D8]/10 text-[#00B4D8]">
                        {product.badge}
                      </span>
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {product.tagline}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A3A52] mb-2 leading-snug">
                      {product.title}
                    </h3>

                    <p className="text-sm text-[#4A5568] leading-relaxed mb-5 font-normal">
                      {product.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-xs sm:text-sm text-slate-600"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card bottom: CTA trigger modal */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={open}
                      className="text-sm font-bold text-[#00B4D8] hover:text-[#0096B4] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all cursor-pointer"
                    >
                      <span>Quero essa solução</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-slate-400">Ativação rápida</span>
                  </div>
                </div>
              )
            })}

            {/* Extra Promo / All-in-One Card with Happy Advisor photo */}
            <div className="rounded-3xl p-8 bg-gradient-to-br from-[#1A3A52] via-[#1E4360] to-[#0D2434] text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#00B4D8]/20 blur-2xl pointer-events-none" />
              <div>
                {/* Advisor photo banner */}
                <div className="relative h-32 w-full rounded-2xl overflow-hidden mb-5 bg-white/10 border border-white/10">
                  <img
                    src="https://img.usecurling.com/p/400/220?q=smiling%20financial%20advisor"
                    alt="Consultores da Sea Connection prontos para ajudar sua empresa"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width={400}
                    height={220}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2434]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 right-3 text-[11px] font-medium text-white/90 truncate">
                    Consultoria personalizada e humanizada
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-[#00B4D8] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#00B4D8]" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00B4D8]/20 text-[#00B4D8]">
                    Personalizado
                  </span>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8] block mb-1">
                  Sob Medida
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-snug">
                  Precisa de um pacote para sua empresa?
                </h3>
                <p className="text-sm text-white/80 leading-relaxed mb-6 font-normal">
                  Montamos uma proposta personalizada com taxas especiais para o volume do seu
                  negócio. Fale com nossos consultores.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Button
                  onClick={open}
                  className="w-full h-12 rounded-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-bold text-sm shadow-md transition-all"
                >
                  Falar com um Especialista
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
