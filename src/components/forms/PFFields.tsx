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
import { formatCPF, formatPhone } from '@/lib/formatters'
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

export function PFFields() {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
      <div
        className="animate-fade-in opacity-0"
        style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
      >
        <FormField
          control={control}
          name="nome"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                Nome Completo *
              </FormLabel>
              <FormControl>
                <FieldWrapper field={field} fieldState={fieldState}>
                  {(isError: boolean, isValid: boolean) => (
                    <Input
                      placeholder="João da Silva"
                      {...field}
                      className={cn(
                        'h-[44px] px-[16px] py-[12px] rounded-[8px] border-[#E0E0E0] placeholder:text-[#999999] focus-visible:border-[#00B4D8] focus-visible:ring-[#00B4D8]/20 transition-all',
                        isError &&
                          'border-[#E53E3E] bg-[#E53E3E]/5 focus-visible:border-[#E53E3E] focus-visible:ring-[#E53E3E]/20 pr-10',
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
              <FormLabel className="text-[14px] font-bold text-[#1A3A52]">Email *</FormLabel>
              <FormControl>
                <FieldWrapper field={field} fieldState={fieldState}>
                  {(isError: boolean, isValid: boolean) => (
                    <Input
                      type="email"
                      placeholder="joao@exemplo.com"
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
        className="md:col-span-2 animate-fade-in opacity-0"
        style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
      >
        <FormField
          control={control}
          name="renda"
          render={({ field, fieldState }) => {
            const isError = fieldState.invalid && fieldState.isTouched
            const isValid = !fieldState.invalid && fieldState.isDirty && field.value
            return (
              <FormItem>
                <FormLabel className="text-[14px] font-bold text-[#1A3A52]">
                  Renda Mensal Estimada *
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
                          <span className="text-[#999999]">Selecione uma faixa de renda</span>
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
      </div>

      <div
        className="md:col-span-2 space-y-[16px] pt-6 mt-4 border-t border-[#E0E0E0] animate-fade-in opacity-0"
        style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
      >
        <h3 className="font-bold text-[18px] text-[#1A3A52]">Documentos Necessários</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
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

      <div
        className="md:col-span-2 pt-4 animate-fade-in opacity-0"
        style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
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
