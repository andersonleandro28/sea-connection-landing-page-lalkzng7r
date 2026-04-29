import { Card, CardContent } from '@/components/ui/card'

export function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card className="border-slate-100 shadow-sm transition-all hover:shadow-md">
      <CardContent className="p-4 md:p-6 flex flex-col justify-center h-full">
        <p className="text-xs md:text-sm font-medium text-gray-500 mb-1">{title}</p>
        <p className="text-xl md:text-3xl font-bold text-[#1A3A52]">{value}</p>
      </CardContent>
    </Card>
  )
}
