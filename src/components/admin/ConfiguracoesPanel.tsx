import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'
import { FileUpload } from '@/components/ui/file-upload'
import { Loader2 } from 'lucide-react'

export function ConfiguracoesPanel() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const [formData, setFormData] = useState({
    email_contato: '',
    whatsapp_numero: '',
    endereco_empresa: '',
    instagram_url: '',
    linkedin_url: '',
    facebook_url: '',
    twitter_url: '',
  })

  const [faqDoc, setFaqDoc] = useState<File | string | null>(null)
  const [privacidadeDoc, setPrivacidadeDoc] = useState<File | string | null>(null)
  const [termosDoc, setTermosDoc] = useState<File | string | null>(null)

  const [initialData, setInitialData] = useState<any>(null)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    setLoading(true)
    const { data } = await supabase.from('configuracoes').select('*').limit(1).single()
    if (data) {
      setInitialData(data)
      setFormData({
        email_contato: data.email_contato || '',
        whatsapp_numero: data.whatsapp_numero || '',
        endereco_empresa: data.endereco_empresa || '',
        instagram_url: data.instagram_url || '',
        linkedin_url: data.linkedin_url || '',
        facebook_url: data.facebook_url || '',
        twitter_url: data.twitter_url || '',
      })
      setFaqDoc(data.faq_documento_url || null)
      setPrivacidadeDoc(data.privacidade_documento_url || null)
      setTermosDoc(data.termos_documento_url || null)
    }
    setLoading(false)
    setHasChanges(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleFileChange = (setter: any) => (file: any) => {
    setter(file)
    setHasChanges(true)
  }

  const validateForm = () => {
    if (!formData.email_contato) return 'Email de contato é obrigatório'
    if (!/^\S+@\S+\.\S+$/.test(formData.email_contato)) return 'Formato de email inválido'
    if (!formData.whatsapp_numero) return 'WhatsApp é obrigatório'
    const whatsappClean = formData.whatsapp_numero.replace(/\D/g, '')
    if (whatsappClean.length < 11) return 'WhatsApp deve ter no mínimo 11 dígitos'
    if (!formData.endereco_empresa) return 'Endereço é obrigatório'

    const urlPattern = /^https?:\/\//
    if (formData.instagram_url && !urlPattern.test(formData.instagram_url))
      return 'URL do Instagram deve começar com http:// ou https://'
    if (formData.linkedin_url && !urlPattern.test(formData.linkedin_url))
      return 'URL do LinkedIn deve começar com http:// ou https://'
    if (formData.facebook_url && !urlPattern.test(formData.facebook_url))
      return 'URL do Facebook deve começar com http:// ou https://'
    if (formData.twitter_url && !urlPattern.test(formData.twitter_url))
      return 'URL do Twitter deve começar com http:// ou https://'

    return null
  }

  const uploadFile = async (file: File | string | null, path: string) => {
    if (!file || typeof file === 'string') return typeof file === 'string' ? file : null

    const fileExt = file.name.split('.').pop()
    const fileName = `${path}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('documents').upload(fileName, file)

    if (uploadError) throw uploadError

    const {
      data: { publicUrl },
    } = supabase.storage.from('documents').getPublicUrl(fileName)

    return publicUrl
  }

  const handleSave = async () => {
    const errorMsg = validateForm()
    if (errorMsg) {
      toast.error(errorMsg)
      return
    }

    setSaving(true)
    try {
      const faqUrl = await uploadFile(faqDoc, 'faq')
      const privUrl = await uploadFile(privacidadeDoc, 'privacidade')
      const termosUrl = await uploadFile(termosDoc, 'termos')

      const updateData = {
        email_contato: formData.email_contato || null,
        whatsapp_numero: formData.whatsapp_numero.replace(/\D/g, '') || null,
        endereco_empresa: formData.endereco_empresa || null,
        instagram_url: formData.instagram_url || null,
        linkedin_url: formData.linkedin_url || null,
        facebook_url: formData.facebook_url || null,
        twitter_url: formData.twitter_url || null,
        faq_documento_url: faqUrl,
        privacidade_documento_url: privUrl,
        termos_documento_url: termosUrl,
      }

      const { error } = await supabase
        .from('configuracoes')
        .update(updateData)
        .eq('id', initialData?.id)

      if (error) throw error

      toast.success('Configurações salvas com sucesso')
      setHasChanges(false)
      fetchConfig()
    } catch (e: any) {
      console.error(e)
      toast.error('Erro ao salvar: ' + (e.message || 'Desconhecido'))
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (initialData) {
      setFormData({
        email_contato: initialData.email_contato || '',
        whatsapp_numero: initialData.whatsapp_numero || '',
        endereco_empresa: initialData.endereco_empresa || '',
        instagram_url: initialData.instagram_url || '',
        linkedin_url: initialData.linkedin_url || '',
        facebook_url: initialData.facebook_url || '',
        twitter_url: initialData.twitter_url || '',
      })
      setFaqDoc(initialData.faq_documento_url || null)
      setPrivacidadeDoc(initialData.privacidade_documento_url || null)
      setTermosDoc(initialData.termos_documento_url || null)
    }
    setHasChanges(false)
  }

  const applyMaskWhatsApp = (val: string) => {
    const raw = val.replace(/\D/g, '')
    let masked = raw
    if (raw.length > 2) {
      masked = `(${raw.substring(0, 2)}) ` + raw.substring(2)
    }
    if (raw.length > 7) {
      masked = `(${raw.substring(0, 2)}) ${raw.substring(2, 7)}-${raw.substring(7, 11)}`
    }
    return masked
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-slate-100 rounded-lg animate-pulse" />
        <div className="h-64 bg-slate-100 rounded-lg animate-pulse" />
        <div className="h-64 bg-slate-100 rounded-lg animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <CardTitle className="text-lg text-[#1A3A52]">Seção 1: Contato</CardTitle>
          <CardDescription>Informações exibidas no footer</CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Email de Contato
            </Label>
            <Input
              placeholder="contato@seaconnection.com.br"
              value={formData.email_contato}
              onChange={(e) => handleInputChange('email_contato', e.target.value)}
              className={!formData.email_contato ? 'border-red-300' : ''}
            />
            <p className="text-xs text-slate-500">
              Este email aparecerá no footer e será usado para mailto:
            </p>
          </div>

          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">WhatsApp</Label>
            <Input
              placeholder="(55) 1199999-9999"
              value={formData.whatsapp_numero}
              onChange={(e) =>
                handleInputChange('whatsapp_numero', applyMaskWhatsApp(e.target.value))
              }
              className={
                formData.whatsapp_numero.replace(/\D/g, '').length < 11 ? 'border-red-300' : ''
              }
              maxLength={15}
            />
            <p className="text-xs text-slate-500">Número com código país. Ex: 5511999999999</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Endereço da Empresa
            </Label>
            <Textarea
              placeholder="Rua X, 123, Apto 456, São Paulo, SP, 01234-567"
              value={formData.endereco_empresa}
              onChange={(e) => handleInputChange('endereco_empresa', e.target.value)}
              className={
                !formData.endereco_empresa ? 'border-red-300 min-h-[80px]' : 'min-h-[80px]'
              }
              maxLength={500}
            />
            <p className="text-xs text-slate-500">Endereço completo exibido no footer</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <CardTitle className="text-lg text-[#1A3A52]">Seção 2: Redes Sociais</CardTitle>
          <CardDescription>Links para os perfis oficiais</CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Instagram</Label>
            <Input
              placeholder="https://instagram.com/seaconnection"
              value={formData.instagram_url}
              onChange={(e) => handleInputChange('instagram_url', e.target.value)}
            />
            <p className="text-xs text-slate-500">Se vazio, ícone não aparece no footer</p>
          </div>

          <div className="space-y-2">
            <Label>LinkedIn</Label>
            <Input
              placeholder="https://linkedin.com/company/seaconnection"
              value={formData.linkedin_url}
              onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
            />
            <p className="text-xs text-slate-500">Se vazio, ícone não aparece no footer</p>
          </div>

          <div className="space-y-2">
            <Label>Facebook</Label>
            <Input
              placeholder="https://facebook.com/seaconnection"
              value={formData.facebook_url}
              onChange={(e) => handleInputChange('facebook_url', e.target.value)}
            />
            <p className="text-xs text-slate-500">Se vazio, ícone não aparece no footer</p>
          </div>

          <div className="space-y-2">
            <Label>Twitter</Label>
            <Input
              placeholder="https://twitter.com/seaconnection"
              value={formData.twitter_url}
              onChange={(e) => handleInputChange('twitter_url', e.target.value)}
            />
            <p className="text-xs text-slate-500">Se vazio, ícone não aparece no footer</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <CardTitle className="text-lg text-[#1A3A52]">Seção 3: Documentos</CardTitle>
          <CardDescription>Arquivos institucionais em formato PDF</CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>FAQ (PDF)</Label>
            <FileUpload
              accept=".pdf"
              maxSize={10}
              value={faqDoc}
              onChange={handleFileChange(setFaqDoc)}
            />
            <p className="text-xs text-slate-500">Documento exibido ao clicar em 'FAQ' no footer</p>
          </div>

          <div className="space-y-2">
            <Label>Política de Privacidade (PDF)</Label>
            <FileUpload
              accept=".pdf"
              maxSize={10}
              value={privacidadeDoc}
              onChange={handleFileChange(setPrivacidadeDoc)}
            />
            <p className="text-xs text-slate-500">
              Documento exibido ao clicar em 'Política de Privacidade' no footer
            </p>
          </div>

          <div className="space-y-2">
            <Label>Termos de Uso (PDF)</Label>
            <FileUpload
              accept=".pdf"
              maxSize={10}
              value={termosDoc}
              onChange={handleFileChange(setTermosDoc)}
            />
            <p className="text-xs text-slate-500">
              Documento exibido ao clicar em 'Termos de Uso' no footer
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end items-center gap-4 pt-4 border-t border-slate-200">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={!hasChanges || saving}
          className="border-[#1A3A52] text-[#1A3A52] hover:bg-[#1A3A52]/5"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className="bg-[#00B4D8] hover:bg-[#0090ad] text-white min-w-[180px]"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            'Salvar Configurações'
          )}
        </Button>
      </div>
    </div>
  )
}
