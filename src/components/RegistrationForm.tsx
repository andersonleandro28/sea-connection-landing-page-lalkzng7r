import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useToast } from '@/hooks/use-toast'
import { isValidCPF, isValidCNPJ } from '@/lib/validators'
import { PFFields } from './forms/PFFields'
import { PJFields } from './forms/PJFields'

const baseSchema = {
  email: z.string().email('Email inválido'),
  telefone: z.string().min(14, 'Telefone incompleto'),
  comprovanteEndereco: z.any().refine((val) => val != null, 'Obrigatório'),
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
    } as any,
    mode: 'onChange',
  })

  const formType = form.watch('type')

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSuccess(true)
    toast({
      title: 'Sucesso!',
      description: 'Seu pré-cadastro foi enviado com sucesso.',
    })
  }

  const handleTypeChange = (value: string) => {
    if (value && value !== formType) {
      form.reset({ type: value as 'PF' | 'PJ' } as any)
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
    form.reset({ type: 'PF' } as any)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-none shadow-xl bg-white animate-fade-in">
        <CardContent className="flex flex-col items-center text-center p-12 space-y-6">
          <div className="h-24 w-24 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-sea-navy">Pré-cadastro recebido com sucesso!</h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Obrigado por se cadastrar. Nossa equipe analisará seus dados e entrará em contato em
              até 24 horas via email ou WhatsApp.
            </p>
          </div>
          <Button onClick={resetForm} className="bg-sea-cyan hover:bg-cyan-500 mt-4 h-12 px-8">
            Voltar para home
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      id="cadastro"
      className="w-full max-w-4xl mx-auto shadow-xl border-slate-100 bg-white scroll-mt-24"
    >
      <CardHeader className="text-center pb-8 border-b border-slate-100">
        <CardTitle className="text-3xl font-bold text-sea-navy">
          Comece sua jornada com Sea Connection
        </CardTitle>
        <CardDescription className="text-base text-slate-500 mt-2">
          Preencha o formulário abaixo. Nossa equipe fará a análise e entrará em contato em até 24
          horas.
        </CardDescription>

        <div className="pt-6">
          <ToggleGroup
            type="single"
            value={formType}
            onValueChange={handleTypeChange}
            className="inline-flex bg-slate-100 p-1 rounded-lg"
          >
            <ToggleGroupItem
              value="PF"
              className="px-8 data-[state=on]:bg-white data-[state=on]:shadow-sm data-[state=on]:text-sea-cyan rounded-md"
            >
              Pessoa Física
            </ToggleGroupItem>
            <ToggleGroupItem
              value="PJ"
              className="px-8 data-[state=on]:bg-white data-[state=on]:shadow-sm data-[state=on]:text-sea-cyan rounded-md"
            >
              Pessoa Jurídica
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>

      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {formType === 'PF' ? <PFFields /> : <PJFields />}

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto bg-sea-navy hover:bg-sea-navy/90 h-14 px-10 text-lg transition-all"
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
        </Form>
      </CardContent>
    </Card>
  )
}
