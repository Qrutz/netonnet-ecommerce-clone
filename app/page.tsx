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
    <main className='pt-4'>
      <section className='flex lg:flex-row gap-2  flex-col'>
        <HeroCarousel>
          {heroSection.heroSection.carousel.map((item: CarouselItem) => (
            <img
              className='h-full w-full object-cover'
              src={item.asset.url}
              alt='hero'
            />
          ))}
        </HeroCarousel>

        <div className='flex  flex-col  flex-grow md:flex-row md:gap-2 lg:gap-0 lg:items-start md:items-center space-y-2   lg:pt-0  lg:flex-col '>
          <img
            src={heroSection.heroSection.Boxes[0].asset.url}
            className='lg:h-[116px] md:h-[100px] h-[60px] md:w-1/3  lg:w-[293px] cursor-pointer w-full    bg-white shadow-xs shadow-black items-center flex justify-center text-lg text-center text-black '
          />
          <div className='flex lg:flex-col md:space-x-5 space-x-2 lg:space-y-2 lg:space-x-0 md:w-2/3 lg:w-auto'>
            <img
              src={heroSection.heroSection.Boxes[1].asset.url}
              className='lg:h-[116px] md:h-[100px]  lg:w-[293px] h-[50px] cursor-pointer md:w-auto w-1/2 bg-white shadow-xs shadow-black items-center flex justify-center text-lg text-center text-black '
            />
            <img
              src={heroSection.heroSection.Boxes[2].asset.url}
              className='lg:h-[116px]  md:h-[100px] h-[50px] lg:w-[293px] cursor-pointer md:w-auto w-1/2 bg-white shadow-xs shadow-black items-center flex justify-center text-lg text-center text-black '
            />
          </div>
        </div>
      </section>
    </main>
  );
}
