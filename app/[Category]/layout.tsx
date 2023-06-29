import IconBreadcrumbs from '@/components/Breadcrumbs';
import { IoChevronForwardSharp } from 'react-icons/io5';
import { RiArrowGoForwardFill } from 'react-icons/ri';
import categoryData from '../../components/NavigationMenuCategories.json';
import Link from 'next/link';
import TextTruncate from '@/components/CategoryDescription';
import { client } from '@/sanity/lib/client';
import { getCategoryByParams } from '@/sanity/helpers/queries';
import CategoryNavbar from '@/components/CategoryNavbar';
import { Suspense } from 'react';

export default function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { Category: string };
}) {
  // fix general name later

  return (
    <section className='flex text-black gap-5 bg-gray-300 pt-1'>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Suspense fallback={<div className='bg-red-600'>Loading nav</div>}>
        <nav className='hidden lg:flex flex-[3] gap-3 flex-col '>
          <IconBreadcrumbs params={params.Category} />
          <span className=' '>
            {' '}
            <h1 className='text-xl font-semibold'>{''}</h1>{' '}
            <TextTruncate text={''} maxLines={2} />
          </span>

          <CategoryNavbar currentCateogry={params.Category} />
        </nav>
      </Suspense>

      <main className='flex-[8] w-full '>{children}</main>
    </section>
  );
}
