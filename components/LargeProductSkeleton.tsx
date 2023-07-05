'use client';

import { Skeleton } from '@mui/material';

const ProductCardSkeleton = () => {
  return (
    <div className='  shadow flex'>
      <div className='flex-[8] flex-col space-y-2'>
        <Skeleton
          variant='rectangular'
          className='w-full h-full'
          animation='wave'
        />
      </div>
      <div className='flex-[2] pt-2 flex-col space-y-2'>
        <Skeleton variant='text' width={150} height={20} animation='wave' />
        <div className='bg-gray-300/50 flex-col flex'>
          <div className='p-4 flex-col flex'>
            <span className='flex items-center justify-center'>
              <Skeleton
                variant='text'
                width={100}
                height={40}
                animation='wave'
              />
              <span className='flex-col flex justify-center'>
                <Skeleton
                  variant='text'
                  width={80}
                  height={20}
                  animation='wave'
                />
                <Skeleton
                  variant='text'
                  width={80}
                  height={20}
                  animation='wave'
                />
              </span>
            </span>
          </div>
          <div className='bg-light-blue-300/40 leading-tight p-2 text-sm'>
            <Skeleton
              variant='text'
              width='100%'
              height={60}
              animation='wave'
            />
          </div>
        </div>
        <Skeleton variant='text' width={150} height={20} animation='wave' />
        <div className='border border-gray-300 text-sm p-2'>
          <Skeleton variant='text' width='100%' height={40} animation='wave' />
        </div>
        <div className='flex gap-2 justify-stretch w-full'>
          <button className='bg-light-blue-500 hover:bg-light-blue-700 transition-colors text-white text-lg font-bold p-2 w-[70%]'>
            <Skeleton
              variant='text'
              width='100%'
              height={40}
              animation='wave'
            />
          </button>
          <button className='border-light-blue-400 hover:bg-gray-200/80 transition-colors border text-light-blue-400 text-lg w-[30%] font-bold p-2'>
            <Skeleton
              variant='text'
              width='100%'
              height={40}
              animation='wave'
            />
          </button>
        </div>
        <div className='p-2 bg-blue-gray-200 flex flex-col gap-2 text-sm text-gray-600'>
          <Skeleton variant='text' width='100%' height={40} animation='wave' />
          <Skeleton variant='text' width='100%' height={40} animation='wave' />
          <Skeleton variant='text' width='100%' height={40} animation='wave' />
        </div>
        <div className='p-2'></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
