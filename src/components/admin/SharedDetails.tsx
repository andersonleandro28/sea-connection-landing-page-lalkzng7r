import { FileText, ExternalLink, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h3 className="font-semibold text-sm text-[#1A3A52] uppercase tracking-wider border-b pb-2 mb-4">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
      {children}
    </div>
  </div>
)

export const Detail = ({
  label,
  value,
  fullWidth,
}: {
  label: string
  value: React.ReactNode
  fullWidth?: boolean
}) => (
  <div className={cn('mb-1', fullWidth && 'md:col-span-2')}>
    <p className="text-xs text-slate-500 mb-1 font-medium">{label}</p>
    <div className="text-sm font-semibold text-slate-900 bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
      {value || '-'}
    </div>
  </div>
)

export const ValidableDetail = ({
  label,
  value,
  isValid,
}: {
  label: string
  value: string
  isValid: boolean
}) => (
  <div className="mb-1">
    <p className="text-xs text-slate-500 mb-1 font-medium">{label}</p>
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 rounded-md border w-full justify-between',
        isValid ? 'bg-green-50/50 border-green-200' : 'bg-red-50/50 border-red-200',
      )}
    >
      <span className={cn('text-sm font-bold', isValid ? 'text-green-800' : 'text-red-800')}>
        {value || '-'}
      </span>
      {value &&
        (isValid ? (
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
        ) : (
          <XCircle className="w-4 h-4 text-red-600 shrink-0" />
        ))}
    </div>
  </div>
)

export const DocLink = ({
  label,
  url,
  hint,
}: {
  label: string
  url: string | null
  hint?: string
}) => (
  <div className="mb-2 bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-center transition-all hover:shadow-md">
    <p className="text-xs text-slate-500 mb-3 font-bold uppercase tracking-wide">{label}</p>
    {url ? (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00B4D8] hover:text-white bg-white hover:bg-[#00B4D8] px-4 py-2.5 rounded-lg transition-colors border border-slate-200 hover:border-[#00B4D8] w-full justify-between shadow-sm group"
      >
        <span className="flex items-center gap-2">
          <FileText className="w-4 h-4 group-hover:text-white" /> Visualizar Documento
        </span>
        <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
      </a>
    ) : (
      <span className="text-sm font-medium text-slate-400 italic block py-2 bg-slate-100/50 rounded-lg px-3 border border-dashed border-slate-200">
        Documento não enviado
      </span>
    )}
    {hint && (
      <p className="text-[11px] text-[#B06000] mt-3 font-medium leading-relaxed bg-yellow-50 p-2 rounded border border-yellow-100">
        {hint}
      </p>
    )}
  </div>
)

export const calculateAge = (dateString: string | null) => {
  if (!dateString) return null
  let day, month, year
  if (dateString.includes('/')) {
    const [d, m, y] = dateString.split('/')
    day = parseInt(d)
    month = parseInt(m)
    year = parseInt(y)
  } else if (dateString.includes('-')) {
    const [y, m, d] = dateString.split('-')
    day = parseInt(d)
    month = parseInt(m)
    year = parseInt(y)
  } else {
    return null
  }
  const birthDate = new Date(year, month - 1, day)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const mDiff = today.getMonth() - birthDate.getMonth()
  if (mDiff < 0 || (mDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
