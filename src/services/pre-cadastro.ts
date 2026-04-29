import { supabase } from '@/lib/supabase/client'

export async function submitPreCadastro(data: any) {
  const upload = async (file: File | null | undefined, folder: string) => {
    if (!file) return null
    const ext = file.name.split('.').pop()
    const name = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`
    const { error } = await supabase.storage.from('documentos').upload(name, file)
    if (error) throw error
    const { data: urlData } = supabase.storage.from('documentos').getPublicUrl(name)
    return urlData.publicUrl
  }

  try {
    let comprovante_renda_url = null
    let comprovante_endereco_url = null
    let selfie_documento_url = null
    let contrato_social_url = null

    if (data.type === 'PF') {
      comprovante_renda_url = await upload(data.comprovanteRenda, 'renda')
      comprovante_endereco_url = await upload(data.comprovanteEndereco, 'endereco')
      selfie_documento_url = await upload(data.selfie, 'selfie')
    } else {
      contrato_social_url = await upload(data.contratoSocial, 'contrato')
      comprovante_endereco_url = await upload(data.comprovanteEndereco, 'endereco')
      selfie_documento_url = await upload(data.selfieResponsavel, 'selfie')
    }

    const dbData = {
      tipo: data.type,
      nome_completo: data.nome || null,
      razao_social: data.razaoSocial || null,
      cpf: data.cpf || null,
      cnpj: data.cnpj || null,
      email: data.email,
      telefone: data.telefone,
      renda_mensal: data.renda || null,
      faturamento_mensal: data.faturamento || null,
      ramo_atividade: data.ramo || null,
      comprovante_renda_url,
      comprovante_endereco_url,
      selfie_documento_url,
      contrato_social_url,
      status: 'pendente',
    }

    const { error } = await supabase.from('pre_cadastros').insert(dbData)
    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error submitting form', error)
    return { error }
  }
}
