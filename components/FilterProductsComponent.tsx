'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function FilterProductsComponent() {
  const router = useRouter();
  return (
    <div className=''>
      <button
        onClick={() => router.push('?sort=name')}
        className='bg-blue-500 text-white p-2 rounded-md'
      >
        {' '}
        Sortera
      </button>

      <button
        onClick={() => router.push('?sort=price')}
        className='bg-blue-500 text-white p-2 rounded-md'
      >
        {' '}
        Sortera2
      </button>
    </div>
  );
}
