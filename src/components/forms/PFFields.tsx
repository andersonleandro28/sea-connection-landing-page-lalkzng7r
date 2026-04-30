import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FileUpload } from '@/components/ui/file-upload'
import { Checkbox } from '@/components/ui/checkbox'
import { formatCPF, formatPhone, formatDate, formatCEP } from '@/lib/formatters'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const inputClass = (isError: boolean, isValid: boolean) =>
  cn(
    'h-[44px] px-[16px] py-[12px] rounded-[8px] border border-[#E0E0E0] placeholder:text-[14px] placeholder:text-[#666666] focus-visible:border-[#00B4D8] focus-visible:ring-2 focus-visible:ring-[#00B4D8]/20 focus-visible:shadow-subtle transition-all duration-200 text-[16px] w-full bg-white',
    isError &&
      'border-[#E53E3E] bg-[#E53E3E]/5 focus-visible:border-[#E53E3E] focus-visible:ring-[#E53E3E]/20 pr-10',
    isValid && 'border-[#48BB78] pr-10',
  )

const selectClass = (isError: boolean, isValid: boolean) =>
  cn(
    'h-[44px] px-[16px] py-[12px] rounded-[8px] border border-[#E0E0E0] focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 focus:shadow-subtle transition-all duration-200 text-[16px] w-full bg-white',
    isError && 'border-[#E53E3E] bg-[#E53E3E]/5 focus:border-[#E53E3E] focus:ring-[#E53E3E]/20',
    isValid && 'border-[#48BB78]',
  )

const textareaClass = (isError: boolean, isValid: boolean) =>
  cn(
    'min-h-[100px] px-[16px] py-[12px] rounded-[8px] border border-[#E0E0E0] placeholder:text-[14px] placeholder:text-[#666666] focus-visible:border-[#00B4D8] focus-visible:ring-2 focus-visible:ring-[#00B4D8]/20 focus-visible:shadow-subtle transition-all duration-200 text-[16px] w-full bg-white resize-none',
    isError &&
      'border-[#E53E3E] bg-[#E53E3E]/5 focus-visible:border-[#E53E3E] focus-visible:ring-[#E53E3E]/20 pr-10',
    isValid && 'border-[#48BB78] pr-10',
  )

function FieldWrapper({ field, fieldState, children }: any) {
  const isError = fieldState.invalid && fieldState.isTouched
  const isValid = !fieldState.invalid && fieldState.isDirty && field.value
  return (
    <div className="relative">
      {children(isError, isValid)}
      {isError && (
        <AlertCircle className="absolute right-3 top-2.5 h-5 w-5 text-[#E53E3E] pointer-events-none" />
      )}
      {isValid && (
        <CheckCircle2 className="absolute right-3 top-2.5 h-5 w-5 text-[#48BB78] pointer-events-none" />
      )}
    </div>
  )
}

function SectionTitle({ title, step }: { title: string; step: number }) {
  return (
    <div className="flex items-center gap-3 mb-[24px]">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#00B4D8] text-white font-bold text-[12px] shadow-sm shrink-0">
        {step}
      </div>
      <h3 className="font-bold text-[16px] text-[#1A3A52] tracking-wide">{title}</h3>
    </div>
  )
}

export function PFFields() {
  const form = useFormContext()
  const { control, setValue } = form

  const fetchCEP = async (cep: string) => {
    const cleanCEP = cep.replace(/\D/g, '')
    if (cleanCEP.length !== 8) return
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`)
      const data = await res.json()
      if (!data.erro) {
        setValue('logradouro', data.logradouro, { shouldValidate: true })
        setValue('bairro', data.bairro, { shouldValidate: true })
        setValue('cidade', data.localidade, { shouldValidate: true })
        setValue('estado', data.uf, { shouldValidate: true })
      }
    } catch {
      /* intentionally ignored */
    }
  }

  return (
    <div className="space-y-[32px] animate-fade-in transition-all duration-200">
      {/* SEÇÃO 1: DADOS PESSOAIS */}
      <div className="bg-white border border-[#E0E0E0] rounded-[8px] p-[24px] space-y-[16px]">
        <SectionTitle title="Dados Pessoais" step={1} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          <FormField
            control={control}
            name="nome"
            render={({ field, fieldState }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                  Nome Completo *
                </FormLabel>
                <FormControl>
                  <FieldWrapper field={field} fieldState={fieldState}>
                    {(isError: boolean, isValid: boolean) => (
                      <Input
                        placeholder="João da Silva"
                        {...field}
                        className={inputClass(isError, isValid)}
                      />
                    )}
                  </FieldWrapper>
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="cpf"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">CPF *</FormLabel>
                <FormControl>
                  <FieldWrapper field={field} fieldState={fieldState}>
                    {(isError: boolean, isValid: boolean) => (
                      <Input
                        placeholder="000.000.000-00"
                        {...field}
                        onChange={(e) => field.onChange(formatCPF(e.target.value))}
                        className={inputClass(isError, isValid)}
                      />
                    )}
                  </FieldWrapper>
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dataNascimento"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                  Data de Nascimento *
                </FormLabel>
                <FormControl>
                  <FieldWrapper field={field} fieldState={fieldState}>
                    {(isError: boolean, isValid: boolean) => (
                      <Input
                        placeholder="DD/MM/AAAA"
                        {...field}
                        onChange={(e) => field.onChange(formatDate(e.target.value))}
                        className={inputClass(isError, isValid)}
                      />
                    )}
                  </FieldWrapper>
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">Email *</FormLabel>
                <FormControl>
                  <FieldWrapper field={field} fieldState={fieldState}>
                    {(isError: boolean, isValid: boolean) => (
                      <Input
                        type="email"
                        placeholder="joao@exemplo.com"
                        {...field}
                        className={inputClass(isError, isValid)}
                      />
                    )}
                  </FieldWrapper>
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="telefone"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                  Telefone / WhatsApp *
                </FormLabel>
                <FormControl>
                  <FieldWrapper field={field} fieldState={fieldState}>
                    {(isError: boolean, isValid: boolean) => (
                      <Input
                        placeholder="(00) 00000-0000"
                        {...field}
                        onChange={(e) => field.onChange(formatPhone(e.target.value))}
                        className={inputClass(isError, isValid)}
                      />
                    )}
                  </FieldWrapper>
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* SEÇÃO 2: INFORMAÇÕES FINANCEIRAS */}
      <div className="bg-white border border-[#E0E0E0] rounded-[8px] p-[24px] space-y-[16px]">
        <SectionTitle title="Informações Financeiras" step={2} />
        <div className="grid grid-cols-1 gap-[16px]">
          <FormField
            control={control}
            name="renda"
            render={({ field, fieldState }) => {
              const isError = fieldState.invalid && fieldState.isTouched
              const isValid = !fieldState.invalid && fieldState.isDirty && field.value
              return (
                <FormItem className="md:w-1/2">
                  <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                    Renda Mensal Estimada *
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={selectClass(isError, isValid)}>
                        <SelectValue
                          placeholder={
                            <span className="text-[#666666] text-[14px]">
                              Selecione uma faixa de renda
                            </span>
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ate_2k">Até R$ 2.000</SelectItem>
                      <SelectItem value="2k_5k">R$ 2.000 - 5.000</SelectItem>
                      <SelectItem value="5k_10k">R$ 5.000 - 10.000</SelectItem>
                      <SelectItem value="acima_10k">Acima de R$ 10.000</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[12px] text-[#E53E3E]" />
                </FormItem>
              )
            }}
          />

          <FormField
            control={control}
            name="descricao"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                  Descrição da Atividade Financeira *
                </FormLabel>
                <FormControl>
                  <FieldWrapper field={field} fieldState={fieldState}>
                    {(isError: boolean, isValid: boolean) => (
                      <Textarea
                        placeholder="Descreva brevemente por que está abrindo uma conta para receber pagamentos. Ex: Vendo produtos no e-commerce, Prestação de serviços de consultoria, Freelancer de design gráfico, etc."
                        {...field}
                        maxLength={500}
                        className={textareaClass(isError, isValid)}
                      />
                    )}
                  </FieldWrapper>
                </FormControl>
                <div className="flex justify-between">
                  <FormMessage className="text-[12px] text-[#E53E3E]" />
                  <span className="text-[12px] text-[#999999] ml-auto">
                    {field.value?.length || 0}/500
                  </span>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* SEÇÃO 3: ENDEREÇO */}
      <div className="bg-white border border-[#E0E0E0] rounded-[8px] p-[24px] space-y-[16px]">
        <SectionTitle title="Endereço" step={3} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          <FormField
            control={control}
            name="cep"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">CEP *</FormLabel>
                <FormControl>
                  <FieldWrapper field={field} fieldState={fieldState}>
                    {(isError: boolean, isValid: boolean) => (
                      <Input
                        placeholder="00000-000"
                        {...field}
                        onChange={(e) => {
                          const val = formatCEP(e.target.value)
                          field.onChange(val)
                          if (val.length === 9) fetchCEP(val)
                        }}
                        className={inputClass(isError, isValid)}
                      />
                    )}
                  </FieldWrapper>
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="estado"
            render={({ field, fieldState }) => {
              const isError = fieldState.invalid && fieldState.isTouched
              const isValid = !fieldState.invalid && fieldState.isDirty && field.value
              return (
                <FormItem>
                  <FormLabel className="text-[14px] font-bold text-[#1A3A52]">Estado *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl>
                      <SelectTrigger className={selectClass(isError, isValid)}>
                        <SelectValue
                          placeholder={<span className="text-[#666666] text-[14px]">UF</span>}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AC">Acre</SelectItem>
                      <SelectItem value="AL">Alagoas</SelectItem>
                      <SelectItem value="AP">Amapá</SelectItem>
                      <SelectItem value="AM">Amazonas</SelectItem>
                      <SelectItem value="BA">Bahia</SelectItem>
                      <SelectItem value="CE">Ceará</SelectItem>
                      <SelectItem value="DF">Distrito Federal</SelectItem>
                      <SelectItem value="ES">Espírito Santo</SelectItem>
                      <SelectItem value="GO">Goiás</SelectItem>
                      <SelectItem value="MA">Maranhão</SelectItem>
                      <SelectItem value="MT">Mato Grosso</SelectItem>
                      <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="PA">Pará</SelectItem>
                      <SelectItem value="PB">Paraíba</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="PE">Pernambuco</SelectItem>
                      <SelectItem value="PI">Piauí</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="RO">Rondônia</SelectItem>
                      <SelectItem value="RR">Roraima</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="SE">Sergipe</SelectItem>
                      <SelectItem value="TO">Tocantins</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[12px] text-[#E53E3E]" />
                </FormItem>
              )
            }}
          />

          <FormField
            control={control}
            name="cidade"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">Cidade *</FormLabel>
                <FormControl>
                  <FieldWrapper field={field} fieldState={fieldState}>
                    {(isError: boolean, isValid: boolean) => (
                      <Input {...field} className={inputClass(isError, isValid)} />
                    )}
                  </FieldWrapper>
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="bairro"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">Bairro *</FormLabel>
                <FormControl>
                  <FieldWrapper field={field} fieldState={fieldState}>
                    {(isError: boolean, isValid: boolean) => (
                      <Input {...field} className={inputClass(isError, isValid)} />
                    )}
                  </FieldWrapper>
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="logradouro"
            render={({ field, fieldState }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">Logradouro *</FormLabel>
                <FormControl>
                  <FieldWrapper field={field} fieldState={fieldState}>
                    {(isError: boolean, isValid: boolean) => (
                      <Input {...field} className={inputClass(isError, isValid)} />
                    )}
                  </FieldWrapper>
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="numero"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">Número *</FormLabel>
                <FormControl>
                  <FieldWrapper field={field} fieldState={fieldState}>
                    {(isError: boolean, isValid: boolean) => (
                      <Input {...field} className={inputClass(isError, isValid)} />
                    )}
                  </FieldWrapper>
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="complemento"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">Complemento</FormLabel>
                <FormControl>
                  <FieldWrapper field={field} fieldState={fieldState}>
                    {(isError: boolean, isValid: boolean) => (
                      <Input {...field} className={inputClass(isError, isValid)} />
                    )}
                  </FieldWrapper>
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* SEÇÃO 4: DOCUMENTAÇÃO */}
      <div className="bg-white border border-[#E0E0E0] rounded-[8px] p-[24px] space-y-[16px]">
        <SectionTitle title="Documentação" step={4} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          <FormField
            control={control}
            name="documentoIdentidade"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                  Documento de Identidade (RG ou CNH) *
                </FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    isError={fieldState.invalid && fieldState.isTouched}
                  />
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="comprovanteRenda"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                  Comprovante de Renda *
                </FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    isError={fieldState.invalid && fieldState.isTouched}
                  />
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="comprovanteEndereco"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                  Comprovante de Endereço *
                </FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    isError={fieldState.invalid && fieldState.isTouched}
                  />
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="selfie"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                  Selfie com Documento *
                </FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    label="Tire uma foto sua segurando seu RG ou CNH"
                    accept=".jpg,.jpeg,.png"
                    isError={fieldState.invalid && fieldState.isTouched}
                  />
                </FormControl>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="bg-white border border-[#E0E0E0] rounded-[8px] p-[24px]">
        <FormField
          control={control}
          name="aceitarTermos"
          render={({ field, fieldState }) => (
            <FormItem
              className={cn(
                'flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-[8px] transition-all',
                fieldState.invalid && fieldState.isTouched
                  ? 'border-[#E53E3E] bg-[#E53E3E]/5'
                  : 'border-[#E0E0E0]',
              )}
            >
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-[14px] text-[#333333]">
                  Declaro que as informações acima são verdadeiras e aceito os termos de uso.
                </FormLabel>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
