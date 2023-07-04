import CheckoutCartList from '@/components/CheckoutCartList';
import React from 'react';

import { PiShoppingCartBold } from 'react-icons/pi';

export default function page() {
  return (
    <div className='p-6 bg-white text-black'>
      <span className='flex py-4 border-b border-gray-300 gap-4 items-center'>
        <PiShoppingCartBold className='text-4xl  ' />
        <h2 className='text-lg font-medium'>Kundvagn</h2>
      </span>

      <CheckoutCartList />
    </div>
  );
}
