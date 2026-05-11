import { Button } from '@/components/ui/button'
import useRegistrationStore from '@/stores/use-registration-store'

export function CTASection() {
  const { open } = useRegistrationStore()

  return (
    <section className="section-padding px-4 bg-[#FFFFFF] text-center border-t border-[#E0E0E0]">
      <div
        className="container mx-auto max-w-4xl space-y-[32px] animate-slide-up opacity-0"
        style={{ animationFillMode: 'forwards' }}
      >
        <div className="space-y-[16px]">
          <h2 className="h2">Pronto para começar?</h2>
          <p className="p-body text-[20px]">
            Junte-se a 50.000+ clientes que já confiam na Sea Connection
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[16px] pt-4">
          <Button size="lg" onClick={open} className="w-full sm:w-auto">
            Criar Conta Agora
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <a
              href="https://seaconnection.new.paytime.com.br/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acessar Conta
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
