import { useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StatCard } from './StatCard'
import { PreCadastroTable } from './PreCadastroTable'
import { PreCadastroModal } from './PreCadastroModal'
import { Button } from '@/components/ui/button'
import { LogOut, Download, Filter } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { format } from 'date-fns'

export function AdminDashboard() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pendente')
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [filterTipo, setFilterTipo] = useState('todos')
  const [filterData, setFilterData] = useState('todos')
  const [filterValidDoc, setFilterValidDoc] = useState(false)
  const [filterCompleteDocs, setFilterCompleteDocs] = useState(false)
  const [filterLowRisk, setFilterLowRisk] = useState(false)
  const [filterScore, setFilterScore] = useState('todos')
  const [currentPage, setCurrentPage] = useState(1)
  const { signOut } = useAuth()

  useEffect(() => {
    setCurrentPage(1)
  }, [
    activeTab,
    filterTipo,
    filterData,
    filterScore,
    search,
    filterValidDoc,
    filterCompleteDocs,
    filterLowRisk,
  ])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const { data: items } = await supabase
      .from('pre_cadastros')
      .select('*')
      .order('score', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
    if (items) setData(items)
    setLoading(false)
  }

  const filtered = useMemo(
    () =>
      data.filter((item) => {
        if (item.status !== activeTab) return false
        if (filterTipo !== 'todos' && item.tipo !== filterTipo) return false
        if (filterData !== 'todos') {
          const diffDays = Math.ceil(
            Math.abs(new Date().getTime() - new Date(item.created_at).getTime()) /
              (1000 * 60 * 60 * 24),
          )
          if (filterData === '7d' && diffDays > 7) return false
          if (filterData === '30d' && diffDays > 30) return false
        }

        if (filterValidDoc) {
          if (item.tipo === 'PF' && !item.cpf_valido) return false
          if (item.tipo === 'PJ' && !item.cnpj_valido) return false
        }
        if (filterCompleteDocs && !item.documentacao_completa) return false
        if (filterLowRisk && item.nivel_risco !== 'baixo') return false

        if (filterScore !== 'todos') {
          const score = item.score || 0
          if (filterScore === '>=70' && score < 70) return false
          if (filterScore === '40-70' && (score < 40 || score > 70)) return false
          if (filterScore === '<40' && score >= 40) return false
        }

        if (search) {
          const s = search.toLowerCase()
          return (
            item.nome_completo?.toLowerCase().includes(s) ||
            item.razao_social?.toLowerCase().includes(s) ||
            item.email.toLowerCase().includes(s) ||
            item.cpf?.includes(s) ||
            item.cnpj?.includes(s)
          )
        }
        return true
      }),
    [
      data,
      activeTab,
      filterTipo,
      filterData,
      search,
      filterValidDoc,
      filterCompleteDocs,
      filterLowRisk,
      filterScore,
    ],
  )

  const stats = useMemo(
    () => ({
      total: data.length,
      pendentes: data.filter((d) => d.status === 'pendente').length,
      aprovados: data.filter((d) => d.status === 'aprovado').length,
      rejeitados: data.filter((d) => d.status === 'rejeitado').length,
    }),
    [data],
  )

  const taxaAprovacao =
    stats.total > 0
      ? Math.round((stats.aprovados / (stats.aprovados + stats.rejeitados || 1)) * 100)
      : 0
  const tempoMedioDias = useMemo(() => {
    let tempoTotal = 0
    let count = 0
    data.forEach((item) => {
      if (item.status !== 'pendente' && item.updated_at && item.created_at) {
        tempoTotal += new Date(item.updated_at).getTime() - new Date(item.created_at).getTime()
        count++
      }
    })
    return count > 0 ? (tempoTotal / count / (1000 * 60 * 60 * 24)).toFixed(1) : '0'
  }, [data])

  const chartData = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      const day = format(d, 'dd/MM')
      return {
        name: day,
        total: data.filter((item) => format(new Date(item.created_at), 'dd/MM') === day).length,
      }
    })
  }, [data])

  const exportToCSV = () => {
    const headers = ['Nome/Razão Social', 'Tipo', 'Email', 'Telefone', 'Status', 'Data Cadastro']
    const rows = filtered.map((item) => [
      item.tipo === 'PF' ? item.nome_completo : item.razao_social,
      item.tipo,
      item.email,
      item.telefone,
      item.status,
      format(new Date(item.created_at), 'dd/MM/yyyy HH:mm'),
    ])
    const csvContent = [
      headers.join(','),
      ...rows.map((r) => r.map((c) => `"${(c || '').replace(/"/g, '""')}"`).join(',')),
    ].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'pre_cadastros.csv'
    link.click()
  }

  const ITEMS_PER_PAGE = 20
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A3A52]">
          Gerenciador de Pré-Cadastros
        </h1>
        <Button variant="outline" onClick={() => signOut()}>
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <StatCard title="Total" value={stats.total} />
          <StatCard title="Pendentes" value={stats.pendentes} />
          <StatCard title="Aprovados" value={stats.aprovados} />
          <StatCard title="Rejeitados" value={stats.rejeitados} />
          <StatCard title="Aprovação" value={`${taxaAprovacao}%`} />
          <StatCard title="Tempo Médio" value={`${tempoMedioDias} d`} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col justify-center">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Cadastros (Últimos 7 dias)
          </h3>
          <ChartContainer
            config={{ total: { label: 'Cadastros', color: '#00B4D8' } }}
            className="h-[120px] w-full"
          >
            <BarChart data={chartData}>
              <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="total" fill="var(--color-total)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col xl:flex-row gap-4 mb-4 items-start xl:items-center justify-between">
            <TabsList className="w-full xl:w-auto overflow-x-auto justify-start shrink-0">
              <TabsTrigger value="pendente" className="flex-1 xl:flex-none">
                Pendentes
              </TabsTrigger>
              <TabsTrigger value="aprovado" className="flex-1 xl:flex-none">
                Aprovados
              </TabsTrigger>
              <TabsTrigger value="rejeitado" className="flex-1 xl:flex-none">
                Rejeitados
              </TabsTrigger>
            </TabsList>
            <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto border-slate-200">
                    <Filter className="w-4 h-4 mr-2" />
                    Validações
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-[#1A3A52]">Filtrar por Validações</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="filter-doc"
                          checked={filterValidDoc}
                          onCheckedChange={(c) => setFilterValidDoc(!!c)}
                        />
                        <Label htmlFor="filter-doc" className="cursor-pointer">
                          Apenas CPF/CNPJ válido
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="filter-comp"
                          checked={filterCompleteDocs}
                          onCheckedChange={(c) => setFilterCompleteDocs(!!c)}
                        />
                        <Label htmlFor="filter-comp" className="cursor-pointer">
                          Apenas documentação completa
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="filter-risk"
                          checked={filterLowRisk}
                          onCheckedChange={(c) => setFilterLowRisk(!!c)}
                        />
                        <Label htmlFor="filter-risk" className="cursor-pointer">
                          Apenas risco baixo
                        </Label>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                variant="outline"
                onClick={exportToCSV}
                className="w-full md:w-auto border-slate-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
              <Select value={filterTipo} onValueChange={setFilterTipo}>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="PF">PF</SelectItem>
                  <SelectItem value="PJ">PJ</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterData} onValueChange={setFilterData}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todo período</SelectItem>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterScore} onValueChange={setFilterScore}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Scores</SelectItem>
                  <SelectItem value=">=70">&ge; 70</SelectItem>
                  <SelectItem value="40-70">40 - 70</SelectItem>
                  <SelectItem value="<40">&lt; 40</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-[200px]"
              />
            </div>
          </div>
          <TabsContent value={activeTab} className="mt-0">
            <PreCadastroTable data={paginatedData} loading={loading} onRowClick={setSelectedItem} />
            {!loading && totalPages > 1 && (
              <div className="mt-6 flex justify-end">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className={
                          currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => setCurrentPage(i + 1)}
                          isActive={currentPage === i + 1}
                          className="cursor-pointer"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className={
                          currentPage === totalPages
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      {selectedItem && (
        <PreCadastroModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onUpdate={fetchData}
        />
      )}
    </div>
  )
}
