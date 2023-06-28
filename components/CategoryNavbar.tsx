'use client';

import React from 'react';
import categoryData from './NavigationMenuCategories.json';
import Link from 'next/link';
import { IoChevronForwardSharp } from 'react-icons/io5';

export default function CategoryNavbar({
  currentCateogry,
}: {
  currentCateogry: string;
}) {
  const data = categoryData.NavigationMenuItems.find(
    (item) => item.href === `/${currentCateogry}`
  );
  return (
    <div className='flex flex-col'>
      {data?.items.map((item) => (
        <Link
          href={item.href}
          key={item.title}
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
  );
}
