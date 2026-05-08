import { About, BookingProposal, CTA, Hero, Locations, QloProposal, Reviews, Services } from '../sections';

export default function Home() {
  return (
    <>
      <Hero />
      <About compact />
      <Services />
      <Reviews />
      <Locations />
      <QloProposal />
      <BookingProposal />
      <CTA />
    </>
  );
}
