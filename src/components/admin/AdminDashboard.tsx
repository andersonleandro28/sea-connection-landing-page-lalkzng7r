import { useState, useEffect } from 'react'
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
import { LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export function AdminDashboard() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pendente')
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const [filterTipo, setFilterTipo] = useState('todos')
  const [filterData, setFilterData] = useState('todos')

  const { signOut } = useAuth()

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

  const filtered = data.filter((item) => {
    if (item.status !== activeTab) return false
    if (filterTipo !== 'todos' && item.tipo !== filterTipo) return false

    if (filterData !== 'todos') {
      const date = new Date(item.created_at)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - date.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (filterData === '7d' && diffDays > 7) return false
      if (filterData === '30d' && diffDays > 30) return false
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
  })

  const stats = {
    total: data.length,
    pendentes: data.filter((d) => d.status === 'pendente').length,
    aprovados: data.filter((d) => d.status === 'aprovado').length,
    rejeitados: data.filter((d) => d.status === 'rejeitado').length,
  }
  const taxaAprovacao =
    stats.total > 0
      ? Math.round((stats.aprovados / (stats.aprovados + stats.rejeitados || 1)) * 100)
      : 0

  let tempoTotal = 0
  let analisadosCount = 0
  data.forEach((item) => {
    if (item.status !== 'pendente' && item.updated_at && item.created_at) {
      const diff = new Date(item.updated_at).getTime() - new Date(item.created_at).getTime()
      tempoTotal += diff
      analisadosCount++
    }
  })
  const tempoMedioDias =
    analisadosCount > 0 ? (tempoTotal / analisadosCount / (1000 * 60 * 60 * 24)).toFixed(1) : '0'

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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        <StatCard title="Total" value={stats.total} />
        <StatCard title="Pendentes" value={stats.pendentes} />
        <StatCard title="Aprovados" value={stats.aprovados} />
        <StatCard title="Rejeitados" value={stats.rejeitados} />
        <StatCard title="Aprovação" value={`${taxaAprovacao}%`} />
        <StatCard title="Tempo Médio" value={`${tempoMedioDias} d`} />
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
              <Select value={filterTipo} onValueChange={setFilterTipo}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos (PF/PJ)</SelectItem>
                  <SelectItem value="PF">Pessoa Física</SelectItem>
                  <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterData} onValueChange={setFilterData}>
                <SelectTrigger className="w-full md:w-[160px]">
                  <SelectValue placeholder="Data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todo o período</SelectItem>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Buscar por nome, email ou documento..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-[280px]"
              />
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <PreCadastroTable data={filtered} loading={loading} onRowClick={setSelectedItem} />
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
