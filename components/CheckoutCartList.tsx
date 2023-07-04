'use client';

import { useCartStore } from '@/stateStores/useCartStore';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function CheckoutCartList() {
  const cart = useCartStore((state) => state.cart);
  const total = cart.map((item) => item.price).reduce((a, b) => a + b, 0);
  const router = useRouter();

  async function createStripeSession() {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    });
    const session = await response.json();

    const url = session.url;

    router.push(url);
  }
  return (
    <div className='flex flex-col gap-2'>
      {cart.map((item) => {
        return (
          <div
            className='flex  border-b py-4 border-gray-300 justify-between items-center'
            key={item.id}
          >
            <div className='flex gap-2 items-center'>
              <img width={80} src={item.Image} alt='' />
              <div className='flex flex-col gap-2'>
                <span>{item.name}</span>
                <span className='text-gray-500'>Art.nr: {item.id}</span>
              </div>
            </div>

            <span className='item-center font-semibold text-3xl text-red-600 '>
              {item.price.toLocaleString('sv-SE')}:-
            </span>
          </div>
        );
      })}
      <div className='flex justify-end p-4 gap-2  items-center border-b border-gray-300'>
        <span className='text-2xl font-semibold'>Totalpris:</span>
        <span className='text-2xl text-red-600 font-semibold'>
          {total.toLocaleString('sv-Se')}:-
        </span>
      </div>

      <div className='flex justify-center py-5'>
        <button
          onClick={createStripeSession}
          className='bg-light-blue-600 text-white text-3xl font-semibold px-8 py-4 rounded-md'
        >
          {' '}
          Betala med Stripe
        </button>
      </div>
    </div>
  );
}
