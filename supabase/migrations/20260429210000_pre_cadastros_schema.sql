-- Create table for pre-registrations
CREATE TABLE IF NOT EXISTS public.pre_cadastros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT NOT NULL,
  nome_completo TEXT,
  razao_social TEXT,
  cpf TEXT,
  cnpj TEXT,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  renda_mensal TEXT,
  faturamento_mensal TEXT,
  ramo_atividade TEXT,
  comprovante_renda_url TEXT,
  comprovante_endereco_url TEXT,
  selfie_documento_url TEXT,
  contrato_social_url TEXT,
  status TEXT DEFAULT 'pendente',
  motivo_rejeicao TEXT,
  token_cadastro TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Setup RLS
ALTER TABLE public.pre_cadastros ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_pre_cadastros" ON public.pre_cadastros;
CREATE POLICY "anon_insert_pre_cadastros" ON public.pre_cadastros
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_pre_cadastros" ON public.pre_cadastros;
CREATE POLICY "auth_select_pre_cadastros" ON public.pre_cadastros
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_pre_cadastros" ON public.pre_cadastros;
CREATE POLICY "auth_update_pre_cadastros" ON public.pre_cadastros
  FOR UPDATE TO authenticated USING (true);

-- Create bucket for documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documentos', 'documentos', true) 
ON CONFLICT (id) DO NOTHING;

-- Setup Storage Policies
DROP POLICY IF EXISTS "public_insert_documentos" ON storage.objects;
CREATE POLICY "public_insert_documentos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'documentos');

DROP POLICY IF EXISTS "public_select_documentos" ON storage.objects;
CREATE POLICY "public_select_documentos" ON storage.objects
  FOR SELECT USING (bucket_id = 'documentos');

-- Seed Auth User and Sample Data
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- 1. Create Admin User
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'andersonleandro28@gmail.com') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'andersonleandro28@gmail.com',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Admin"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;

  -- 2. Create sample pre_cadastros
  IF NOT EXISTS (SELECT 1 FROM public.pre_cadastros) THEN
    INSERT INTO public.pre_cadastros (
      tipo, nome_completo, cpf, email, telefone, renda_mensal, status
    ) VALUES 
      ('PF', 'João da Silva', '123.456.789-00', 'joao.silva@example.com', '(11) 98765-4321', 'R$ 2.000-5.000', 'pendente');
      
    INSERT INTO public.pre_cadastros (
      tipo, razao_social, cnpj, email, telefone, faturamento_mensal, ramo_atividade, status
    ) VALUES 
      ('PJ', 'Tech Solutions Brasil LTDA', '12.345.678/0001-99', 'contato@techsolutions.com.br', '(11) 3456-7890', 'R$ 10.000-50.000', 'Tecnologia', 'pendente');
      
    INSERT INTO public.pre_cadastros (
      tipo, nome_completo, cpf, email, telefone, renda_mensal, status, updated_at
    ) VALUES 
      ('PF', 'Maria Oliveira', '987.654.321-11', 'maria.oliveira@example.com', '(21) 99999-8888', 'Acima de R$ 10.000', 'aprovado', NOW() - INTERVAL '1 day');
  END IF;
END $$;
