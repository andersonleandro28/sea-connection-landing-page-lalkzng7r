import { Hero } from '@/components/Hero'
import { Stats } from '@/components/Stats'
import { Products } from '@/components/Products'
import { Features } from '@/components/Features'
import { Testimonials } from '@/components/Testimonials'
import { RegistrationForm } from '@/components/RegistrationForm'
import { CTASection } from '@/components/CTASection'

export default function Index() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Stats />
      <Products />
      <Features />
      <Testimonials />
      <CTASection />
      <RegistrationForm />
    </div>
  )
}
