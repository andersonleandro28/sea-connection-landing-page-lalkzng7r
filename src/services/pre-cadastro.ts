import { supabase } from '@/lib/supabase/client'
import { isValidCPF, isValidCNPJ, analyzeRisk, calculateAgeFromDateString } from '@/lib/validators'

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
    let documento_identidade_url = null
    let cartao_cnpj_url = null
    let documento_identidade_representante_url = null
    let comprovante_endereco_representante_url = null
    let selfie_representante_documento_url = null

    let cpf_valido = false
    let cnpj_valido = false
    let nivel_risco = 'alto'
    let idade = 0
    let documentacao_completa = false
    let dados_consistentes = true

    if (data.type === 'PF') {
      documento_identidade_url = await upload(data.documentoIdentidade, 'identidade')
      comprovante_renda_url = await upload(data.comprovanteRenda, 'renda')
      comprovante_endereco_url = await upload(data.comprovanteEndereco, 'endereco')
      selfie_documento_url = await upload(data.selfie, 'selfie')

      cpf_valido = isValidCPF(data.cpf || '')
      nivel_risco = analyzeRisk(data.descricao || '')
      idade = calculateAgeFromDateString(data.dataNascimento || '')
      documentacao_completa = !!(
        documento_identidade_url &&
        comprovante_renda_url &&
        comprovante_endereco_url &&
        selfie_documento_url
      )
      dados_consistentes = true
    } else {
      contrato_social_url = await upload(data.contratoSocial, 'contrato')
      comprovante_endereco_url = await upload(data.comprovanteEndereco, 'endereco')
      cartao_cnpj_url = await upload(data.cartaoCnpj, 'cnpj')
      documento_identidade_representante_url = await upload(
        data.documentoIdentidadeRepresentante,
        'identidade_rep',
      )
      comprovante_endereco_representante_url = await upload(
        data.comprovanteEnderecoRepresentante,
        'endereco_rep',
      )
      selfie_representante_documento_url = await upload(data.selfieResponsavel, 'selfie_rep')

      selfie_documento_url = selfie_representante_documento_url

      cnpj_valido = isValidCNPJ(data.cnpj || '')
      cpf_valido = isValidCPF(data.cpfRepresentante || '')
      nivel_risco = analyzeRisk(data.descricao || '')
      idade = calculateAgeFromDateString(data.dataNascimento || '')
      documentacao_completa = !!(
        contrato_social_url &&
        comprovante_endereco_url &&
        cartao_cnpj_url &&
        documento_identidade_representante_url &&
        comprovante_endereco_representante_url &&
        selfie_representante_documento_url
      )

      if (data.email === data.emailRepresentante) dados_consistentes = false
      if (data.telefone === data.celularRepresentante) dados_consistentes = false
      if (data.cnpj === data.cpfRepresentante) dados_consistentes = false
    }

    let score = 0
    let docCount = 0
    let totalDocs = data.type === 'PF' ? 4 : 6

    if (data.type === 'PF') {
      if (documento_identidade_url) docCount++
      if (comprovante_renda_url) docCount++
      if (comprovante_endereco_url) docCount++
      if (selfie_documento_url) docCount++
    } else {
      if (contrato_social_url) docCount++
      if (comprovante_endereco_url) docCount++
      if (cartao_cnpj_url) docCount++
      if (documento_identidade_representante_url) docCount++
      if (comprovante_endereco_representante_url) docCount++
      if (selfie_representante_documento_url) docCount++
    }

    if (docCount === totalDocs) score += 30
    else if (docCount === totalDocs - 1) score += 20

    if (data.type === 'PF') {
      if (cpf_valido) score += 20
    } else {
      if (cnpj_valido && cpf_valido) score += 20
      else if (cnpj_valido || cpf_valido) score += 10
    }

    if (dados_consistentes) score += 15

    if (nivel_risco === 'baixo') score += 15
    else if (nivel_risco === 'médio') score += 8

    if (idade >= 18) score += 10

    let isHighIncome = false
    if (data.type === 'PF') {
      if (data.renda && !data.renda.toLowerCase().includes('até r$ 2.000')) isHighIncome = true
    } else {
      if (data.faturamento && !data.faturamento.toLowerCase().includes('até r$ 10.000'))
        isHighIncome = true
    }
    if (isHighIncome) score += 10
    else score += 5

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
      documento_identidade_url,
      cartao_cnpj_url,
      documento_identidade_representante_url,
      comprovante_endereco_representante_url,
      selfie_representante_documento_url,
      status: 'pendente',
      descricao_estabelecimento: data.descricao || null,
      telefone_empresa: data.type === 'PJ' ? data.telefone : null,
      email_empresa: data.type === 'PJ' ? data.email : null,
      nome_representante: data.nomeRepresentante || null,
      cpf_representante: data.cpfRepresentante || null,
      data_nascimento: data.type === 'PF' ? data.dataNascimento : null,
      data_nascimento_representante: data.type === 'PJ' ? data.dataNascimento : null,
      celular_representante: data.celularRepresentante || null,
      email_representante: data.emailRepresentante || null,
      cep: data.cep || null,
      logradouro: data.logradouro || null,
      numero: data.numero || null,
      complemento: data.complemento || null,
      bairro: data.bairro || null,
      cidade: data.cidade || null,
      estado: data.estado || null,
      cpf_valido,
      cnpj_valido,
      nivel_risco,
      idade,
      documentacao_completa,
      dados_consistentes,
      data_validacao: new Date().toISOString(),
      score,
    }

    const { error } = await supabase.from('pre_cadastros').insert(dbData)
    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error submitting form', error)
    return { error }
  }
}
