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

// async function getHeroSectionData() {
//   const res = await client.fetch(getHeroSection);

//   return res;
// }

export default async function Home() {
  // const posts = await getPosts();

  // const banner = await getBanner();

  // const heroSection = await getHeroSectionData();

  // console.log(posts);

  // console.log(banner);

  // console.log(heroSection[0].title);

  return <main className='bg-red-200'></main>;
}
