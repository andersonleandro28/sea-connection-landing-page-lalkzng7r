import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { format } from 'date-fns'
import { Check, X, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PreCadastroTable({ data, loading, onRowClick }: any) {
  if (loading) {
    return (
      <div className="space-y-3 p-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500 flex flex-col items-center justify-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <p className="font-medium text-lg text-slate-700">Nenhum pré-cadastro encontrado</p>
        <p className="text-sm mt-1">Ajuste os filtros para ver mais resultados.</p>
      </div>
    )
  }

  return (
    <>
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-32">Score</TableHead>
              <TableHead>Nome / Razão Social</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Validações</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any) => (
              <TableRow
                key={item.id}
                className="cursor-pointer hover:bg-slate-50 transition-colors group"
                onClick={() => onRowClick(item)}
              >
                <TableCell>
                  <ScoreProgress score={item.score || 0} />
                </TableCell>
                <TableCell className="font-medium text-[#1A3A52]">
                  {item.tipo === 'PF' ? item.nome_completo : item.razao_social}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono bg-white">
                    {item.tipo}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600 truncate max-w-[150px]">
                  {item.email}
                </TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <ValidationIcon
                      isValid={item.tipo === 'PF' ? item.cpf_valido : item.cnpj_valido}
                      text={item.tipo === 'PF' ? 'CPF Válido' : 'CNPJ Válido'}
                    />
                    <ValidationIcon
                      isValid={item.documentacao_completa}
                      text="Documentação Completa"
                    />
                    <ValidationIcon
                      isValid={item.nivel_risco === 'baixo'}
                      isWarning={item.nivel_risco === 'médio'}
                      text={`Risco ${item.nivel_risco}`}
                    />
                    <ValidationIcon isValid={item.dados_consistentes} text="Dados Consistentes" />
                  </div>
                </TableCell>
                <TableCell className="text-slate-500 text-sm whitespace-nowrap">
                  {format(new Date(item.created_at), 'dd/MM/yy HH:mm')}
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-[#00B4D8] font-medium text-sm group-hover:underline">
                    Analisar
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="lg:hidden space-y-3 p-4">
        {data.map((item: any) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all active:scale-[0.99] relative overflow-hidden"
            onClick={() => onRowClick(item)}
          >
            <div
              className={`absolute top-0 left-0 w-1.5 h-full ${
                (item.score || 0) >= 67
                  ? 'bg-green-500'
                  : (item.score || 0) >= 34
                    ? 'bg-yellow-400'
                    : 'bg-red-500'
              }`}
            />
            <div className="pl-3">
              <div className="flex justify-between items-start mb-2 gap-2">
                <span className="font-bold text-[#1A3A52] leading-tight">
                  {item.tipo === 'PF' ? item.nome_completo : item.razao_social}
                </span>
                <div className="flex flex-col gap-1 items-end shrink-0">
                  <StatusBadge status={item.status} />
                </div>
              </div>
              <div className="text-sm text-slate-600 space-y-1 mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] h-5 bg-slate-50">
                    {item.tipo}
                  </Badge>
                  <span className="truncate">{item.email}</span>
                </div>
              </div>
              <div className="flex justify-between items-end mt-4">
                <div className="flex items-center gap-1.5">
                  <ValidationIcon
                    isValid={item.tipo === 'PF' ? item.cpf_valido : item.cnpj_valido}
                    text={item.tipo === 'PF' ? 'CPF Válido' : 'CNPJ Válido'}
                  />
                  <ValidationIcon
                    isValid={item.documentacao_completa}
                    text="Documentação Completa"
                  />
                  <ValidationIcon
                    isValid={item.nivel_risco === 'baixo'}
                    isWarning={item.nivel_risco === 'médio'}
                    text={`Risco ${item.nivel_risco}`}
                  />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {format(new Date(item.created_at), 'dd/MM/yyyy')}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-700">{item.score || 0}/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function ScoreProgress({ score }: { score: number }) {
  const isGood = score >= 67
  const isWarn = score >= 34 && score < 67
  const color = isGood ? 'bg-green-500' : isWarn ? 'bg-yellow-400' : 'bg-red-500'
  const text = isGood ? '✅ Aprovar' : isWarn ? '⚠️ Analisar' : '❌ Rejeitar'

  return (
    <div className="flex flex-col gap-1.5 w-24">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-slate-700">{score}/100</span>
        <span className="text-[10px] font-semibold text-slate-500">{text}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

function ValidationIcon({
  isValid,
  isWarning,
  text,
}: {
  isValid?: boolean
  isWarning?: boolean
  text: string
}) {
  let color = isValid
    ? 'bg-green-50 text-green-600 border-green-200'
    : 'bg-red-50 text-red-600 border-red-200'
  let Icon = isValid ? Check : X

  if (isWarning) {
    color = 'bg-yellow-50 text-yellow-600 border-yellow-200'
    Icon = AlertTriangle
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center shrink-0 border cursor-help',
            color,
          )}
        >
          <Icon className="w-3.5 h-3.5" strokeWidth={3} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs font-medium">{text}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'aprovado')
    return (
      <Badge className="bg-[#E6F4EA] text-[#137333] hover:bg-[#E6F4EA] border-transparent">
        Aprovado
      </Badge>
    )
  if (status === 'rejeitado') return <Badge variant="destructive">Rejeitado</Badge>
  return (
    <Badge
      variant="secondary"
      className="bg-[#FEF7E0] text-[#B06000] hover:bg-[#FEF7E0] border-transparent"
    >
      Pendente
    </Badge>
  )
}
