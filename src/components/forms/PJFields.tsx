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
import { formatCNPJ, formatPhone } from '@/lib/formatters'

export function PJFields() {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <FormField
        control={control}
        name="razaoSocial"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Razão Social *</FormLabel>
            <FormControl>
              <Input placeholder="Sua Empresa LTDA" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="cnpj"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CNPJ *</FormLabel>
            <FormControl>
              <Input
                placeholder="00.000.000/0000-00"
                {...field}
                onChange={(e) => field.onChange(formatCNPJ(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Corporativo *</FormLabel>
            <FormControl>
              <Input type="email" placeholder="contato@empresa.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="telefone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone / WhatsApp *</FormLabel>
            <FormControl>
              <Input
                placeholder="(00) 00000-0000"
                {...field}
                onChange={(e) => field.onChange(formatPhone(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="ramo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ramo de Atividade *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um ramo" />
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
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="faturamento"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Faturamento Mensal Estimado *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o faturamento" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="ate_10k">Até R$ 10.000</SelectItem>
                <SelectItem value="10k_50k">R$ 10.000 - 50.000</SelectItem>
                <SelectItem value="50k_100k">R$ 50.000 - 100.000</SelectItem>
                <SelectItem value="acima_100k">Acima de R$ 100.000</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="md:col-span-2 space-y-6 pt-4 border-t border-slate-100">
        <h3 className="font-semibold text-lg text-sea-navy">Documentos Necessários</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={control}
            name="contratoSocial"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contrato Social *</FormLabel>
                <FormControl>
                  <FileUpload value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="comprovanteEndereco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comprovante de Endereço *</FormLabel>
                <FormControl>
                  <FileUpload value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="selfieResponsavel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selfie do Responsável *</FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    label="Tire uma foto segurando seu RG ou CNH"
                    accept=".jpg,.jpeg,.png"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}
