import { Hero } from '@/components/Hero'
import { Stats } from '@/components/Stats'
import { Products } from '@/components/Products'
import { Features } from '@/components/Features'
import { RegistrationForm } from '@/components/RegistrationForm'
import { CTASection } from '@/components/CTASection'

export default function Index() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Stats />
      <Products />
      <Features />

      <section className="py-20 md:py-28 px-4 bg-slate-50">
        <div className="container mx-auto">
          <RegistrationForm />
        </div>
      </section>

      <CTASection />
    </div>
  )
}
