DO $$
BEGIN
  -- Insert seed user if not exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'andersonleandro28@gmail.com') THEN
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000',
      'andersonleandro28@gmail.com',
      crypt('Skip@Pass123', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Admin", "role": "master"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  ELSE
    -- Update existing user to have master role
    UPDATE auth.users
    SET raw_user_meta_data = jsonb_set(COALESCE(raw_user_meta_data, '{}'::jsonb), '{role}', '"master"')
    WHERE email = 'andersonleandro28@gmail.com';
  END IF;
  
  -- Seed configuracoes table with 1 row if empty
  IF NOT EXISTS (SELECT 1 FROM public.configuracoes) THEN
    INSERT INTO public.configuracoes (id) VALUES (gen_random_uuid());
  END IF;

  -- Link configuracoes to master user if not linked
  UPDATE public.configuracoes 
  SET master_user_id = (SELECT id FROM auth.users WHERE email = 'andersonleandro28@gmail.com')
  WHERE master_user_id IS NULL;
END $$;

-- Create Storage bucket for documents if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true) 
ON CONFLICT (id) DO NOTHING;

-- Policies for storage
DROP POLICY IF EXISTS "Public access to documents" ON storage.objects;
CREATE POLICY "Public access to documents" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'documents');

DROP POLICY IF EXISTS "Master can upload documents" ON storage.objects;
CREATE POLICY "Master can upload documents" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'documents' AND 
    (auth.jwt()->'user_metadata'->>'role')::text = 'master'
  );

DROP POLICY IF EXISTS "Master can update documents" ON storage.objects;
CREATE POLICY "Master can update documents" ON storage.objects
  FOR UPDATE TO authenticated USING (
    bucket_id = 'documents' AND 
    (auth.jwt()->'user_metadata'->>'role')::text = 'master'
  );

DROP POLICY IF EXISTS "Master can delete documents" ON storage.objects;
CREATE POLICY "Master can delete documents" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'documents' AND 
    (auth.jwt()->'user_metadata'->>'role')::text = 'master'
  );
