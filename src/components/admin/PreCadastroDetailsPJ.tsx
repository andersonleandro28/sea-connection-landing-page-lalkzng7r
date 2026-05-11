import { Section, Detail, ValidableDetail, DocLink, calculateAge } from './SharedDetails'

export function PreCadastroDetailsPJ({ item }: { item: any }) {
  const age = calculateAge(item.data_nascimento_representante)

  return (
    <div className="space-y-8">
      <Section title="Seção 3 — Dados da Empresa">
        <Detail label="Razão Social" value={item.razao_social} />
        <ValidableDetail label="CNPJ" value={item.cnpj} isValid={item.cnpj_valido} />
        <Detail label="Ramo de Atividade" value={item.ramo_atividade} />
        <Detail label="Faturamento Mensal" value={item.faturamento_mensal} />
        <Detail label="Telefone da Empresa" value={item.telefone_empresa} />
        <Detail label="Email da Empresa" value={item.email_empresa} />
        <Detail
          label="Descrição do Estabelecimento"
          value={item.descricao_estabelecimento}
          fullWidth
        />
      </Section>

      <Section title="Dados do Representante">
        <Detail label="Nome" value={item.nome_representante} />
        <ValidableDetail label="CPF" value={item.cpf_representante} isValid={item.cpf_valido} />
        <Detail
          label="Data de Nascimento"
          value={`${item.data_nascimento_representante} ${age !== null ? `(${age} anos)` : ''}`}
        />
        <Detail label="Celular" value={item.celular_representante} />
        <Detail label="Email" value={item.email_representante} />
      </Section>

      <Section title="Endereço Comercial">
        <Detail label="CEP" value={item.cep} />
        <Detail label="Logradouro" value={item.logradouro} />
        <Detail label="Número" value={item.numero} />
        <Detail label="Complemento" value={item.complemento} />
        <Detail label="Bairro" value={item.bairro} />
        <Detail label="Cidade/UF" value={item.cidade ? `${item.cidade} / ${item.estado}` : ''} />
      </Section>

      <Section title="Seção 4 — Documentação da Empresa">
        <DocLink label="Contrato Social" url={item.contrato_social_url} />
        <DocLink label="Cartão CNPJ" url={item.cartao_cnpj_url} />
        <DocLink label="Comprovante de Endereço" url={item.comprovante_endereco_url} />
      </Section>

      <Section title="Seção 5 — Documentação do Representante Legal">
        <DocLink
          label="Documento de Identidade (RG/CNH)"
          url={item.documento_identidade_representante_url}
        />
        <DocLink
          label="Comprovante de Endereço"
          url={item.comprovante_endereco_representante_url}
        />
        <DocLink
          label="Selfie do Representante"
          url={item.selfie_representante_documento_url || item.selfie_documento_url}
          hint="Verificar se a pessoa está segurando o documento de identificação de forma clara e legível."
        />
      </Section>
    </div>
  )
}
