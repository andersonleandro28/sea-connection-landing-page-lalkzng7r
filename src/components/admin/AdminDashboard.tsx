import { useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabase/client'
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
import { LogOut, Download, FilterX } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Label } from '@/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, CartesianGrid, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfiguracoesPanel } from './ConfiguracoesPanel'

export function AdminDashboard() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('todos')
  const [filterTipo, setFilterTipo] = useState('todos')
  const [filterScore, setFilterScore] = useState('todos')
  const [filterValidacao, setFilterValidacao] = useState('todos')
  const [filterPeriodo, setFilterPeriodo] = useState('todos')
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { signOut } = useAuth()

  useEffect(() => {
    setCurrentPage(1)
  }, [filterStatus, filterTipo, filterScore, filterValidacao, filterPeriodo, search])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const { data: items } = await supabase
      .from('pre_cadastros')
      .select('*')
      .order('created_at', { ascending: false })
    if (items) setData(items)
    setLoading(false)
  }

  const filtered = useMemo(
    () =>
      data
        .filter((item) => {
          if (filterStatus !== 'todos' && item.status !== filterStatus) return false
          if (filterTipo !== 'todos' && item.tipo !== filterTipo) return false

          if (filterScore !== 'todos') {
            const score = item.score || 0
            if (filterScore === '>=80' && score < 80) return false
            if (filterScore === '60-79' && (score < 60 || score > 79)) return false
            if (filterScore === '<60' && score >= 60) return false
          }

          if (filterValidacao !== 'todos') {
            if (filterValidacao === 'cpf_cnpj') {
              if (item.tipo === 'PF' && !item.cpf_valido) return false
              if (item.tipo === 'PJ' && !item.cnpj_valido) return false
            }
            if (filterValidacao === 'docs' && !item.documentacao_completa) return false
            if (filterValidacao === 'risco_baixo' && item.nivel_risco !== 'baixo') return false
          }

          if (filterPeriodo !== 'todos') {
            const diffDays = Math.ceil(
              Math.abs(new Date().getTime() - new Date(item.created_at).getTime()) /
                (1000 * 60 * 60 * 24),
            )
            if (filterPeriodo === '7d' && diffDays > 7) return false
            if (filterPeriodo === '30d' && diffDays > 30) return false
          }

          if (search) {
            const s = search.toLowerCase()
            return (
              item.nome_completo?.toLowerCase().includes(s) ||
              item.razao_social?.toLowerCase().includes(s) ||
              item.email?.toLowerCase().includes(s) ||
              item.cpf?.includes(s) ||
              item.cnpj?.includes(s)
            )
          }
          return true
        })
        .sort(
          (a, b) =>
            (b.score || 0) - (a.score || 0) ||
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        ),
    [data, filterStatus, filterTipo, filterScore, filterValidacao, filterPeriodo, search],
  )

  const stats = useMemo(() => {
    const pendentes = data.filter((d) => d.status === 'pendente').length
    const aprovados = data.filter((d) => d.status === 'aprovado').length
    const rejeitados = data.filter((d) => d.status === 'rejeitado').length
    const avgScore =
      data.length > 0
        ? Math.round(data.reduce((acc, curr) => acc + (curr.score || 0), 0) / data.length)
        : 0
    return { total: data.length, pendentes, aprovados, rejeitados, avgScore }
  }, [data])

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

  const chartDataDiario = useMemo(() => {
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

  const chartDataPizza = useMemo(() => {
    const pfAprovados = data.filter((d) => d.tipo === 'PF' && d.status === 'aprovado').length
    const pjAprovados = data.filter((d) => d.tipo === 'PJ' && d.status === 'aprovado').length
    return [
      { name: 'PF', value: pfAprovados, fill: '#00B4D8' },
      { name: 'PJ', value: pjAprovados, fill: '#48BB78' },
    ]
  }, [data])

  const chartDataScore = useMemo(() => {
    const s1 = data.filter((d) => (d.score || 0) <= 33).length
    const s2 = data.filter((d) => (d.score || 0) > 33 && (d.score || 0) <= 66).length
    const s3 = data.filter((d) => (d.score || 0) >= 67).length
    return [
      { name: '0-33', total: s1, fill: '#ef4444' },
      { name: '34-66', total: s2, fill: '#eab308' },
      { name: '67-100', total: s3, fill: '#22c55e' },
    ]
  }, [data])

  const clearFilters = () => {
    setFilterStatus('todos')
    setFilterTipo('todos')
    setFilterScore('todos')
    setFilterValidacao('todos')
    setFilterPeriodo('todos')
    setSearch('')
  }

  const exportToCSV = () => {
    const headers = [
      'Score',
      'Nome/Razão Social',
      'Tipo',
      'Email',
      'Telefone',
      'Status',
      'Data Cadastro',
    ]
    const rows = filtered.map((item) => [
      item.score || 0,
      item.tipo === 'PF' ? item.nome_completo : item.razao_social,
      item.tipo,
      item.email,
      item.telefone,
      item.status,
      format(new Date(item.created_at), 'dd/MM/yyyy HH:mm'),
    ])
    const csvContent = [
      headers.join(','),
      ...rows.map((r) => r.map((c) => `"${(c || '').toString().replace(/"/g, '""')}"`).join(',')),
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
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A3A52]">Painel Administrativo</h1>
          <p className="text-sm text-slate-500 mt-1">Visão geral e configurações da plataforma</p>
        </div>
        <Button variant="outline" onClick={() => signOut()}>
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>

      <Tabs defaultValue="cadastros" className="w-full">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="cadastros">Pré-Cadastros</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="cadastros" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
            <StatCard title="Total" value={stats.total} />
            <StatCard title="Pendentes" value={stats.pendentes} />
            <StatCard title="Aprovados" value={stats.aprovados} />
            <StatCard title="Rejeitados" value={stats.rejeitados} />
            <StatCard title="Aprovação" value={`${taxaAprovacao}%`} />
            <StatCard title="Tempo Médio" value={`${tempoMedioDias} d`} />
            <StatCard title="Score Médio" value={`${stats.avgScore}/100`} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <Card className="shadow-sm border-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  Cadastros Diários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{ total: { label: 'Cadastros', color: '#00B4D8' } }}
                  className="h-[180px] w-full"
                >
                  <LineChart
                    data={chartDataDiario}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.5} />
                    <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="var(--color-total)"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#fff', strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1000}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  Aprovações (PF vs PJ)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    PF: { label: 'Pessoa Física', color: '#00B4D8' },
                    PJ: { label: 'Pessoa Jurídica', color: '#48BB78' },
                  }}
                  className="h-[180px] w-full"
                >
                  <PieChart>
                    <Pie
                      data={chartDataPizza}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                      animationDuration={1000}
                    >
                      {chartDataPizza.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  Distribuição de Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{ total: { label: 'Cadastros', color: '#888' } }}
                  className="h-[180px] w-full"
                >
                  <BarChart
                    data={chartDataScore}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.5} />
                    <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="total" radius={[4, 4, 0, 0]} animationDuration={1000}>
                      {chartDataScore.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm border-slate-100">
            <CardContent className="p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    Status
                  </Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Status</SelectItem>
                      <SelectItem value="pendente">Pendentes</SelectItem>
                      <SelectItem value="aprovado">Aprovados</SelectItem>
                      <SelectItem value="rejeitado">Rejeitados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    Tipo
                  </Label>
                  <Select value={filterTipo} onValueChange={setFilterTipo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">PF e PJ</SelectItem>
                      <SelectItem value="PF">Pessoa Física (PF)</SelectItem>
                      <SelectItem value="PJ">Pessoa Jurídica (PJ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    Score
                  </Label>
                  <Select value={filterScore} onValueChange={setFilterScore}>
                    <SelectTrigger>
                      <SelectValue placeholder="Score" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Scores</SelectItem>
                      <SelectItem value=">=80">&ge; 80 (Aprovar)</SelectItem>
                      <SelectItem value="60-79">60 - 79 (Analisar)</SelectItem>
                      <SelectItem value="<60">&lt; 60 (Rejeitar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    Validação
                  </Label>
                  <Select value={filterValidacao} onValueChange={setFilterValidacao}>
                    <SelectTrigger>
                      <SelectValue placeholder="Validação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas as Regras</SelectItem>
                      <SelectItem value="cpf_cnpj">CPF/CNPJ Válido</SelectItem>
                      <SelectItem value="docs">Doc. Completa</SelectItem>
                      <SelectItem value="risco_baixo">Risco Baixo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    Data
                  </Label>
                  <Select value={filterPeriodo} onValueChange={setFilterPeriodo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Data" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todo Período</SelectItem>
                      <SelectItem value="7d">Últimos 7 dias</SelectItem>
                      <SelectItem value="30d">Últimos 30 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    Busca Rápida
                  </Label>
                  <Input
                    placeholder="Nome, CPF, Email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-5 gap-3">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                >
                  <FilterX className="w-4 h-4 mr-2" />
                  Limpar Filtros
                </Button>
                <Button
                  variant="outline"
                  onClick={exportToCSV}
                  className="border-slate-300 text-[#00B4D8] hover:bg-[#00B4D8]/5"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-100 overflow-hidden animate-fade-in-up">
            <CardContent className="p-0">
              <PreCadastroTable
                data={paginatedData}
                loading={loading}
                onRowClick={setSelectedItem}
              />
            </CardContent>
          </Card>

          {!loading && totalPages > 1 && (
            <div className="flex justify-end mt-4">
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

          {selectedItem && (
            <PreCadastroModal
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
              onUpdate={fetchData}
            />
          )}
        </TabsContent>

        <TabsContent value="configuracoes" className="mt-0">
          <ConfiguracoesPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
