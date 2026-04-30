import { FileText, ExternalLink, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6 last:mb-0">
    <h3 className="font-semibold text-sm text-[#1A3A52] uppercase tracking-wider border-b pb-2 mb-4">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
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
  <div className={cn('mb-2', fullWidth && 'md:col-span-2')}>
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <div className="text-sm font-medium text-gray-900">{value || '-'}</div>
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
  <div className="mb-2">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <div
      className={cn(
        'inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border',
        isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200',
      )}
    >
      <span className={cn('text-sm font-medium', isValid ? 'text-green-700' : 'text-red-700')}>
        {value || '-'}
      </span>
      {value &&
        (isValid ? (
          <CheckCircle2 className="w-4 h-4 text-green-600" />
        ) : (
          <XCircle className="w-4 h-4 text-red-600" />
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
  <div className="mb-4 bg-slate-50 p-3 rounded-lg border flex flex-col justify-center">
    <p className="text-xs text-gray-500 mb-2 font-medium">{label}</p>
    {url ? (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00B4D8] hover:text-[#008ba8] bg-white px-3 py-2 rounded-md transition-colors border border-gray-200 w-full justify-between shadow-sm hover:shadow"
      >
        <span className="flex items-center gap-2">
          <FileText className="w-4 h-4" /> Visualizar Documento
        </span>
        <ExternalLink className="w-3 h-3" />
      </a>
    ) : (
      <span className="text-sm text-gray-400 italic block py-1">Documento não enviado</span>
    )}
    {hint && <p className="text-[11px] text-[#B06000] mt-2 leading-tight">{hint}</p>}
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
