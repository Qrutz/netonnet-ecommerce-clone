'use client';

import { BsSearch } from 'react-icons/bs';

const SearchInput: React.FC = () => {
  return (
    <div className='relative items-center '>
      <input
        type='text'
        className='w-[32rem] bg-white rounded-xl py-2 pl-[0.75rem] pr-12 text-md text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        placeholder='Sök produkter, guider och mer...'
      />
      <button className='absolute right-0 top-0 bottom-0 flex items-center justify-center px-4 bg-blue-500 text-white rounded-r-xl focus:outline-none'>
        <BsSearch className='w-6 h-6' />
      </button>
    </div>
  );
};
export default SearchInput;
