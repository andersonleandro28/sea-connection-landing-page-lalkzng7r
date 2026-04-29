import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { isValidCPF, isValidCNPJ } from '@/lib/validators'
import { PFFields } from './forms/PFFields'
import { PJFields } from './forms/PJFields'
import { cn } from '@/lib/utils'

const baseSchema = {
  email: z.string().email('Email inválido'),
  telefone: z.string().min(14, 'Telefone incompleto'),
  comprovanteEndereco: z.any().refine((val) => val != null, 'Obrigatório'),
  aceitarTermos: z.boolean().refine((val) => val === true, 'Você deve aceitar os termos'),
}

const pfSchema = z.object({
  ...baseSchema,
  type: z.literal('PF'),
  nome: z.string().min(3, 'Nome muito curto'),
  cpf: z.string().refine(isValidCPF, 'CPF inválido'),
  renda: z.string().min(1, 'Selecione uma opção'),
  comprovanteRenda: z.any().refine((val) => val != null, 'Obrigatório'),
  selfie: z.any().refine((val) => val != null, 'Obrigatório'),
})

const pjSchema = z.object({
  ...baseSchema,
  type: z.literal('PJ'),
  razaoSocial: z.string().min(3, 'Razão Social muito curta'),
  cnpj: z.string().refine(isValidCNPJ, 'CNPJ inválido'),
  ramo: z.string().min(1, 'Selecione uma opção'),
  faturamento: z.string().min(1, 'Selecione uma opção'),
  contratoSocial: z.any().refine((val) => val != null, 'Obrigatório'),
  selfieResponsavel: z.any().refine((val) => val != null, 'Obrigatório'),
})

const formSchema = z.discriminatedUnion('type', [pfSchema, pjSchema])

type FormValues = z.infer<typeof formSchema>

export function RegistrationForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'PF',
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      renda: '',
      aceitarTermos: false,
    } as any,
    mode: 'onChange',
  })

  const formType = form.watch('type')

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      const { submitPreCadastro } = await import('@/services/pre-cadastro')
      const result = await submitPreCadastro(data)
      if (result.error) throw result.error
      setIsSuccess(true)
    } catch (error) {
      toast({
        title: 'Erro ao enviar formulário',
        description: 'Verifique sua conexão ou tente novamente mais tarde.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTypeChange = (value: 'PF' | 'PJ') => {
    if (value && value !== formType) {
      form.reset({ type: value } as any)
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
    form.reset({ type: 'PF' } as any)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isSuccess) {
    return (
      <Card
        className="w-full max-w-2xl mx-auto border-none shadow-xl bg-white animate-slide-up opacity-0"
        style={{ animationFillMode: 'forwards' }}
      >
        <CardContent className="flex flex-col items-center text-center p-[40px] md:p-[80px] space-y-6">
          <div className="h-24 w-24 bg-[#48BB78]/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-[#48BB78]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-[32px] font-bold text-[#1A3A52]">
              Pré-cadastro recebido com sucesso!
            </h2>
            <p className="text-[16px] text-[#333333] max-w-md mx-auto">
              Obrigado por se cadastrar. Nossa equipe analisará seus dados e entrará em contato em
              até 24 horas via email ou WhatsApp.
            </p>
          </div>
          <Button
            onClick={resetForm}
            className="bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-white hover:shadow-lg mt-4 h-[48px] px-[32px] rounded-[8px] transition-all hover:scale-105"
          >
            Voltar para home
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      id="cadastro"
      className="w-full max-w-4xl mx-auto shadow-xl border-slate-100 bg-white scroll-mt-24 px-[30px] py-[40px] md:px-[60px] md:py-[80px]"
    >
      <div className="text-center pb-8">
        <h2 className="text-[32px] font-bold text-[#1A3A52]">
          Comece sua jornada com Sea Connection
        </h2>
        <p className="text-[16px] text-[#333333] mt-2">
          Preencha o formulário abaixo. Nossa equipe fará a análise e entrará em contato em até 24
          horas.
        </p>

        <div className="pt-8 flex justify-center">
          <div className="inline-flex bg-[#F5F5F5] p-[4px] rounded-[8px] h-[44px]">
            <button
              type="button"
              onClick={() => handleTypeChange('PF')}
              className={cn(
                'px-8 text-[14px] font-bold rounded-[8px] transition-all duration-200',
                formType === 'PF'
                  ? 'bg-[#00B4D8] text-white shadow-sm'
                  : 'bg-transparent text-[#999999] hover:text-[#333333]',
              )}
            >
              Pessoa Física
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('PJ')}
              className={cn(
                'px-8 text-[14px] font-bold rounded-[8px] transition-all duration-200',
                formType === 'PJ'
                  ? 'bg-[#00B4D8] text-white shadow-sm'
                  : 'bg-transparent text-[#999999] hover:text-[#333333]',
              )}
            >
              Pessoa Jurídica
            </button>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[24px]">
            {formType === 'PF' ? <PFFields /> : <PJFields />}

            <div className="pt-8 border-t border-[#E0E0E0] flex justify-end">
              <Button
                type="submit"
                className="w-full md:w-auto bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-white h-[48px] px-[32px] rounded-[8px] transition-all hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none font-bold"
                disabled={!form.formState.isValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Pré-Cadastro'
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Card>
  )
}
