// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      approval_tokens: {
        Row: {
          data_criacao: string
          data_expiracao: string
          data_uso: string | null
          id: string
          pre_cadastro_id: string
          status: string
          token: string
        }
        Insert: {
          data_criacao?: string
          data_expiracao: string
          data_uso?: string | null
          id?: string
          pre_cadastro_id: string
          status?: string
          token: string
        }
        Update: {
          data_criacao?: string
          data_expiracao?: string
          data_uso?: string | null
          id?: string
          pre_cadastro_id?: string
          status?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: 'approval_tokens_pre_cadastro_id_fkey'
            columns: ['pre_cadastro_id']
            isOneToOne: false
            referencedRelation: 'pre_cadastros'
            referencedColumns: ['id']
          },
        ]
      }
      configuracoes: {
        Row: {
          data_atualizacao: string
          data_criacao: string
          email_contato: string | null
          endereco_empresa: string | null
          facebook_url: string | null
          faq_documento_url: string | null
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          master_user_id: string | null
          privacidade_documento_url: string | null
          termos_documento_url: string | null
          twitter_url: string | null
          whatsapp_numero: string | null
        }
        Insert: {
          data_atualizacao?: string
          data_criacao?: string
          email_contato?: string | null
          endereco_empresa?: string | null
          facebook_url?: string | null
          faq_documento_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          master_user_id?: string | null
          privacidade_documento_url?: string | null
          termos_documento_url?: string | null
          twitter_url?: string | null
          whatsapp_numero?: string | null
        }
        Update: {
          data_atualizacao?: string
          data_criacao?: string
          email_contato?: string | null
          endereco_empresa?: string | null
          facebook_url?: string | null
          faq_documento_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          master_user_id?: string | null
          privacidade_documento_url?: string | null
          termos_documento_url?: string | null
          twitter_url?: string | null
          whatsapp_numero?: string | null
        }
        Relationships: []
      }
      pre_cadastros: {
        Row: {
          bairro: string | null
          cartao_cnpj_url: string | null
          celular_representante: string | null
          cep: string | null
          cidade: string | null
          cnpj: string | null
          cnpj_valido: boolean | null
          complemento: string | null
          comprovante_endereco_representante_url: string | null
          comprovante_endereco_url: string | null
          comprovante_renda_url: string | null
          contrato_social_url: string | null
          cpf: string | null
          cpf_representante: string | null
          cpf_valido: boolean | null
          created_at: string
          dados_consistentes: boolean | null
          data_nascimento: string | null
          data_nascimento_representante: string | null
          data_validacao: string | null
          descricao_atividade: string | null
          descricao_estabelecimento: string | null
          documentacao_completa: boolean | null
          documento_identidade_representante_url: string | null
          documento_identidade_url: string | null
          email: string
          email_empresa: string | null
          email_representante: string | null
          estado: string | null
          faturamento_mensal: string | null
          id: string
          idade: number | null
          logradouro: string | null
          motivo_rejeicao: string | null
          nivel_risco: string | null
          nome_completo: string | null
          nome_representante: string | null
          numero: string | null
          ramo_atividade: string | null
          razao_social: string | null
          renda_mensal: string | null
          score: number | null
          selfie_documento_url: string | null
          selfie_representante_documento_url: string | null
          status: string | null
          telefone: string
          telefone_empresa: string | null
          tipo: string
          token_cadastro: string | null
          updated_at: string
        }
        Insert: {
          bairro?: string | null
          cartao_cnpj_url?: string | null
          celular_representante?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          cnpj_valido?: boolean | null
          complemento?: string | null
          comprovante_endereco_representante_url?: string | null
          comprovante_endereco_url?: string | null
          comprovante_renda_url?: string | null
          contrato_social_url?: string | null
          cpf?: string | null
          cpf_representante?: string | null
          cpf_valido?: boolean | null
          created_at?: string
          dados_consistentes?: boolean | null
          data_nascimento?: string | null
          data_nascimento_representante?: string | null
          data_validacao?: string | null
          descricao_atividade?: string | null
          descricao_estabelecimento?: string | null
          documentacao_completa?: boolean | null
          documento_identidade_representante_url?: string | null
          documento_identidade_url?: string | null
          email: string
          email_empresa?: string | null
          email_representante?: string | null
          estado?: string | null
          faturamento_mensal?: string | null
          id?: string
          idade?: number | null
          logradouro?: string | null
          motivo_rejeicao?: string | null
          nivel_risco?: string | null
          nome_completo?: string | null
          nome_representante?: string | null
          numero?: string | null
          ramo_atividade?: string | null
          razao_social?: string | null
          renda_mensal?: string | null
          score?: number | null
          selfie_documento_url?: string | null
          selfie_representante_documento_url?: string | null
          status?: string | null
          telefone: string
          telefone_empresa?: string | null
          tipo: string
          token_cadastro?: string | null
          updated_at?: string
        }
        Update: {
          bairro?: string | null
          cartao_cnpj_url?: string | null
          celular_representante?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          cnpj_valido?: boolean | null
          complemento?: string | null
          comprovante_endereco_representante_url?: string | null
          comprovante_endereco_url?: string | null
          comprovante_renda_url?: string | null
          contrato_social_url?: string | null
          cpf?: string | null
          cpf_representante?: string | null
          cpf_valido?: boolean | null
          created_at?: string
          dados_consistentes?: boolean | null
          data_nascimento?: string | null
          data_nascimento_representante?: string | null
          data_validacao?: string | null
          descricao_atividade?: string | null
          descricao_estabelecimento?: string | null
          documentacao_completa?: boolean | null
          documento_identidade_representante_url?: string | null
          documento_identidade_url?: string | null
          email?: string
          email_empresa?: string | null
          email_representante?: string | null
          estado?: string | null
          faturamento_mensal?: string | null
          id?: string
          idade?: number | null
          logradouro?: string | null
          motivo_rejeicao?: string | null
          nivel_risco?: string | null
          nome_completo?: string | null
          nome_representante?: string | null
          numero?: string | null
          ramo_atividade?: string | null
          razao_social?: string | null
          renda_mensal?: string | null
          score?: number | null
          selfie_documento_url?: string | null
          selfie_representante_documento_url?: string | null
          status?: string | null
          telefone?: string
          telefone_empresa?: string | null
          tipo?: string
          token_cadastro?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
