import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email, status, token, motivo } = await req.json();

    // Log para simular o envio real do e-mail
    console.log(`[EMAIL SYSTEM] Preparando para enviar e-mail transacional para ${email}`);
    
    if (status === 'aprovado') {
      console.log(`[EMAIL SYSTEM] Assunto: Parabéns! Sua análise foi aprovada.`);
      console.log(`[EMAIL SYSTEM] Mensagem: Clique no link abaixo para completar seu cadastro no sistema.`);
      console.log(`[EMAIL SYSTEM] Link: https://seaconnection.new.paytime.com.br/register?token=${token}`);
    } else {
      console.log(`[EMAIL SYSTEM] Assunto: Atualização sobre seu pré-cadastro`);
      console.log(`[EMAIL SYSTEM] Mensagem: Infelizmente, sua análise não foi aprovada.`);
      console.log(`[EMAIL SYSTEM] Motivo: ${motivo}`);
      console.log(`[EMAIL SYSTEM] Entre em contato conosco para mais informações.`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email enviado com sucesso' }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});
