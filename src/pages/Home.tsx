import { About, BookingProposal, BrandMarquee, CTA, Hero, Locations, PullQuote, QloProposal, Reviews, Services } from '../sections';

export default function Home() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <About compact />
      <Services />
      <PullQuote />
      <Reviews />
      <Locations />
      <QloProposal />
      <BookingProposal />
      <CTA />
    </>
  );
}
