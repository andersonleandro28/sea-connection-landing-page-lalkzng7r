import {
  Section,
  Detail,
  ValidableDetail,
  DocLink,
  calculateAge,
  ValidationBadges,
} from './SharedDetails'
import { isValidCNPJ, isValidCPF } from '@/lib/validators'

export function PreCadastroDetailsPJ({ item }: { item: any }) {
  const age = calculateAge(item.data_nascimento_representante)

  return (
    <div className="space-y-6">
      <ValidationBadges item={item} />

      <Section title="Seção 1 — Dados da Empresa">
        <Detail label="Razão Social" value={item.razao_social} />
        <ValidableDetail label="CNPJ" value={item.cnpj} isValid={isValidCNPJ(item.cnpj || '')} />
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

      <Section title="Seção 2 — Dados do Representante">
        <Detail label="Nome" value={item.nome_representante} />
        <ValidableDetail
          label="CPF"
          value={item.cpf_representante}
          isValid={isValidCPF(item.cpf_representante || '')}
        />
        <Detail
          label="Data de Nascimento"
          value={`${item.data_nascimento_representante} ${age !== null ? `(${age} anos)` : ''}`}
        />
        <Detail label="Celular" value={item.celular_representante} />
        <Detail label="Email" value={item.email_representante} />
      </Section>

      <Section title="Seção 3 — Endereço">
        <Detail label="CEP" value={item.cep} />
        <Detail label="Logradouro" value={item.logradouro} />
        <Detail label="Número" value={item.numero} />
        <Detail label="Complemento" value={item.complemento} />
        <Detail label="Bairro" value={item.bairro} />
        <Detail label="Cidade/UF" value={item.cidade ? `${item.cidade} / ${item.estado}` : ''} />
      </Section>

      <Section title="Seção 4 — Documentos">
        <DocLink label="Contrato Social" url={item.contrato_social_url} />
        <DocLink label="Comprovante de Endereço" url={item.comprovante_endereco_url} />
        <DocLink
          label="Selfie do Representante"
          url={item.selfie_documento_url}
          hint="Verificar se a pessoa está segurando o documento de identificação de forma clara e legível."
        />
      </Section>
    </div>
  )
}
