import HeroCarousel from '@/components/HeaderCarousel';
import Example from '@/components/HeaderCarousel';
import {
  getHeroSection,
  getPromotionalBanner,
  postquery,
} from '@/sanity/helpers/queries';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';

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
    <section className='flex flex-col  lg:flex-row gap-2'>
      <HeroCarousel>
        {heroSection.heroSection.carousel.map((item: CarouselItem) => (
          <img
            className='h-full w-full object-cover'
            src={item.asset.url}
            alt='hero'
          />
        ))}
      </HeroCarousel>

      <div className='grid grid-cols-3 gap-1 lg:flex  lg:flex-[2] lg:flex-col'>
        <img
          className=' object-cover lg:h-1/3'
          src={heroSection.heroSection.Boxes[0].asset.url}
          alt=''
        />
        <img
          className='  lg:h-1/3 '
          src={heroSection.heroSection.Boxes[1].asset.url}
          alt=''
        />
        <img
          className=' lg:h-1/3 '
          src={heroSection.heroSection.Boxes[2].asset.url}
          alt=''
        />
      </div>
    </section>
  );
}
