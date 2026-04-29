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
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const products = [
  {
    id: 'maquininha',
    title: 'Maquininha de Cartão',
    description: 'Receba no débito e crédito com taxas competitivas em 1 dia.',
    icon: CreditCard,
  },
  {
    id: 'boleto',
    title: 'Boleto Bancário',
    description: 'Geração automática para cobrança de produtos e serviços.',
    icon: FileText,
  },
  {
    id: 'pix',
    title: 'Pix Copia e Cola',
    description: 'Instantâneo, com QR Code e chave personalizada.',
    icon: QrCode,
  },
  {
    id: 'link',
    title: 'Link de Pagamento',
    description: 'Envie por WhatsApp, Instagram ou e-mail. Receba sem site ou loja online.',
    icon: LinkIcon,
  },
  {
    id: 'conta',
    title: 'Conta Digital PJ/PF',
    description: 'Tudo o que você precisa para gerenciar seu dinheiro, sem burocracia.',
    icon: Wallet,
  },
]

export function Products() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    // Simulate network request to show UX states
    const timer = setTimeout(() => {
      // 5% chance of error just to demonstrate the error state if needed,
      // but usually we want it to succeed. Let's make it always succeed for the user.
      setStatus('success')
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleRetry = () => {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
    }, 800)
  }

  return (
    <section id="produtos" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-[40px] animate-fade-in-up">
          <h2 className="h2 mb-[16px]">Nossas Soluções</h2>
          <p className="p-body max-w-2xl mx-auto">Tudo que você precisa para receber pagamentos</p>
        </div>

        {status === 'loading' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[20px]">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-[#E0E0E0] rounded-[12px] card-padding flex flex-col h-full"
              >
                <Skeleton className="w-12 h-12 rounded-lg mb-6" />
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-16 w-full mb-6" />
                <Skeleton className="h-5 w-24 mt-auto" />
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao carregar produtos</AlertTitle>
            <AlertDescription className="mt-2 flex flex-col gap-4">
              <p>Não foi possível carregar a lista de soluções no momento.</p>
              <Button variant="outline" size="sm" onClick={handleRetry} className="w-fit gap-2">
                <RefreshCw className="w-4 h-4" /> Tentar Novamente
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {status === 'success' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[20px]">
            {products.map((product, index) => {
              const Icon = product.icon
              return (
                <div
                  key={product.id}
                  className="bg-white border border-[#E0E0E0] rounded-[12px] card-padding hover:border-[#00B4D8] hover:shadow-medium hover:-translate-y-1 transition-all duration-300 flex flex-col group animate-fade-in-up"
                  style={{ animationDelay: `${(index + 1) * 100}ms`, animationFillMode: 'both' }}
                >
                  <Icon
                    className="w-12 h-12 text-[#00B4D8] mb-[24px] transform group-hover:scale-110 transition-transform duration-300"
                    strokeWidth={1.5}
                  />

                  <h3 className="text-[20px] font-bold text-[#1A3A52] mb-[16px] leading-tight">
                    {product.title}
                  </h3>

                  <p className="p-body text-[14px] mb-[24px] flex-grow">{product.description}</p>

                  <a
                    href="#produtos"
                    className="mt-auto text-[#00B4D8] text-[14px] font-bold flex items-center gap-[8px] group-hover:gap-[12px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
                  >
                    Saiba Mais <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
