import { create } from 'zustand'
import { supabase } from '@/lib/supabase/client'

export interface Config {
  id: string
  email_contato: string | null
  whatsapp_numero: string | null
  instagram_url: string | null
  linkedin_url: string | null
  facebook_url: string | null
  twitter_url: string | null
  endereco_empresa: string | null
  faq_documento_url: string | null
  privacidade_documento_url: string | null
  termos_documento_url: string | null
}

interface ConfigStore {
  config: Config | null
  loading: boolean
  fetchConfig: () => Promise<void>
  subscribe: () => () => void
}

export const useConfigStore = create<ConfigStore>((set) => ({
  config: null,
  loading: true,
  fetchConfig: async () => {
    try {
      const { data, error } = await supabase.from('configuracoes').select('*').limit(1).single()

      if (!error && data) {
        set({ config: data as Config, loading: false })
      } else {
        set({ loading: false })
      }
    } catch (e) {
      console.error('Error fetching config:', e)
      set({ loading: false })
    }
  },
  subscribe: () => {
    const channel = supabase
      .channel('configuracoes_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'configuracoes' },
        (payload) => {
          set({ config: payload.new as Config })
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  },
}))
