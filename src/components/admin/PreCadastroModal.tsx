import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { PreCadastroDetailsPF } from './PreCadastroDetailsPF'
import { PreCadastroDetailsPJ } from './PreCadastroDetailsPJ'

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
                Detalhes do Pré-Cadastro
              </DialogTitle>
              <div className="px-3 py-1 rounded-full text-sm font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                {item.status}
              </div>
            </div>
          </DialogHeader>

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
          <div className="bg-white px-6 md:px-8 py-5 border-t flex flex-col space-y-4 sticky bottom-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            {isRejecting ? (
              <div className="space-y-3 animate-fade-in-up">
                <Textarea
                  placeholder="Descreva o motivo da rejeição (esta mensagem será enviada ao cliente no e-mail)..."
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="bg-white"
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
                  className="bg-[#48BB78] hover:bg-[#38A169] text-white"
                  onClick={() => handleAction('aprovado')}
                  disabled={loading}
                >
                  Aprovar
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
