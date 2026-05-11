import { Facebook, Instagram, Linkedin, Twitter, Mail, MessageCircle, MapPin } from 'lucide-react'
import { useConfigStore } from '@/stores/use-config-store'
import { Skeleton } from '@/components/ui/skeleton'

export function Footer() {
  const { config, loading } = useConfigStore()

  return (
    <footer
      className="bg-[#1A3A52] text-[#FFFFFF] animate-fade-in opacity-0"
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="container mx-auto section-padding px-[24px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://img.usecurling.com/i?q=waves&color=white&shape=fill"
                alt="Sea Connection Logo White"
                className="h-8 w-8 object-contain"
              />
              <span className="font-bold text-[20px]">Sea Connection</span>
            </div>
            <p className="text-[#FFFFFF]/80 text-[14px] leading-relaxed">
              Receba pagamentos de forma simples e rápida
            </p>
            <p className="text-[#FFFFFF]/80 text-[14px]">Operando desde 2019</p>

            {loading ? (
              <div className="flex items-start gap-2 mt-2">
                <Skeleton className="h-4 w-4 bg-[#FFFFFF]/20 shrink-0 mt-0.5" />
                <Skeleton className="h-4 w-48 bg-[#FFFFFF]/20" />
              </div>
            ) : config?.endereco_empresa ? (
              <div className="flex items-start gap-2 text-[#FFFFFF]/80 mt-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <p className="text-[14px]">{config.endereco_empresa}</p>
              </div>
            ) : null}
          </div>

          <div className="space-y-[16px]">
            <h4 className="font-bold text-[14px] uppercase tracking-wider text-[#FFFFFF]">
              Produtos
            </h4>
            <ul className="space-y-[12px]">
              {[
                'Maquininha de Cartão',
                'Boleto Bancário',
                'Pix Copia e Cola',
                'Link de Pagamento',
                'Conta Digital',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[14px] text-[#FFFFFF]/80 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-[16px]">
            <h4 className="font-bold text-[14px] uppercase tracking-wider text-[#FFFFFF]">
              Contato & Suporte
            </h4>
            <ul className="space-y-[12px]">
              {loading ? (
                <>
                  <Skeleton className="h-5 w-40 bg-[#FFFFFF]/20" />
                  <Skeleton className="h-5 w-32 bg-[#FFFFFF]/20" />
                  <Skeleton className="h-5 w-24 bg-[#FFFFFF]/20" />
                </>
              ) : (
                <>
                  {config?.email_contato && (
                    <li>
                      <a
                        href={`mailto:${config.email_contato}`}
                        className="flex items-center gap-2 text-[14px] text-[#FFFFFF]/80 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
                      >
                        <Mail className="h-4 w-4 shrink-0" />
                        {config.email_contato}
                      </a>
                    </li>
                  )}
                  {config?.whatsapp_numero && (
                    <li>
                      <a
                        href={`https://wa.me/${config.whatsapp_numero.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[14px] text-[#FFFFFF]/80 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
                      >
                        <MessageCircle className="h-4 w-4 shrink-0" />
                        WhatsApp
                      </a>
                    </li>
                  )}
                  {config?.faq_documento_url && (
                    <li>
                      <a
                        href={config.faq_documento_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] text-[#FFFFFF]/80 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm block"
                      >
                        FAQ
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      href="#"
                      className="text-[14px] text-[#FFFFFF]/80 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm block"
                    >
                      Documentação
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="space-y-[16px]">
            <h4 className="font-bold text-[14px] uppercase tracking-wider text-[#FFFFFF]">
              Redes Sociais
            </h4>
            <div className="flex gap-[16px] flex-wrap">
              {loading ? (
                <>
                  <Skeleton className="h-7 w-7 rounded-sm bg-[#FFFFFF]/20" />
                  <Skeleton className="h-7 w-7 rounded-sm bg-[#FFFFFF]/20" />
                  <Skeleton className="h-7 w-7 rounded-sm bg-[#FFFFFF]/20" />
                  <Skeleton className="h-7 w-7 rounded-sm bg-[#FFFFFF]/20" />
                </>
              ) : (
                <>
                  {config?.instagram_url && (
                    <a
                      href={config.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFFFFF]/80 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm p-1"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {config?.linkedin_url && (
                    <a
                      href={config.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFFFFF]/80 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm p-1"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {config?.facebook_url && (
                    <a
                      href={config.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFFFFF]/80 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm p-1"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                  {config?.twitter_url && (
                    <a
                      href={config.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFFFFF]/80 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm p-1"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-[#444444] pt-[32px] mt-[40px] flex flex-col md:flex-row items-center justify-between gap-[16px]">
          <p className="text-[#FFFFFF]/80 text-[14px] text-center md:text-left">
            © {new Date().getFullYear()} Sea Connection. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-[24px]">
            {loading ? (
              <>
                <Skeleton className="h-5 w-24 bg-[#FFFFFF]/20" />
                <Skeleton className="h-5 w-24 bg-[#FFFFFF]/20" />
              </>
            ) : (
              <>
                {config?.privacidade_documento_url && (
                  <a
                    href={config.privacidade_documento_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFFFFF]/80 hover:text-[#00B4D8] text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
                  >
                    Privacidade
                  </a>
                )}
                {config?.termos_documento_url && (
                  <a
                    href={config.termos_documento_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFFFFF]/80 hover:text-[#00B4D8] text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
                  >
                    Termos de Uso
                  </a>
                )}
              </>
            )}
            <a
              href="#"
              className="text-[#FFFFFF]/80 hover:text-[#00B4D8] text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
