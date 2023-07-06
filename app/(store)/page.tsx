import HeroCarousel from '@/components/HeaderCarousel';
import PromotionalCarousel from '@/components/PromotionalCarousel';

import { getHeroSection } from '@/sanity/helpers/queries';
import { client, clientFetch } from '@/sanity/lib/client';
import Link from 'next/link';

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
  const res = await clientFetch(getHeroSection);

  return res;
}

async function getPromotionData() {
  const res = await clientFetch(`*[_type == 'page' && title == 'Homepage'][0] {
    promotionSection {
      carousel[]-> {
          _id,
        title,
        slug {
          current
        },
        Category->{
          slug {
            current
          }
        },
        subcategory->{slug{current}},
        subsubcategory->{slug{current}},
        CardName,
        bulletPoints[],
        Images[]{_key, asset->{url}},
        ArtikelNummer,
        details
        
        
      },
      adBoxes[]  {
        Link,
        "imageUrl": Image.asset->url
      },
  
    }   
  }`);
  return res;
}

interface CarouselItem {
  asset: {
    url: string;
  };
}

export default async function Home() {
  const heroSection = await getHeroSectionData();

  return (
    <main className='gap-6 flex flex-col'>
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

      <section className='flex flex-col  bg-white p-4'>
        <span className='p-2 text-lg md:text-2xl font-semibold text-black'>
          {heroSection.promotionSection.title}
        </span>

        <PromotionalCarousel items={heroSection.promotionSection.carousel} />
      </section>

      <section className='flex gap-2 w-full'>
        <Link
          className='flex-[5]  max-w-[50%] '
          href={heroSection.adBoxes[0].Link}
        >
          <img
            className='-auto object-cover'
            src={heroSection.adBoxes[0].imageUrl}
            alt=''
          />
        </Link>
        <Link
          className='flex-[5] max-w-[50%] '
          href={heroSection.adBoxes[1].Link}
        >
          <img
            className=' h-auto object-cover'
            src={heroSection.adBoxes[1].imageUrl}
            alt=''
          />
        </Link>
      </section>

      <section className='flex flex-col  bg-white p-4'>
        <span className='p-2 text-lg md:text-2xl font-semibold text-black'>
          {heroSection.FeaturedProductsSection.title}
        </span>

        <PromotionalCarousel
          items={heroSection.FeaturedProductsSection.carousel}
        />
      </section>
    </main>
  );
}
