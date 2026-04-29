export function Footer() {
  return (
    <footer className="bg-sea-navy text-white py-12 mt-20">
      <div className="container mx-auto px-4 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-6">
          <img
            src="https://img.usecurling.com/i?q=waves&color=white&shape=fill"
            alt="Sea Connection Logo White"
            className="h-6 w-6 object-contain opacity-80"
          />
          <span className="font-bold text-lg opacity-90">Sea Connection</span>
        </div>
        <p className="text-white/60 text-sm">
          © {new Date().getFullYear()} Sea Connection Instituição de Pagamentos. Todos os direitos
          reservados.
        </p>
        <p className="text-white/40 text-xs max-w-2xl mx-auto mt-4 leading-relaxed">
          Sea Connection Instituição de Pagamento S.A. - CNPJ: 00.000.000/0000-00 <br />
          Rua Exemplo, 123 - Centro, São Paulo - SP, 01000-000
        </p>
      </div>
    </footer>
  )
}
