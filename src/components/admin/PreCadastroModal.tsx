import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { PreCadastroDetailsPF } from './PreCadastroDetailsPF'
import { PreCadastroDetailsPJ } from './PreCadastroDetailsPJ'
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const getBreakdown = (item: any) => {
  let docs = 0
  if (item.documentacao_completa) docs = 30
  else if (item.documento_identidade_url || item.contrato_social_url) docs = 20

  let val = 0
  if (item.tipo === 'PF') val = item.cpf_valido ? 20 : 0
  else {
    if (item.cnpj_valido && item.cpf_valido) val = 20
    else if (item.cnpj_valido || item.cpf_valido) val = 10
  }

  let cons = item.dados_consistentes ? 15 : 0
  let desc = item.nivel_risco === 'baixo' ? 15 : item.nivel_risco === 'médio' ? 8 : 0
  let age = item.idade >= 18 ? 10 : 0

  let income = 5
  if (
    item.tipo === 'PF' &&
    item.renda_mensal &&
    !item.renda_mensal.toLowerCase().includes('até r$ 2.000')
  )
    income = 10
  if (
    item.tipo === 'PJ' &&
    item.faturamento_mensal &&
    !item.faturamento_mensal.toLowerCase().includes('até r$ 10.000')
  )
    income = 10

  return { docs, val, cons, desc, age, income }
}

function ScoreBreakdown({ item }: { item: any }) {
  const score = item.score || 0

  let recommendation = '❌ Recomendado para rejeição'
  let bgRec = 'bg-red-50 border-red-200 text-red-700'
  let barColor = 'bg-red-500'
  if (score >= 80) {
    recommendation = '✅ Recomendado para aprovação automática'
    bgRec = 'bg-green-50 border-green-200 text-green-700'
    barColor = 'bg-green-500'
  } else if (score >= 60) {
    recommendation = '⚠️ Análise recomendada'
    bgRec = 'bg-yellow-50 border-yellow-200 text-yellow-700'
    barColor = 'bg-yellow-400'
  }

  const { docs, val, cons, desc, age, income } = getBreakdown(item)

  return (
    <div className="mb-8 space-y-4">
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-inner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className="text-5xl font-extrabold text-slate-800 tracking-tighter">
              {score}
              <span className="text-2xl text-slate-400 font-medium">/100</span>
            </div>
          </div>
          <div className={`px-4 py-2.5 rounded-lg border font-bold text-sm shadow-sm ${bgRec}`}>
            {recommendation}
          </div>
        </div>
        <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden mb-2 shadow-inner">
          <div
            className={`h-full ${barColor} transition-all duration-1000 ease-out`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <BreakdownItem label="Documentação" score={docs} max={30} />
        <BreakdownItem label="Validação" score={val} max={20} />
        <BreakdownItem label="Consistência" score={cons} max={15} />
        <BreakdownItem label="Descrição" score={desc} max={15} />
        <BreakdownItem label="Idade" score={age} max={10} />
        <BreakdownItem label="Renda/Fat." score={income} max={10} />
      </div>
    </div>
  )
}

function BreakdownItem({ label, score, max }: { label: string; score: number; max: number }) {
  const isFull = score === max
  const isZero = score === 0
  return (
    <div className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-slate-300 transition-colors">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-bold text-slate-700">
          +{score}/{max}
        </span>
        {isFull ? (
          <span className="text-green-500 text-sm">✅</span>
        ) : isZero ? (
          <span className="text-red-500 text-sm">❌</span>
        ) : (
          <span className="text-yellow-500 text-sm">⚠️</span>
        )}
      </div>
    </div>
  )
}

function DetailedValidations({ item }: { item: any }) {
  return (
    <div className="mb-8">
      <h3 className="font-semibold text-sm text-[#1A3A52] uppercase tracking-wider border-b pb-2 mb-4">
        Seção 2 — Validações Detalhadas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <ValidationBadge
          label="CPF/CNPJ"
          text={item.cpf_valido || item.cnpj_valido ? 'Válido' : 'Inválido'}
          isValid={item.cpf_valido || item.cnpj_valido}
        />
        <ValidationBadge
          label="Documentação"
          text={item.documentacao_completa ? 'Completa' : 'Incompleta'}
          isValid={item.documentacao_completa}
        />
        <ValidationBadge
          label="Risco"
          text={
            item.nivel_risco
              ? item.nivel_risco.charAt(0).toUpperCase() + item.nivel_risco.slice(1)
              : 'Desconhecido'
          }
          isValid={item.nivel_risco === 'baixo'}
          isWarning={item.nivel_risco === 'médio'}
        />
        <ValidationBadge
          label="Dados"
          text={item.dados_consistentes ? 'Consistentes' : 'Inconsistentes'}
          isValid={item.dados_consistentes}
        />
        <ValidationBadge
          label="Idade"
          text={item.idade >= 18 ? `${item.idade} anos` : `${item.idade} anos (Menor)`}
          isValid={item.idade >= 18}
        />
      </div>
    </div>
  )
}

function ValidationBadge({ label, text, isValid, isWarning }: any) {
  const Icon = isValid ? CheckCircle2 : isWarning ? AlertTriangle : XCircle
  const colorClass = isValid
    ? 'bg-green-50 text-green-700 border-green-200'
    : isWarning
      ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
      : 'bg-red-50 text-red-700 border-red-200'

  return (
    <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
      <span className="text-sm font-semibold text-slate-600">{label}</span>
      <div
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-bold uppercase tracking-wide',
          colorClass,
        )}
      >
        <Icon className="w-3.5 h-3.5" />
        {text}
      </div>
    </div>
  )
}

export function PreCadastroModal({ item, onClose, onUpdate }: any) {
  const [isRejecting, setIsRejecting] = useState(false)
  const [motivo, setMotivo] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAction = async (status: 'aprovado' | 'rejeitado') => {
    if (status === 'rejeitado' && !motivo) {
      toast.error('Informe o motivo da rejeição')
      return
    }

    setLoading(true)
    let rawToken = null

    if (status === 'aprovado') {
      rawToken = crypto.randomUUID().replace(/-/g, '')
      const encoder = new TextEncoder()
      const data = encoder.encode(rawToken)
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashedToken = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

      const expDate = new Date()
      expDate.setDate(expDate.getDate() + 7)

      const { error: tokenError } = await supabase.from('approval_tokens').insert({
        pre_cadastro_id: item.id,
        token: hashedToken,
        data_expiracao: expDate.toISOString(),
      })

      if (tokenError) {
        toast.error('Erro ao gerar token de aprovação')
        setLoading(false)
        return
      }
    }

    const { error } = await supabase
      .from('pre_cadastros')
      .update({
        status,
        motivo_rejeicao: motivo,
        updated_at: new Date().toISOString(),
      })
      .eq('id', item.id)

    if (error) {
      toast.error('Erro ao atualizar status do cadastro')
      setLoading(false)
      return
    }

    try {
      await supabase.functions.invoke('send-status-email', {
        body: { email: item.email, status, token: rawToken, motivo },
      })
    } catch (e) {
      console.error('Email error', e)
    }

    toast.success(`Pré-cadastro ${status} e email enviado com sucesso`)
    setLoading(false)
    onUpdate()
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-slate-50">
        <div className="p-6 md:p-8 bg-white">
          <DialogHeader className="mb-6 pb-6 border-b">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-bold text-[#1A3A52]">
                Análise de Pré-Cadastro
              </DialogTitle>
              <div className="px-3 py-1.5 rounded-md text-xs font-bold bg-slate-100 text-slate-600 uppercase tracking-wider border">
                Status: {item.status}
              </div>
            </div>
          </DialogHeader>

          <ScoreBreakdown item={item} />
          <DetailedValidations item={item} />

          {item.tipo === 'PF' ? (
            <PreCadastroDetailsPF item={item} />
          ) : (
            <PreCadastroDetailsPJ item={item} />
          )}

          {item.status !== 'pendente' && item.status === 'rejeitado' && (
            <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-lg">
              <h4 className="font-bold text-red-800 text-sm mb-1">Motivo da Rejeição</h4>
              <p className="text-sm text-red-700">{item.motivo_rejeicao}</p>
            </div>
          )}
        </div>

        {item.status === 'pendente' && (
          <div className="bg-white px-6 md:px-8 py-5 border-t flex flex-col space-y-4 sticky bottom-0 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)] z-10">
            {isRejecting ? (
              <div className="space-y-3 animate-fade-in-up">
                <Textarea
                  placeholder="Descreva o motivo da rejeição (esta mensagem será enviada ao cliente no e-mail)..."
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="bg-white focus-visible:ring-red-500"
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsRejecting(false)}>
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleAction('rejeitado')}
                    disabled={loading}
                  >
                    Confirmar Rejeição
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end gap-3 w-full">
                <Button variant="outline" onClick={onClose} className="mr-auto">
                  Voltar
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  onClick={() => setIsRejecting(true)}
                >
                  Rejeitar
                </Button>
                <Button
                  className="bg-[#48BB78] hover:bg-[#38A169] text-white font-semibold"
                  onClick={() => handleAction('aprovado')}
                  disabled={loading}
                >
                  Aprovar Cadastro
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
