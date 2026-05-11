CREATE TABLE IF NOT EXISTS public.configuracoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  master_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email_contato TEXT,
  whatsapp_numero TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  facebook_url TEXT,
  twitter_url TEXT,
  endereco_empresa TEXT,
  faq_documento_url TEXT,
  privacidade_documento_url TEXT,
  termos_documento_url TEXT,
  data_criacao TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  data_atualizacao TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT configuracoes_email_check CHECK (email_contato IS NULL OR email_contato ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT configuracoes_whatsapp_check CHECK (whatsapp_numero IS NULL OR whatsapp_numero ~ '^[0-9]{11,}$'),
  CONSTRAINT configuracoes_instagram_check CHECK (instagram_url IS NULL OR instagram_url ~* '^https?://'),
  CONSTRAINT configuracoes_linkedin_check CHECK (linkedin_url IS NULL OR linkedin_url ~* '^https?://'),
  CONSTRAINT configuracoes_facebook_check CHECK (facebook_url IS NULL OR facebook_url ~* '^https?://'),
  CONSTRAINT configuracoes_twitter_check CHECK (twitter_url IS NULL OR twitter_url ~* '^https?://')
);

ALTER TABLE public.configuracoes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_public_select_configuracoes" ON public.configuracoes;
CREATE POLICY "allow_public_select_configuracoes" ON public.configuracoes 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "allow_master_all_configuracoes" ON public.configuracoes;
CREATE POLICY "allow_master_all_configuracoes" ON public.configuracoes 
  FOR ALL USING (auth.uid() = master_user_id) WITH CHECK (auth.uid() = master_user_id);

CREATE OR REPLACE FUNCTION public.update_configuracoes_modtime()
RETURNS trigger AS $$
BEGIN
  NEW.data_atualizacao = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_configuracoes_modtime ON public.configuracoes;
CREATE TRIGGER update_configuracoes_modtime
  BEFORE UPDATE ON public.configuracoes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_configuracoes_modtime();

CREATE OR REPLACE FUNCTION public.configuracoes_empty_to_null()
RETURNS trigger AS $$
BEGIN
  IF NEW.email_contato = '' THEN NEW.email_contato = NULL; END IF;
  IF NEW.whatsapp_numero = '' THEN NEW.whatsapp_numero = NULL; END IF;
  IF NEW.instagram_url = '' THEN NEW.instagram_url = NULL; END IF;
  IF NEW.linkedin_url = '' THEN NEW.linkedin_url = NULL; END IF;
  IF NEW.facebook_url = '' THEN NEW.facebook_url = NULL; END IF;
  IF NEW.twitter_url = '' THEN NEW.twitter_url = NULL; END IF;
  IF NEW.endereco_empresa = '' THEN NEW.endereco_empresa = NULL; END IF;
  IF NEW.faq_documento_url = '' THEN NEW.faq_documento_url = NULL; END IF;
  IF NEW.privacidade_documento_url = '' THEN NEW.privacidade_documento_url = NULL; END IF;
  IF NEW.termos_documento_url = '' THEN NEW.termos_documento_url = NULL; END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_configuracoes_empty_to_null ON public.configuracoes;
CREATE TRIGGER trg_configuracoes_empty_to_null
  BEFORE INSERT OR UPDATE ON public.configuracoes
  FOR EACH ROW
  EXECUTE FUNCTION public.configuracoes_empty_to_null();

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.configuracoes) THEN
    INSERT INTO public.configuracoes (id) VALUES ('00000000-0000-0000-0000-000000000001'::uuid);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'configuracoes'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.configuracoes';
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    -- Ignora erro caso a publicação não exista
END $$;
