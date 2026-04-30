CREATE TABLE IF NOT EXISTS public.approval_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pre_cadastro_id UUID REFERENCES public.pre_cadastros(id) ON DELETE CASCADE NOT NULL,
  token TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'ativo',
  data_criacao TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  data_expiracao TIMESTAMPTZ NOT NULL,
  data_uso TIMESTAMPTZ
);

ALTER TABLE public.pre_cadastros ADD COLUMN IF NOT EXISTS descricao_atividade TEXT;

ALTER TABLE public.approval_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "auth_all_approval_tokens" ON public.approval_tokens;
CREATE POLICY "auth_all_approval_tokens" ON public.approval_tokens
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
  
DROP POLICY IF EXISTS "anon_select_approval_tokens" ON public.approval_tokens;
CREATE POLICY "anon_select_approval_tokens" ON public.approval_tokens
  FOR SELECT TO anon USING (true);
