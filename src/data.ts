import shopBrentwood from './assets/demilia-shop2.jpg';
import shopUpminster from './assets/demilia-hero.jpg';

export type Service = { name: string; time: string; price: string };
export type Review = { name: string; where: 'Brentwood' | 'Upminster'; body: string };
export type TeamMember = { name: string; role: string; years: string; shop: string };
export type LocationHours = { d: string; h: string };
export type Location = {
  id: 'brentwood' | 'upminster';
  slug: 'brentwoodsalon' | 'upminstersalon';
  name: string;
  short: string;
  address: string;
  phone: string;
  phoneHref: string;
  mapsHref: string;
  image: string;
  headline: string;
  where: string;
  travel: string;
  parking: string;
  hours: LocationHours[];
};

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about-us' },
  { label: 'Salons', to: '/brentwoodsalon', children: [
    { label: 'Brentwood', to: '/brentwoodsalon' },
    { label: 'Upminster', to: '/upminstersalon' },
  ] },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact-us' },
] as const;

export const SERVICES: Service[] = [
  { name: 'Skin Fade', time: '30 min', price: '£22' },
  { name: 'Classic Gentleman Cut', time: '30 min', price: '£20' },
  { name: 'Cut & Beard Sculpt', time: '45 min', price: '£30' },
  { name: 'Hot Towel Cut-Throat Shave', time: '40 min', price: '£30' },
  { name: 'Beard Trim & Line-Up', time: '20 min', price: '£15' },
  { name: 'Father & Son (under 12)', time: '45 min', price: '£32' },
];

export const REVIEWS: Review[] = [
  {
    name: 'James W.',
    where: 'Brentwood',
    body: 'Best fade in Essex, no question. Arnie has been cutting my hair for six years and somehow keeps getting sharper.',
  },
  {
    name: 'Marco P.',
    where: 'Upminster',
    body: 'Walked out feeling ten years younger. The hot towel cut-throat shave is worth the trip alone.',
  },
  {
    name: 'Daniel K.',
    where: 'Brentwood',
    body: 'My boy was nervous for his first proper cut. They had him laughing in two minutes. Booked the whole family in.',
  },
];

export const TEAM: TeamMember[] = [
  { name: 'Arnie De’Milia', role: 'Master barber, founder', years: 'Since 2004', shop: 'Both salons' },
  { name: 'Marco Russo', role: 'Senior barber, fades & line-ups', years: '22 years', shop: 'Brentwood' },
  { name: 'Sal Ricci', role: 'Senior barber, classic cuts', years: '24 years', shop: 'Upminster' },
  { name: 'Leo De’Milia', role: 'Barber, beard work', years: '9 years', shop: 'Upminster' },
];

export const TIMES = ['09:30', '10:15', '11:00', '12:30', '14:15', '15:00', '16:45', '17:30'];

export const LOCATIONS: Location[] = [
  {
    id: 'brentwood',
    slug: 'brentwoodsalon',
    name: 'Brentwood Salon',
    short: 'Brentwood',
    address: '23a Ongar Road, Brentwood, Essex, CM15 9AU',
    phone: '01277 200008',
    phoneHref: 'tel:01277200008',
    mapsHref: 'https://www.google.com/maps/dir/?api=1&destination=23A%20Ongar%20Rd,%20Brentwood%20CM15%209AU,%20UK',
    image: shopBrentwood,
    headline: 'The highest-rated salon in Brentwood.',
    where: 'Top of the High Street on Ongar Road (A128), opposite Sainsbury’s.',
    travel: 'Brentwood station is a 15 minute walk.',
    parking: 'Sainsbury’s car park opposite, or William Hunter Way (5 minute walk).',
    hours: [
      { d: 'Mon to Tue', h: '9:00 - 18:30' },
      { d: 'Wednesday', h: '9:00 - 19:30' },
      { d: 'Thu to Fri', h: '9:00 - 18:30' },
      { d: 'Saturday', h: '8:30 - 17:30' },
      { d: 'Sunday', h: 'Closed' },
    ],
  },
  {
    id: 'upminster',
    slug: 'upminstersalon',
    name: 'Upminster Salon',
    short: 'Upminster',
    address: '164b Upminster Road, Upminster, Essex, RM14 2RB',
    phone: '01708 440144',
    phoneHref: 'tel:01708440144',
    mapsHref: 'https://www.google.com/maps/place/164B+Upminster+Rd,+Upminster+RM14+2RB',
    image: shopUpminster,
    headline: 'The original. Where Arnie opened the doors.',
    where: 'Upminster Bridge, opposite the Windmill Pub, next to Co-Op.',
    travel: 'Upminster Bridge station is a 2 minute walk; Upminster Station is 10 minutes.',
    parking: 'Two spaces directly outside the shop, or 2 hours free at Co-Op next door.',
    hours: [
      { d: 'Mon to Wed', h: '9:00 - 18:30' },
      { d: 'Thursday', h: '9:00 - 19:30' },
      { d: 'Friday', h: '9:00 - 18:30' },
      { d: 'Saturday', h: '8:30 - 17:30' },
      { d: 'Sunday', h: 'Closed' },
    ],
  },
];

export function classNames(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export function getNextDays(count: number) {
  const out: { iso: string; label: string; weekday: string; day: number; closed: boolean }[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const closed = d.getDay() === 0;
    out.push({
      iso: d.toISOString().slice(0, 10),
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-GB', { weekday: 'short' }),
      weekday: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      day: d.getDate(),
      closed,
    });
  }
  return out;
}
