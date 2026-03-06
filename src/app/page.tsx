import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyChoose from '@/components/WhyChoose';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyChoose />
      <HowItWorks />
      <Features />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
