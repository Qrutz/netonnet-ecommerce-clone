'use client';

import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import React from 'react';

interface LabelProps {
  message: string;
  type: string;
  link: string;
}

export function HeaderLabel({ message, type, link }: LabelProps) {
  // map over labels and if the label type is 'warning' make the bg red, if the label type is 'promotional' make it yellow
  if (type === 'warning') {
    return (
      <Link
        href={link}
        className='bg-red-200 flex justify-center items-center '
      >
        {/* Label container */}
        <div className='text-red-700 font-medium text-sm   flex justify-between p-2'>
          {/* Label text */}
          {message}
        </div>
      </Link>
    );
  } else if (type === 'promotional') {
    return (
      <Link
        href={link}
        className='bg-amber-500 flex justify-center items-center '
      >
        {/* Label container */}
        <div className='text-black font-bold text-sm   flex justify-between p-2'>
          {/* Label text */}
          {message}
        </div>
      </Link>
    );
  } else {
    return (
      <Link
        href={link}
        className='bg-gray-200 flex justify-center items-center '
      >
        {/* Label container */}
        <div className='text-gray-700 font-medium text-sm   flex justify-between p-2'>
          {/* Label text */}
          {message}
        </div>
      </Link>
    );
  }
}

export default HeaderLabel;
