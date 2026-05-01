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
      pre_cadastros: {
        Row: {
          bairro: string | null
          celular_representante: string | null
          cep: string | null
          cidade: string | null
          cnpj: string | null
          complemento: string | null
          comprovante_endereco_url: string | null
          comprovante_renda_url: string | null
          contrato_social_url: string | null
          cpf: string | null
          cpf_representante: string | null
          created_at: string
          data_nascimento: string | null
          data_nascimento_representante: string | null
          descricao_atividade: string | null
          descricao_estabelecimento: string | null
          documento_identidade_url: string | null
          email: string
          email_empresa: string | null
          email_representante: string | null
          estado: string | null
          faturamento_mensal: string | null
          id: string
          logradouro: string | null
          motivo_rejeicao: string | null
          nome_completo: string | null
          nome_representante: string | null
          numero: string | null
          ramo_atividade: string | null
          razao_social: string | null
          renda_mensal: string | null
          selfie_documento_url: string | null
          status: string | null
          telefone: string
          telefone_empresa: string | null
          tipo: string
          token_cadastro: string | null
          updated_at: string
        }
        Insert: {
          bairro?: string | null
          celular_representante?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          complemento?: string | null
          comprovante_endereco_url?: string | null
          comprovante_renda_url?: string | null
          contrato_social_url?: string | null
          cpf?: string | null
          cpf_representante?: string | null
          created_at?: string
          data_nascimento?: string | null
          data_nascimento_representante?: string | null
          descricao_atividade?: string | null
          descricao_estabelecimento?: string | null
          documento_identidade_url?: string | null
          email: string
          email_empresa?: string | null
          email_representante?: string | null
          estado?: string | null
          faturamento_mensal?: string | null
          id?: string
          logradouro?: string | null
          motivo_rejeicao?: string | null
          nome_completo?: string | null
          nome_representante?: string | null
          numero?: string | null
          ramo_atividade?: string | null
          razao_social?: string | null
          renda_mensal?: string | null
          selfie_documento_url?: string | null
          status?: string | null
          telefone: string
          telefone_empresa?: string | null
          tipo: string
          token_cadastro?: string | null
          updated_at?: string
        }
        Update: {
          bairro?: string | null
          celular_representante?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          complemento?: string | null
          comprovante_endereco_url?: string | null
          comprovante_renda_url?: string | null
          contrato_social_url?: string | null
          cpf?: string | null
          cpf_representante?: string | null
          created_at?: string
          data_nascimento?: string | null
          data_nascimento_representante?: string | null
          descricao_atividade?: string | null
          descricao_estabelecimento?: string | null
          documento_identidade_url?: string | null
          email?: string
          email_empresa?: string | null
          email_representante?: string | null
          estado?: string | null
          faturamento_mensal?: string | null
          id?: string
          logradouro?: string | null
          motivo_rejeicao?: string | null
          nome_completo?: string | null
          nome_representante?: string | null
          numero?: string | null
          ramo_atividade?: string | null
          razao_social?: string | null
          renda_mensal?: string | null
          selfie_documento_url?: string | null
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

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: approval_tokens
//   id: uuid (not null, default: gen_random_uuid())
//   pre_cadastro_id: uuid (not null)
//   token: text (not null)
//   status: text (not null, default: 'ativo'::text)
//   data_criacao: timestamp with time zone (not null, default: now())
//   data_expiracao: timestamp with time zone (not null)
//   data_uso: timestamp with time zone (nullable)
// Table: pre_cadastros
//   id: uuid (not null, default: gen_random_uuid())
//   tipo: text (not null)
//   nome_completo: text (nullable)
//   razao_social: text (nullable)
//   cpf: text (nullable)
//   cnpj: text (nullable)
//   email: text (not null)
//   telefone: text (not null)
//   renda_mensal: text (nullable)
//   faturamento_mensal: text (nullable)
//   ramo_atividade: text (nullable)
//   comprovante_renda_url: text (nullable)
//   comprovante_endereco_url: text (nullable)
//   selfie_documento_url: text (nullable)
//   contrato_social_url: text (nullable)
//   status: text (nullable, default: 'pendente'::text)
//   motivo_rejeicao: text (nullable)
//   token_cadastro: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
//   descricao_estabelecimento: text (nullable)
//   telefone_empresa: text (nullable)
//   email_empresa: text (nullable)
//   nome_representante: text (nullable)
//   cpf_representante: text (nullable)
//   data_nascimento_representante: text (nullable)
//   celular_representante: text (nullable)
//   email_representante: text (nullable)
//   cep: text (nullable)
//   logradouro: text (nullable)
//   numero: text (nullable)
//   complemento: text (nullable)
//   bairro: text (nullable)
//   cidade: text (nullable)
//   estado: text (nullable)
//   data_nascimento: text (nullable)
//   documento_identidade_url: text (nullable)
//   descricao_atividade: text (nullable)

// --- CONSTRAINTS ---
// Table: approval_tokens
//   PRIMARY KEY approval_tokens_pkey: PRIMARY KEY (id)
//   FOREIGN KEY approval_tokens_pre_cadastro_id_fkey: FOREIGN KEY (pre_cadastro_id) REFERENCES pre_cadastros(id) ON DELETE CASCADE
//   UNIQUE approval_tokens_token_key: UNIQUE (token)
// Table: pre_cadastros
//   PRIMARY KEY pre_cadastros_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: approval_tokens
//   Policy "anon_select_approval_tokens" (SELECT, PERMISSIVE) roles={anon}
//     USING: true
//   Policy "auth_all_approval_tokens" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: pre_cadastros
//   Policy "anon_insert_pre_cadastros" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: true
//   Policy "auth_select_pre_cadastros" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "auth_update_pre_cadastros" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true

// --- INDEXES ---
// Table: approval_tokens
//   CREATE UNIQUE INDEX approval_tokens_token_key ON public.approval_tokens USING btree (token)
