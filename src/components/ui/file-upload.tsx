import { useState, useRef } from 'react'
import { UploadCloud, File, X, CheckCircle2, Download } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  value?: File | null
  onChange: (file: File | null) => void
  accept?: string
  maxSize?: number // in MB
  label?: string
  isError?: boolean
}

export function FileUpload({
  value,
  onChange,
  accept = '.pdf,.jpg,.jpeg,.png',
  maxSize = 5,
  label,
  isError = false,
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
      {label && <p className="text-[12px] text-[#999999] mb-2">{label}</p>}

      {!value ? (
        <div
          className={cn(
            'relative border-2 border-dashed rounded-[8px] p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200',
            dragActive
              ? 'border-[#00B4D8] bg-[#00B4D8]/10'
              : 'border-[#00B4D8] bg-[#00B4D8]/5 hover:bg-[#00B4D8]/10',
            (isError || error) && 'border-[#E53E3E] bg-[#E53E3E]/5 hover:bg-[#E53E3E]/10',
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
          <UploadCloud
            className={cn(
              'h-[48px] w-[48px] mb-2 transition-colors',
              isError || error ? 'text-[#E53E3E]' : 'text-[#00B4D8]',
            )}
          />
          <p className="text-[14px] font-medium text-[#333333]">
            Clique para selecionar ou arraste o arquivo
          </p>
          <p className="text-[12px] text-[#999999] mt-1">PDF, JPG ou PNG (Max {maxSize}MB)</p>
          {error && <p className="text-[12px] text-[#E53E3E] mt-2 font-medium">{error}</p>}
        </div>
      ) : (
        <div
          className="border border-[#E0E0E0] rounded-[8px] p-4 bg-white shadow-sm flex flex-col gap-3 animate-fade-in opacity-0"
          style={{ animationFillMode: 'forwards' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-[#00B4D8]/10 rounded text-[#00B4D8] shrink-0">
                <File className="h-5 w-5" />
              </div>
              <div className="truncate">
                <p className="text-[14px] font-medium text-[#333333] truncate">{value.name}</p>
                <p className="text-[12px] text-[#999999]">
                  {(value.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {progress === 100 && <CheckCircle2 className="h-5 w-5 text-[#48BB78]" />}
              {progress === 100 && value && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const url = URL.createObjectURL(value)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = value.name
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                  }}
                  className="text-[12px] text-[#1A3A52] hover:underline font-medium whitespace-nowrap"
                  title="Baixar arquivo"
                >
                  Baixar
                </button>
              )}
              <button
                type="button"
                onClick={handleRemove}
                className="p-1 hover:bg-[#F5F5F5] rounded text-[#999999] hover:text-[#E53E3E] transition-colors flex items-center justify-center"
                title="Remover"
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
