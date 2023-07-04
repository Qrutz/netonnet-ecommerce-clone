'use client';

import { useCartStore } from '@/stateStores/useCartStore';
import Badge from '@mui/material/Badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoBagCheckOutline } from 'react-icons/io5';

function ShoppingCart() {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className='flex gap-2 items-center space-x-2'>
      <Badge
        className=' cursor-pointer'
        badgeContent={cart.length}
        color='primary'
      >
        <AiOutlineShoppingCart className='text-3xl text-black' />
      </Badge>

      {cart.length > 0 && (
        <Link
          className=' bg-light-green-800 flex items-center font-semibold text-md  rounded-md'
          href='/checkout'
        >
          {' '}
          <span className='p-2'>TIll kassan</span>
          <IoBagCheckOutline className='text-3xl text-white' />
        </Link>
      )}
    </div>
  );
}
export default ShoppingCart;
