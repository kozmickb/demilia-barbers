import { About, BookingProposal, CTA, Hero, Locations, PullQuote, QloProposal, Reviews, Services } from '../sections';

export default function Home() {
  return (
    <>
      <Hero />
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
