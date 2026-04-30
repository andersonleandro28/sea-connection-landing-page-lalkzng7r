ALTER TABLE public.pre_cadastros ADD COLUMN IF NOT EXISTS data_nascimento text;
ALTER TABLE public.pre_cadastros ADD COLUMN IF NOT EXISTS documento_identidade_url text;
