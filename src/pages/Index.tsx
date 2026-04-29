import { Hero } from '@/components/Hero'
import { Stats } from '@/components/Stats'
import { RegistrationForm } from '@/components/RegistrationForm'

export default function Index() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Stats />

      <section className="py-20 md:py-28 px-4 bg-slate-50">
        <div className="container mx-auto">
          <RegistrationForm />
        </div>
      </section>
    </div>
  )
}
