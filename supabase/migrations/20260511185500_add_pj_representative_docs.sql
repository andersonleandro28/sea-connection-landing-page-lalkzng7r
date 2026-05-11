ALTER TABLE public.pre_cadastros 
ADD COLUMN IF NOT EXISTS cartao_cnpj_url TEXT,
ADD COLUMN IF NOT EXISTS documento_identidade_representante_url TEXT,
ADD COLUMN IF NOT EXISTS comprovante_endereco_representante_url TEXT,
ADD COLUMN IF NOT EXISTS selfie_representante_documento_url TEXT;
