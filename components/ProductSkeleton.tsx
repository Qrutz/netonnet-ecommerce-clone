'use client';

import React from 'react';
import RatingComponent from './RatingComponent';
import { Skeleton } from '@mui/material';

export default function ProductSkeleton({}: {}) {
  return (
    <div className='flex flex-col p-3'>
      <Skeleton variant='rectangular' width={300} height={220} />
      <Skeleton variant='text' width={300} height={70} />
      <Skeleton variant='text' width={300} height={45} />
      <Skeleton variant='rectangular' className='' width={300} height={20} />
      <Skeleton variant='text' className='' width={300} height={20} />
      <Skeleton variant='text' className='' width={300} height={20} />
      <Skeleton variant='text' className='' width={300} height={20} />
      <Skeleton variant='text' className='' width={300} height={20} />
      <Skeleton variant='text' className='' width={300} height={20} />
      <Skeleton variant='text' className='' width={300} height={45} />
      <Skeleton variant='rectangular' className='' width={300} height={40} />
    </div>
  );
}
