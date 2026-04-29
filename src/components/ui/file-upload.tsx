import { useState, useRef } from 'react'
import { UploadCloud, File, X, CheckCircle2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  value?: File | null
  onChange: (file: File | null) => void
  accept?: string
  maxSize?: number // in MB
  label?: string
}

export function FileUpload({
  value,
  onChange,
  accept = '.pdf,.jpg,.jpeg,.png',
  maxSize = 5,
  label,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]

    if (file.size > maxSize * 1024 * 1024) {
      setError(`O arquivo deve ter no máximo ${maxSize}MB`)
      return
    }

    setError(null)
    onChange(file)
    simulateProgress()
  }

  const simulateProgress = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 50)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
    setProgress(0)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="space-y-2">
      {label && <p className="text-sm text-slate-500 mb-2">{label}</p>}

      {!value ? (
        <div
          className={cn(
            'relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50',
            dragActive ? 'border-sea-cyan bg-sea-cyan/5' : 'border-slate-300 hover:bg-slate-100',
            error && 'border-red-400 bg-red-50',
          )}
          onDragOver={(e) => {
            e.preventDefault()
            setDragActive(true)
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            accept={accept}
            onChange={(e) => handleFiles(e.target.files)}
          />
          <UploadCloud className="h-8 w-8 text-slate-400 mb-2" />
          <p className="text-sm font-medium text-slate-700">
            Clique para selecionar ou arraste o arquivo
          </p>
          <p className="text-xs text-slate-500 mt-1">PDF, JPG ou PNG (Max {maxSize}MB)</p>
          {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
        </div>
      ) : (
        <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm flex flex-col gap-3 animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-sea-cyan/10 rounded text-sea-cyan shrink-0">
                <File className="h-5 w-5" />
              </div>
              <div className="truncate">
                <p className="text-sm font-medium text-slate-700 truncate">{value.name}</p>
                <p className="text-xs text-slate-500">{(value.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {progress === 100 && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              <button
                type="button"
                onClick={handleRemove}
                className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          {progress < 100 && <Progress value={progress} className="h-1.5" />}
        </div>
      )}
    </div>
  )
}
