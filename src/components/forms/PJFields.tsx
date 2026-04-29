import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FileUpload } from '@/components/ui/file-upload'
import { Checkbox } from '@/components/ui/checkbox'
import { formatCNPJ, formatPhone } from '@/lib/formatters'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

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

export function PJFields() {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
      <div
        className="animate-fade-in opacity-0"
        style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
      >
        <FormField
          control={control}
          name="razaoSocial"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-[14px] font-bold text-[#1A3A52]">Razão Social *</FormLabel>
              <FormControl>
                <FieldWrapper field={field} fieldState={fieldState}>
                  {(isError: boolean, isValid: boolean) => (
                    <Input
                      placeholder="Sua Empresa LTDA"
                      {...field}
                      className={cn(
                        'h-[44px] px-[16px] py-[12px] rounded-[8px] border-[#E0E0E0] placeholder:text-[#999999] focus-visible:border-[#00B4D8] focus-visible:ring-[#00B4D8]/20 transition-all',
                        isError &&
                          'border-[#E53E3E] bg-[#E53E3E]/5 focus-visible:border-[#E53E3E] pr-10',
                        isValid && 'border-[#48BB78] pr-10',
                      )}
                    />
                  )}
                </FieldWrapper>
              </FormControl>
              <FormMessage className="text-[12px] text-[#E53E3E]" />
            </FormItem>
          )}
        />
      </div>

      <div
        className="animate-fade-in opacity-0"
        style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
      >
        <FormField
          control={control}
          name="cnpj"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-[14px] font-bold text-[#1A3A52]">CNPJ *</FormLabel>
              <FormControl>
                <FieldWrapper field={field} fieldState={fieldState}>
                  {(isError: boolean, isValid: boolean) => (
                    <Input
                      placeholder="00.000.000/0000-00"
                      {...field}
                      onChange={(e) => field.onChange(formatCNPJ(e.target.value))}
                      className={cn(
                        'h-[44px] px-[16px] py-[12px] rounded-[8px] border-[#E0E0E0] placeholder:text-[#999999] focus-visible:border-[#00B4D8] focus-visible:ring-[#00B4D8]/20 transition-all',
                        isError &&
                          'border-[#E53E3E] bg-[#E53E3E]/5 focus-visible:border-[#E53E3E] pr-10',
                        isValid && 'border-[#48BB78] pr-10',
                      )}
                    />
                  )}
                </FieldWrapper>
              </FormControl>
              <FormMessage className="text-[12px] text-[#E53E3E]" />
            </FormItem>
          )}
        />
      </div>

      <div
        className="animate-fade-in opacity-0"
        style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
      >
        <FormField
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                Email Corporativo *
              </FormLabel>
              <FormControl>
                <FieldWrapper field={field} fieldState={fieldState}>
                  {(isError: boolean, isValid: boolean) => (
                    <Input
                      type="email"
                      placeholder="contato@empresa.com"
                      {...field}
                      className={cn(
                        'h-[44px] px-[16px] py-[12px] rounded-[8px] border-[#E0E0E0] placeholder:text-[#999999] focus-visible:border-[#00B4D8] focus-visible:ring-[#00B4D8]/20 transition-all',
                        isError &&
                          'border-[#E53E3E] bg-[#E53E3E]/5 focus-visible:border-[#E53E3E] pr-10',
                        isValid && 'border-[#48BB78] pr-10',
                      )}
                    />
                  )}
                </FieldWrapper>
              </FormControl>
              <FormMessage className="text-[12px] text-[#E53E3E]" />
            </FormItem>
          )}
        />
      </div>

      <div
        className="animate-fade-in opacity-0"
        style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
      >
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
                      className={cn(
                        'h-[44px] px-[16px] py-[12px] rounded-[8px] border-[#E0E0E0] placeholder:text-[#999999] focus-visible:border-[#00B4D8] focus-visible:ring-[#00B4D8]/20 transition-all',
                        isError &&
                          'border-[#E53E3E] bg-[#E53E3E]/5 focus-visible:border-[#E53E3E] pr-10',
                        isValid && 'border-[#48BB78] pr-10',
                      )}
                    />
                  )}
                </FieldWrapper>
              </FormControl>
              <FormMessage className="text-[12px] text-[#E53E3E]" />
            </FormItem>
          )}
        />
      </div>

      <div
        className="animate-fade-in opacity-0"
        style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
      >
        <FormField
          control={control}
          name="ramo"
          render={({ field, fieldState }) => {
            const isError = fieldState.invalid && fieldState.isTouched
            const isValid = !fieldState.invalid && fieldState.isDirty && field.value
            return (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                  Ramo de Atividade *
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        'h-[44px] px-[16px] py-[12px] rounded-[8px] border-[#E0E0E0] text-[14px] transition-all',
                        isError && 'border-[#E53E3E] bg-[#E53E3E]/5 focus:border-[#E53E3E]',
                        isValid && 'border-[#48BB78]',
                      )}
                    >
                      <SelectValue
                        placeholder={<span className="text-[#999999]">Selecione um ramo</span>}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="comercio">Comércio</SelectItem>
                    <SelectItem value="servicos">Serviços</SelectItem>
                    <SelectItem value="industria">Indústria</SelectItem>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )
          }}
        />
      </div>

      <div
        className="animate-fade-in opacity-0"
        style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
      >
        <FormField
          control={control}
          name="faturamento"
          render={({ field, fieldState }) => {
            const isError = fieldState.invalid && fieldState.isTouched
            const isValid = !fieldState.invalid && fieldState.isDirty && field.value
            return (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                  Faturamento Mensal Estimado *
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        'h-[44px] px-[16px] py-[12px] rounded-[8px] border-[#E0E0E0] text-[14px] transition-all',
                        isError && 'border-[#E53E3E] bg-[#E53E3E]/5 focus:border-[#E53E3E]',
                        isValid && 'border-[#48BB78]',
                      )}
                    >
                      <SelectValue
                        placeholder={
                          <span className="text-[#999999]">Selecione o faturamento</span>
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ate_10k">Até R$ 10.000</SelectItem>
                    <SelectItem value="10k_50k">R$ 10.000 - 50.000</SelectItem>
                    <SelectItem value="50k_100k">R$ 50.000 - 100.000</SelectItem>
                    <SelectItem value="acima_100k">Acima de R$ 100.000</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[12px] text-[#E53E3E]" />
              </FormItem>
            )
          }}
        />
      </div>

      <div
        className="md:col-span-2 space-y-[16px] pt-6 mt-4 border-t border-[#E0E0E0] animate-fade-in opacity-0"
        style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
      >
        <h3 className="font-bold text-[18px] text-[#1A3A52]">Documentos Necessários</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
          <FormField
            control={control}
            name="contratoSocial"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                  Contrato Social *
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
            name="selfieResponsavel"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                  Selfie do Responsável *
                </FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    label="Tire uma foto do responsável segurando seu RG ou CNH"
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

      <div
        className="md:col-span-2 pt-4 animate-fade-in opacity-0"
        style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
      >
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
