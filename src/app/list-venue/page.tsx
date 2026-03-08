import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { VenueListingHero } from "@/components/common/venue-listing-hero";
import { VenueListingSteps } from "@/components/common/venue-listing-steps";
import { VenueListingForm } from "@/components/common/venue-listing-form";

export default function ListVenuePage() {
  return (
    <main>
      <Navbar />
      <VenueListingHero />
      <VenueListingSteps />
      <VenueListingForm />
      <Footer />
    </main>
  );
}
