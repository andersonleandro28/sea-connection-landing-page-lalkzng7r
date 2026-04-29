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
import { formatCPF, formatPhone } from '@/lib/formatters'

export function PFFields() {
  const { control, setValue } = useFormContext()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <FormField
        control={control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome Completo *</FormLabel>
            <FormControl>
              <Input placeholder="João da Silva" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="cpf"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CPF *</FormLabel>
            <FormControl>
              <Input
                placeholder="000.000.000-00"
                {...field}
                onChange={(e) => field.onChange(formatCPF(e.target.value))}
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
            <FormLabel>Email *</FormLabel>
            <FormControl>
              <Input type="email" placeholder="joao@exemplo.com" {...field} />
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
        name="renda"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Renda Mensal Estimada *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma faixa de renda" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="ate_2k">Até R$ 2.000</SelectItem>
                <SelectItem value="2k_5k">R$ 2.000 - 5.000</SelectItem>
                <SelectItem value="5k_10k">R$ 5.000 - 10.000</SelectItem>
                <SelectItem value="acima_10k">Acima de R$ 10.000</SelectItem>
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
            name="comprovanteRenda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comprovante de Renda *</FormLabel>
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
            name="selfie"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selfie com Documento *</FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    label="Tire uma foto sua segurando seu RG ou CNH"
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
