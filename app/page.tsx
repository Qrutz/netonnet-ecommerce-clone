import HeroCarousel from '@/components/HeaderCarousel';

import { getHeroSection } from '@/sanity/helpers/queries';
import { client } from '@/sanity/lib/client';

import { Suspense } from 'react';

// async function getPosts() {
//   const res = await client.fetch(postquery);

//   return res;
// }

// async function getBanner() {
//   const res = await client.fetch(getPromotionalBanner);

//   return res;
// }

async function getHeroSectionData() {
  const res = await client.fetch(getHeroSection);

  return res;
}

interface CarouselItem {
  asset: {
    url: string;
  };
}

export default async function Home() {
  // const posts = await getPosts();

  // const banner = await getBanner();

  const heroSection = await getHeroSectionData();

  return (
    <section className='flex flex-col  lg:flex-row gap-2 z-0'>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroCarousel>
          {heroSection.heroSection.carousel.map((item: CarouselItem) => (
            <img
              key={item.asset.url}
              className='h-full w-full object-cover'
              src={item.asset.url}
              alt='hero'
            />
          ))}
        </HeroCarousel>

        <div className='grid grid-cols-3 gap-1 lg:flex  lg:flex-[2] lg:flex-col'>
          <img
            key={heroSection.heroSection.Boxes[0].asset.url}
            className=' object-cover lg:h-1/3'
            src={heroSection.heroSection.Boxes[0].asset.url}
            alt=''
          />
          <img
            key={heroSection.heroSection.Boxes[1].asset.url}
            className='  lg:h-1/3 '
            src={heroSection.heroSection.Boxes[1].asset.url}
            alt=''
          />
          <img
            key={heroSection.heroSection.Boxes[2].asset.url}
            className=' lg:h-1/3 '
            src={heroSection.heroSection.Boxes[2].asset.url}
            alt=''
          />
        </div>
      </Suspense>
    </section>
  );
}
