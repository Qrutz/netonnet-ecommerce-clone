import IconBreadcrumbs from '@/components/Breadcrumbs';
import { IoChevronForwardSharp } from 'react-icons/io5';
import { RiArrowGoForwardFill } from 'react-icons/ri';
import categoryData from '../../components/NavigationMenuCategories.json';
import Link from 'next/link';

export default function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { Category: string };
}) {
  const data = categoryData.NavigationMenuItems.find(
    (item) => item.href === `/${params.Category}`
  );

  return (
    <section className='flex text-black gap-5 bg-gray-300 pt-1'>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className='hidden lg:flex flex-[3] gap-3 flex-col '>
        <IconBreadcrumbs params={params.Category} />
        <span>
          {' '}
          <h1 className='text-xl font-semibold'>{params.Category}</h1>{' '}
          <p className='text-sm text-gray-700'> KategoriBeskrivning</p>
        </span>

        <div className='flex flex-col'>
          {data?.items.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className='border-b hover:text-light-blue-700 hover:cursor-pointer text-gray-900 text-md items-center flex  first:border-t hover:bg-white/30  border-gray-400'
            >
              <h2 className=' items-center    w-full transition-transform duration-150 py-2 transform hover:translate-x-2 focus:translate-x-2'>
                {' '}
                {item.title}
              </h2>
              <IoChevronForwardSharp className='flex justify-end ' />
            </Link>
          ))}
        </div>
      </nav>

      <main className='flex-[8] w-full '>{children}</main>
    </section>
  );
}
