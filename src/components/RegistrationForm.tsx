import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { isValidCPF, isValidCNPJ, isAdult } from '@/lib/validators'
import { PFFields } from './forms/PFFields'
import { PJFields } from './forms/PJFields'
import { cn } from '@/lib/utils'
import useRegistrationStore from '@/stores/use-registration-store'

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
  dataNascimento: z.string().refine(isAdult, 'Deve ter 18 anos ou mais'),
  renda: z.string().min(1, 'Selecione uma opção'),
  descricao: z.string().max(500, 'Máximo 500 caracteres').min(5, 'Obrigatório'),
  cep: z.string().min(9, 'CEP incompleto'),
  logradouro: z.string().min(2, 'Obrigatório'),
  numero: z.string().min(1, 'Obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(2, 'Obrigatório'),
  cidade: z.string().min(2, 'Obrigatório'),
  estado: z.string().min(2, 'Obrigatório'),
  documentoIdentidade: z.any().refine((val) => val != null, 'Obrigatório'),
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
  descricao: z.string().max(500, 'Máximo 500 caracteres').min(5, 'Obrigatório'),
  nomeRepresentante: z.string().min(3, 'Obrigatório'),
  cpfRepresentante: z.string().refine(isValidCPF, 'CPF inválido'),
  dataNascimento: z.string().refine(isAdult, 'Deve ter 18 anos ou mais'),
  celularRepresentante: z.string().min(14, 'Celular incompleto'),
  emailRepresentante: z.string().email('Email inválido'),
  cep: z.string().min(9, 'CEP incompleto'),
  logradouro: z.string().min(2, 'Obrigatório'),
  numero: z.string().min(1, 'Obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(2, 'Obrigatório'),
  cidade: z.string().min(2, 'Obrigatório'),
  estado: z.string().min(2, 'Obrigatório'),
  contratoSocial: z.any().refine((val) => val != null, 'Obrigatório'),
  cartaoCnpj: z.any().refine((val) => val != null, 'Obrigatório'),
  documentoIdentidadeRepresentante: z.any().refine((val) => val != null, 'Obrigatório'),
  comprovanteEnderecoRepresentante: z.any().refine((val) => val != null, 'Obrigatório'),
  selfieResponsavel: z.any().refine((val) => val != null, 'Obrigatório'),
})

const formSchema = z.discriminatedUnion('type', [pfSchema, pjSchema])

type FormValues = z.infer<typeof formSchema>

export function RegistrationForm() {
  const { isOpen, close } = useRegistrationStore()
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
      dataNascimento: '',
      renda: '',
      descricao: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
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

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      close()
      setTimeout(() => {
        setIsSuccess(false)
        form.reset({ type: 'PF' } as any)
      }, 300)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto p-[24px] md:p-[40px] bg-white rounded-[16px] shadow-2xl border-none">
        {isSuccess ? (
          <div className="flex flex-col items-center text-center p-[20px] md:p-[40px] space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="h-24 w-24 bg-[#48BB78]/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-[#48BB78]" />
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-[28px] md:text-[32px] font-bold text-[#1A3A52]">
                Pré-cadastro recebido com sucesso!
              </DialogTitle>
              <DialogDescription className="text-[16px] text-[#333333] max-w-md mx-auto">
                Obrigado por se cadastrar. Nossa equipe analisará seus dados e entrará em contato em
                até 24 horas via email ou WhatsApp.
              </DialogDescription>
            </div>
            <Button
              onClick={() => handleOpenChange(false)}
              className="mt-[24px] h-[48px] px-8 rounded-[8px]"
            >
              Voltar para home
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-center pb-[24px] space-y-4">
              <DialogTitle className="text-[24px] md:text-[32px] font-bold text-[#1A3A52]">
                Comece sua jornada com Sea Connection
              </DialogTitle>
              <DialogDescription className="text-[14px] md:text-[16px] text-[#333333] max-w-xl mx-auto">
                Preencha o formulário abaixo. Nossa equipe fará a análise e entrará em contato em
                até 24 horas.
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-[#F5F5F5] p-[4px] rounded-[8px] h-[44px] transition-all duration-200">
                <button
                  type="button"
                  onClick={() => handleTypeChange('PF')}
                  className={cn(
                    'px-6 md:px-8 h-full flex items-center justify-center text-[13px] md:text-[14px] font-bold rounded-[8px] transition-all duration-200',
                    formType === 'PF'
                      ? 'bg-[#00B4D8] text-white shadow-sm'
                      : 'bg-transparent text-[#666666] hover:text-[#333333]',
                  )}
                >
                  Pessoa Física
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange('PJ')}
                  className={cn(
                    'px-6 md:px-8 h-full flex items-center justify-center text-[13px] md:text-[14px] font-bold rounded-[8px] transition-all duration-200',
                    formType === 'PJ'
                      ? 'bg-[#00B4D8] text-white shadow-sm'
                      : 'bg-transparent text-[#666666] hover:text-[#333333]',
                  )}
                >
                  Pessoa Jurídica
                </button>
              </div>
            </div>

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[24px]">
                {formType === 'PF' ? <PFFields /> : <PJFields />}

                <div className="pt-[32px] border-t border-[#E0E0E0] flex justify-end">
                  <Button
                    type="submit"
                    className="w-full md:w-auto h-[48px] px-[32px] rounded-[8px] bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-white hover:shadow-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
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
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
