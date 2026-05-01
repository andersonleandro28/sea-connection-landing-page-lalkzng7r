import { Section, Detail, ValidableDetail, DocLink, calculateAge } from './SharedDetails'

export function PreCadastroDetailsPF({ item }: { item: any }) {
  const age = calculateAge(item.data_nascimento)

  return (
    <div className="space-y-8">
      <Section title="Seção 3 — Dados Pessoais e Financeiros">
        <Detail label="Nome Completo" value={item.nome_completo} />
        <ValidableDetail label="CPF" value={item.cpf} isValid={item.cpf_valido} />
        <Detail
          label="Data de Nascimento"
          value={`${item.data_nascimento} ${age !== null ? `(${age} anos)` : ''}`}
        />
        <Detail label="Email" value={item.email} />
        <Detail label="Telefone" value={item.telefone} />
        <Detail label="Renda Mensal" value={item.renda_mensal} />
        <Detail label="Descrição da Atividade" value={item.descricao_estabelecimento} fullWidth />
      </Section>

      <Section title="Endereço">
        <Detail label="CEP" value={item.cep} />
        <Detail label="Logradouro" value={item.logradouro} />
        <Detail label="Número" value={item.numero} />
        <Detail label="Complemento" value={item.complemento} />
        <Detail label="Bairro" value={item.bairro} />
        <Detail label="Cidade/UF" value={item.cidade ? `${item.cidade} / ${item.estado}` : ''} />
      </Section>

      <Section title="Seção 4 — Documentos Anexados">
        <DocLink label="Documento de Identidade" url={item.documento_identidade_url} />
        <DocLink label="Comprovante de Renda" url={item.comprovante_renda_url} />
        <DocLink label="Comprovante de Endereço" url={item.comprovante_endereco_url} />
        <DocLink
          label="Selfie com Documento"
          url={item.selfie_documento_url}
          hint="Verificar se a pessoa está segurando o documento de identificação de forma clara e legível."
        />
      </Section>
    </div>
  )
}
