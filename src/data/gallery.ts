export type GalleryImage = {
  id: string;
  thumb: string;
  full: string;
  ratio: 'square' | 'portrait' | 'landscape';
  alt: string;
};

const wix = (slug: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${slug}/v1/fill/w_${w},h_${h},al_c,q_85,enc_avif,quality_auto/${slug}`;

const wixFull = (slug: string) =>
  `https://static.wixstatic.com/media/${slug}/v1/fill/w_1600,h_1600,al_c,q_90,enc_avif,quality_auto/${slug}`;

const RAW: Array<{ slug: string; ratio: GalleryImage['ratio']; alt: string }> = [
  { slug: 'c4175c_9b2ad42f4dea490f986371371f88b3f7~mv2.png', ratio: 'square', alt: 'De’Milia barber finishing a sharp skin fade' },
  { slug: 'c4175c_9c0314e220b841f0a4a8a4ecb99e87f0~mv2.png', ratio: 'portrait', alt: 'Brentwood salon interior, leather chair detail' },
  { slug: 'c4175c_da9d7d0f0a7e4d3895b419f22c071eea~mv2.png', ratio: 'square', alt: 'Upminster salon shopfront at dusk' },
  { slug: 'c4175c_0aa8f953104a43b29a3725bea0433580~mv2.png', ratio: 'portrait', alt: 'Classic gentleman cut, finished styling' },
  { slug: 'c4175c_d966a70772ed4766b9774999c82807cf~mv2.png', ratio: 'square', alt: 'Beard sculpt and line-up close up' },
  { slug: 'c4175c_5eeb9958f7284d2f91e43f29af82ed8d~mv2.png', ratio: 'portrait', alt: 'Hot towel cut-throat shave in progress' },
  { slug: 'c4175c_9b2187c7d13c48fa9040551fbe5269df~mv2.png', ratio: 'square', alt: 'Father and son haircut day' },
  { slug: 'c4175c_ab48b10c437f4daa867e03a14383463e~mv2.png', ratio: 'portrait', alt: 'Tony at the chair, mid-cut' },
  { slug: 'c4175c_9c1c7d28249640d09c828ee7faeaa9b0~mv2.png', ratio: 'portrait', alt: 'Side profile of a fresh skin fade' },
  { slug: 'c4175c_31561a56bc094a13b6b55e79b1ae4e04~mv2.png', ratio: 'square', alt: 'Tools of the trade laid out at the station' },
  { slug: 'c4175c_a48c3b5f183b4da082780155d7c0d852~mv2.jpg', ratio: 'portrait', alt: 'Crisp line-up after a beard trim' },
  { slug: 'c4175c_c860c1d375b04c90b4b823936cb625d9~mv2.jpg', ratio: 'square', alt: 'Senior barber at work, Brentwood salon' },
  { slug: 'c4175c_5f26072820b24fbab20286e69114bd56~mv2.jpg', ratio: 'portrait', alt: 'Textured top with a clean fade on the sides' },
  { slug: 'c4175c_070dbc599926413296b1cdca47ac2532~mv2.jpg', ratio: 'square', alt: 'Quick refresh between appointments' },
  { slug: 'c4175c_0b1404a9c6d24921b1c21cdcda1a2cb4~mv2.jpg', ratio: 'portrait', alt: 'Modern tapered cut, finished styling' },
  { slug: 'c4175c_9d459fda713245d89dad3fb9be4cce5d~mv2.jpg', ratio: 'square', alt: 'Classic Italian short back and sides' },
  { slug: 'c4175c_5f91c48718734a3da8754267c3b17901~mv2.jpg', ratio: 'portrait', alt: 'Style detail, comb-over with a hard parting' },
  { slug: 'c4175c_97f00d899fc14110a9ff4985e5f83f3d~mv2.jpg', ratio: 'landscape', alt: 'Brentwood salon, full interior view' },
  { slug: 'c4175c_63c0d1426af44f63912d160bf2043eaa~mv2.jpg', ratio: 'portrait', alt: 'Final mirror check with the client' },
  { slug: 'c4175c_ee05a72f608448edafb0cbe35c1d38d4~mv2.jpg', ratio: 'square', alt: 'Close shave detail, neckline finish' },
  { slug: 'c4175c_ab2072e1aa494b018add96e73fc9cd1f~mv2.jpg', ratio: 'portrait', alt: 'Younger client, kid’s cut day' },
  { slug: 'c4175c_8c07758ae2654d909bb2ad71bd92eb47~mv2.jpg', ratio: 'square', alt: 'Salon detail, vintage barber pole' },
  { slug: 'c4175c_e5f64d1ae2fa4fa79f0fb377233dcf0f~mv2.jpg', ratio: 'portrait', alt: 'Sharp slick-back, finished with pomade' },
  { slug: 'c4175c_1a9d29cdd7b74630beea9d823238bc63~mv2.jpg', ratio: 'square', alt: 'Customer mid-laugh during a cut' },
];

const dimsFor = (ratio: GalleryImage['ratio']) => {
  if (ratio === 'square') return { w: 800, h: 800 };
  if (ratio === 'portrait') return { w: 800, h: 1066 };
  return { w: 1066, h: 800 };
};

export const GALLERY: GalleryImage[] = RAW.map((r, i) => {
  const d = dimsFor(r.ratio);
  return {
    id: `g${i + 1}`,
    thumb: wix(r.slug, d.w, d.h),
    full: wixFull(r.slug),
    ratio: r.ratio,
    alt: r.alt,
  };
});
