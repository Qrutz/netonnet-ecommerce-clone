'use client';

import { useCartStore } from '@/app/stateStores/useCartStore';
import Badge from '@mui/material/Badge';
import { useRouter } from 'next/navigation';

import { AiOutlineShoppingCart } from 'react-icons/ai';

function ShoppingCart() {
  const cart = useCartStore((state) => state.cart);
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

    const id = session.id;
    const url = session.url;

    router.push(url);
  }
  return (
    <>
      <Badge
        className=' cursor-pointer'
        badgeContent={cart.length}
        color='primary'
      >
        <AiOutlineShoppingCart className='text-3xl text-black' />
      </Badge>

      <button onClick={createStripeSession}>Checkout</button>
    </>
  );
}
export default ShoppingCart;
