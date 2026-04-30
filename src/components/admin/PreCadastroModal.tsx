import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { FileText, ExternalLink, AlertCircle } from 'lucide-react'

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
    const token = status === 'aprovado' ? crypto.randomUUID() : null

    const { error } = await supabase
      .from('pre_cadastros')
      .update({
        status,
        motivo_rejeicao: motivo,
        token_cadastro: token,
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
        body: { email: item.email, status, token, motivo },
      })
    } catch (e) {
      console.error('Email error', e)
    }

    toast.success(`Ação realizada com sucesso`)
    setLoading(false)
    onUpdate()
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl">Detalhes do Pré-Cadastro</DialogTitle>
            <DialogDescription>
              Visualize todas as informações enviadas pelo solicitante.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-[#1A3A52] uppercase tracking-wider border-b pb-2">
                Informações {item.tipo === 'PF' ? 'Pessoais' : 'Empresariais'}
              </h3>
              <Detail
                label="Tipo"
                value={item.tipo === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
              />
              <Detail
                label={item.tipo === 'PF' ? 'Nome Completo' : 'Razão Social'}
                value={item.tipo === 'PF' ? item.nome_completo : item.razao_social}
              />
              <Detail
                label={item.tipo === 'PF' ? 'CPF' : 'CNPJ'}
                value={item.tipo === 'PF' ? item.cpf : item.cnpj}
              />
              <Detail label="Email" value={item.email} />
              <Detail label="Telefone" value={item.telefone} />
              {item.tipo === 'PF' ? (
                <Detail label="Renda Mensal Estimada" value={item.renda_mensal} />
              ) : (
                <>
                  <Detail label="Faturamento Mensal" value={item.faturamento_mensal} />
                  <Detail label="Ramo de Atividade" value={item.ramo_atividade} />
                  <Detail
                    label="Descrição do Estabelecimento"
                    value={item.descricao_estabelecimento}
                  />
                  <Detail label="Telefone da Empresa" value={item.telefone_empresa} />
                  <Detail label="Email da Empresa" value={item.email_empresa} />

                  <div className="pt-4 mt-4 border-t border-dashed">
                    <h4 className="font-semibold text-xs text-[#1A3A52] uppercase tracking-wider mb-3">
                      Endereço
                    </h4>
                    <Detail label="CEP" value={item.cep} />
                    <Detail
                      label="Logradouro"
                      value={
                        item.logradouro
                          ? `${item.logradouro}, ${item.numero || ''} ${item.complemento ? `- ${item.complemento}` : ''}`
                          : '-'
                      }
                    />
                    <Detail label="Bairro" value={item.bairro} />
                    <Detail
                      label="Cidade/UF"
                      value={item.cidade ? `${item.cidade} / ${item.estado}` : '-'}
                    />
                  </div>

                  <div className="pt-4 mt-4 border-t border-dashed">
                    <h4 className="font-semibold text-xs text-[#1A3A52] uppercase tracking-wider mb-3">
                      Representante Legal
                    </h4>
                    <Detail label="Nome" value={item.nome_representante} />
                    <Detail label="CPF" value={item.cpf_representante} />
                    <Detail label="Data de Nascimento" value={item.data_nascimento_representante} />
                    <Detail label="Celular" value={item.celular_representante} />
                    <Detail label="Email" value={item.email_representante} />
                  </div>
                </>
              )}

              {item.status !== 'pendente' && (
                <div className="pt-4 mt-4 border-t border-dashed">
                  <Detail
                    label="Status Final"
                    value={<span className="capitalize font-bold">{item.status}</span>}
                  />
                  {item.status === 'rejeitado' && (
                    <Detail label="Motivo da Rejeição" value={item.motivo_rejeicao} />
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4 md:border-l md:pl-8">
              <h3 className="font-semibold text-sm text-[#1A3A52] uppercase tracking-wider border-b pb-2">
                Documentos Anexados
              </h3>
              <DocLink
                label={item.tipo === 'PF' ? 'Comprovante de Renda' : 'Contrato Social'}
                url={item.tipo === 'PF' ? item.comprovante_renda_url : item.contrato_social_url}
              />
              <DocLink label="Comprovante de Endereço" url={item.comprovante_endereco_url} />
              <div className="bg-slate-50 p-3 rounded-lg border">
                <DocLink
                  label={item.tipo === 'PF' ? 'Selfie com Documento' : 'Selfie do Responsável'}
                  url={item.selfie_documento_url}
                />
                <div className="flex items-start gap-2 mt-2 text-[#B06000]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-tight">
                    Verificar se a pessoa está segurando o documento de identificação de forma clara
                    e legível.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {item.status === 'pendente' && (
          <div className="bg-gray-50 px-6 py-4 border-t flex flex-col space-y-4 sticky bottom-0">
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

const Detail = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="mb-3">
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <p className="text-sm font-medium text-gray-900">{value || '-'}</p>
  </div>
)

const DocLink = ({ label, url }: { label: string; url: string | null }) => (
  <div className="mb-4 last:mb-0">
    <p className="text-xs text-gray-500 mb-1.5">{label}</p>
    {url ? (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00B4D8] hover:text-[#008ba8] bg-[#00B4D8]/5 hover:bg-[#00B4D8]/10 px-3 py-1.5 rounded-md transition-colors border border-[#00B4D8]/20"
      >
        <FileText className="w-4 h-4" />
        Visualizar Documento
        <ExternalLink className="w-3 h-3 ml-1" />
      </a>
    ) : (
      <span className="text-sm text-gray-400 italic">Documento não enviado</span>
    )}
  </div>
)
