import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  MessageCircle,
  MapPin,
  ArrowUpRight,
} from 'lucide-react'
import { useConfigStore } from '@/stores/use-config-store'
import { Skeleton } from '@/components/ui/skeleton'
import logoUrl from '@/assets/sea-connection-investimentos-s.a.ab60f.png'

export function Footer() {
  const { config, loading } = useConfigStore()

  return (
    <footer className="bg-[#1A3A52] text-white relative overflow-hidden border-t border-slate-800">
      {/* Decorative subtle glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#00B4D8]/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="Sea Connection Logo" className="h-10 w-auto object-contain" />
              <span className="font-extrabold text-xl tracking-tight text-white">
                Sea Connection
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              O ecossistema financeiro feito para conectar e acelerar negócios com simplicidade,
              segurança e taxas transparentes.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#00B4D8] font-semibold">
              <span>Operando com solidez desde 2019</span>
            </div>

            {loading ? (
              <div className="flex items-start gap-2 pt-2">
                <Skeleton className="h-4 w-4 bg-white/20 shrink-0 mt-0.5" />
                <Skeleton className="h-4 w-48 bg-white/20" />
              </div>
            ) : config?.endereco_empresa ? (
              <div className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm pt-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#00B4D8]" />
                <p className="leading-relaxed">{config.endereco_empresa}</p>
              </div>
            ) : null}
          </div>

          {/* Solutions Column */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white">Soluções</h4>
            <ul className="space-y-3">
              {[
                { name: 'Maquininha de Cartão', href: '#produtos' },
                { name: 'Boleto Bancário', href: '#produtos' },
                { name: 'Pix Copia e Cola', href: '#produtos' },
                { name: 'Link de Pagamento', href: '#produtos' },
                { name: 'Conta Digital PJ/PF', href: '#produtos' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-300 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column - realtime from configuracoes */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white" id="contato">
              Contato & Suporte
            </h4>
            <ul className="space-y-3">
              {loading ? (
                <>
                  <Skeleton className="h-5 w-40 bg-white/20" />
                  <Skeleton className="h-5 w-32 bg-white/20" />
                  <Skeleton className="h-5 w-24 bg-white/20" />
                </>
              ) : (
                <>
                  {config?.email_contato && (
                    <li>
                      <a
                        href={`mailto:${config.email_contato}`}
                        className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
                      >
                        <Mail className="h-4 w-4 shrink-0 text-[#00B4D8]" />
                        <span>{config.email_contato}</span>
                      </a>
                    </li>
                  )}
                  {config?.whatsapp_numero && (
                    <li>
                      <a
                        href={`https://wa.me/${config.whatsapp_numero.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
                      >
                        <MessageCircle className="h-4 w-4 shrink-0 text-[#00B4D8]" />
                        <span>WhatsApp Oficial</span>
                      </a>
                    </li>
                  )}
                  {config?.faq_documento_url && (
                    <li>
                      <a
                        href={config.faq_documento_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-300 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm flex items-center gap-1.5"
                      >
                        <span>Central de Ajuda / FAQ</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      href="#diferenciais"
                      className="text-sm text-slate-300 hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm block"
                    >
                      Diferenciais & Segurança
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Social Links Column */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white">Redes Sociais</h4>
            <p className="text-xs text-slate-400">
              Acompanhe novidades, atualizações de produtos e dicas para o seu negócio.
            </p>
            <div className="flex gap-2.5 flex-wrap pt-1">
              {loading ? (
                <>
                  <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
                  <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
                  <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
                  <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
                </>
              ) : (
                <>
                  {config?.instagram_url && (
                    <a
                      href={config.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram da Sea Connection"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#00B4D8] hover:text-[#1A3A52] text-white flex items-center justify-center transition-all duration-200 border border-white/10"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                  {config?.linkedin_url && (
                    <a
                      href={config.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn da Sea Connection"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#00B4D8] hover:text-[#1A3A52] text-white flex items-center justify-center transition-all duration-200 border border-white/10"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {config?.facebook_url && (
                    <a
                      href={config.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook da Sea Connection"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#00B4D8] hover:text-[#1A3A52] text-white flex items-center justify-center transition-all duration-200 border border-white/10"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  )}
                  {config?.twitter_url && (
                    <a
                      href={config.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter da Sea Connection"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#00B4D8] hover:text-[#1A3A52] text-white flex items-center justify-center transition-all duration-200 border border-white/10"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal document links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Sea Connection Investimentos S.A. Todos os direitos
            reservados.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {loading ? (
              <>
                <Skeleton className="h-4 w-20 bg-white/20" />
                <Skeleton className="h-4 w-20 bg-white/20" />
              </>
            ) : (
              <>
                {config?.privacidade_documento_url && (
                  <a
                    href={config.privacidade_documento_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
                  >
                    Privacidade
                  </a>
                )}
                {config?.termos_documento_url && (
                  <a
                    href={config.termos_documento_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
                  >
                    Termos de Uso
                  </a>
                )}
              </>
            )}
            <a
              href="#"
              className="hover:text-[#00B4D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] rounded-sm"
            >
              Políticas de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
