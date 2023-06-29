'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import IconBreadcrumbs from './Breadcrumbs';
import TextTruncate from './CategoryDescription';

import CategoryJson from './NavigationMenuCategories.json';

export default function CategoryNavbar() {
  const { Category, SubCategory } = useParams();
  const [CategoryData, setCategoryData] = useState<
    NavigationMenuItems | undefined
  >(
    CategoryJson.NavigationMenuItems.find(
      (item) => item.href === `/${Category}`
    )
  );
  const [SubCategoryData, setSubCategoryData] = useState<
    NavigationItem | undefined
  >(
    CategoryData?.items.find(
      (item) => item.href === `/${Category}/${SubCategory}`
    )
  );

  useEffect(() => {
    if (Category && SubCategory && CategoryData) {
      setSubCategoryData(
        CategoryData.items.find(
          (item) => item.href === `/${Category}/${SubCategory}`
        )
      );
    }
  }, [Category, SubCategory, CategoryData]);

  if (Category && SubCategory && SubCategoryData) {
    // UI for /Category/SubCategory
    return (
      <nav className='hidden lg:flex flex-[3] gap-5 flex-col'>
        <IconBreadcrumbs params={''} />

        <div className='flex flex-col'>
          <h1 className='text-xl font-medium'>{SubCategoryData.title}</h1>
          <TextTruncate text={SubCategoryData.description || ''} maxLines={2} />
        </div>
        <div className='flex flex-col'>
          <Link
            href={CategoryData?.href || ''}
            className='border-b hover:text-light-blue-700 hover:cursor-pointer text-gray-900 text-md items-center flex first:border-t hover:bg-white/30 border-gray-400'
          >
            <IoChevronBackSharp className='' />
            <h2 className='items-center w-full transition-transform duration-150 py-2 transform flex justify-end hover:translate-x-[-8px] focus:translate-x-[-2px]'>
              {CategoryData?.title}
            </h2>
          </Link>

          {SubCategoryData.filters?.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className='border-b hover:text-light-blue-700 hover:cursor-pointer text-gray-900 text-md items-center flex first:border-t hover:bg-white/30 border-gray-400'
            >
              <h2 className='items-center w-full transition-transform duration-150 py-2 transform hover:translate-x-2 focus:translate-x-2'>
                {item.title}
              </h2>
              <IoChevronForwardSharp className='flex justify-end' />
            </Link>
          ))}
        </div>
      </nav>
    );
  } else if (Category && CategoryData) {
    // UI for /Category
    return (
      <nav className='hidden lg:flex flex-[3] gap-5 flex-col'>
        <IconBreadcrumbs params={''} />
        <div className='flex flex-col'>
          <h1 className='text-xl font-semibold'>{CategoryData.title}</h1>
          <TextTruncate text={CategoryData.description || ''} maxLines={2} />
        </div>
        {/* Additional UI for /Category */}
        <div className='flex flex-col'>
          {CategoryData.items.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className='border-b hover:text-light-blue-700 hover:cursor-pointer text-gray-900 text-md items-center flex first:border-t hover:bg-white/30 border-gray-400'
            >
              <h2 className='items-center w-full transition-transform duration-150 py-2 transform hover:translate-x-2 focus:translate-x-2'>
                {item.title}
              </h2>
              <IoChevronForwardSharp className='flex justify-end' />
            </Link>
          ))}
        </div>
      </nav>
    );
  } else {
    // UI for other cases
    return null;
  }
}
