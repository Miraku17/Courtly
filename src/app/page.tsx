import { Navbar } from "@/components/common/navbar";
import { Hero } from "@/components/common/hero";
import { WhyChoose } from "@/components/common/why-choose";
import { HowItWorks } from "@/components/common/how-it-works";
import { BookingExperiences } from "@/components/common/booking-experiences";
import { VenuePromo } from "@/components/common/venue-promo";
import { Testimonials } from "@/components/common/testimonials";
import { CTASection } from "@/components/common/cta-section";
import { Footer } from "@/components/common/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyChoose />
      <HowItWorks />
      <BookingExperiences />
      <VenuePromo />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
