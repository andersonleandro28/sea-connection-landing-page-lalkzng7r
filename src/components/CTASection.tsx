import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useRegistrationStore from '@/stores/use-registration-store'

export function CTASection() {
  const { open } = useRegistrationStore()

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-[#FAFCFF] relative overflow-hidden">
      {/* Background soft gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#00B4D8]/10 via-[#1A3A52]/5 to-[#00B4D8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto rounded-[36px] bg-gradient-to-br from-[#1A3A52] via-[#1E4360] to-[#0D2434] text-white p-8 sm:p-12 md:p-16 shadow-2xl shadow-[#1A3A52]/20 border border-slate-700/50 text-center relative overflow-hidden">
          {/* Subtle inner organic glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#00B4D8]/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-[#00B4D8]/15 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#00B4D8] border border-white/10 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              Comece hoje mesmo
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              Pronto para transformar os pagamentos do seu negócio?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Junte-se a mais de 50.000 clientes que já simplificaram suas cobranças e escalaram
              seus resultados com a Sea Connection.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                onClick={open}
                className="w-full sm:w-auto h-14 px-9 rounded-full bg-[#00B4D8] hover:bg-[#0096B4] text-white font-bold text-base shadow-lg shadow-[#00B4D8]/30 hover:shadow-xl hover:shadow-[#00B4D8]/40 hover:-translate-y-0.5 transition-all group"
              >
                <span>Criar Conta Agora</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-14 px-8 rounded-full border-2 border-white/30 text-white hover:bg-white hover:text-[#1A3A52] font-bold text-base transition-all bg-transparent"
              >
                <a
                  href="https://seaconnection.new.paytime.com.br/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <span>Acessar Conta</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" />
                <span>Sem taxa de adesão</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" />
                <span>Aprovação 100% online</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" />
                <span>Atendimento prioritário</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
