'use client';

import React from 'react';
import Skeleton from '../utils/LibraryCompsToClientConvert/Skeleton';

const SkeletonComponent = ({}) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <Skeleton variant='text' width={200} height={20} />
        <Skeleton variant='text' width={180} height={16} />
      </div>

      <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
        <Skeleton variant='rectangular' width={280} height={320} />
        <Skeleton variant='rectangular' width={280} height={320} />
        <Skeleton variant='rectangular' width={280} height={320} />
      </div>

      <div className='flex flex-col gap-2'>
        <Skeleton variant='text' width={180} height={16} />
        <Skeleton variant='text' width={120} height={16} />
      </div>
    </div>
  );
};

export default SkeletonComponent;
