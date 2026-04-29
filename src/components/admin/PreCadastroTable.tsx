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
import { format } from 'date-fns'

export function PreCadastroTable({ data, loading, onRowClick }: any) {
  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 flex flex-col items-center justify-center border-2 border-dashed rounded-lg bg-gray-50/50">
        <div className="bg-gray-100 p-3 rounded-full mb-3">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <p>Nenhum pré-cadastro encontrado para estes filtros.</p>
      </div>
    )
  }

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome / Razão Social</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any) => (
              <TableRow
                key={item.id}
                className="cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => onRowClick(item)}
              >
                <TableCell className="font-medium">
                  {item.tipo === 'PF' ? item.nome_completo : item.razao_social}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono">
                    {item.tipo}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">{item.email}</TableCell>
                <TableCell className="text-gray-600">{item.telefone}</TableCell>
                <TableCell className="text-gray-600">
                  {format(new Date(item.created_at), 'dd/MM/yyyy HH:mm')}
                </TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {data.map((item: any) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99]"
            onClick={() => onRowClick(item)}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="font-bold text-[#1A3A52] leading-tight pr-2">
                {item.tipo === 'PF' ? item.nome_completo : item.razao_social}
              </span>
              <StatusBadge status={item.status} />
            </div>
            <div className="text-sm text-gray-600 space-y-1 mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] h-5">
                  {item.tipo}
                </Badge>
                <span className="truncate">{item.email}</span>
              </div>
              <div className="text-gray-500">{item.telefone}</div>
            </div>
            <div className="text-xs text-gray-400 font-medium">
              {format(new Date(item.created_at), 'dd/MM/yyyy • HH:mm')}
            </div>
          </div>
        ))}
      </div>
    </>
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
