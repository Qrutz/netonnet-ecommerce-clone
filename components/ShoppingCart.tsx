'use client';

import Badge from '@mui/material/Badge';
import { useRouter } from 'next/navigation';

import { AiOutlineShoppingCart } from 'react-icons/ai';

const ShoppingCart: React.FC = () => {
  const router = useRouter();

  async function createStripeSession() {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: 1 }),
    });
    const session = await response.json();

    const id = session.id;
    const url = session.url;

    router.push(url);
  }
  return (
    <>
      <Badge className=' cursor-pointer' badgeContent={0} color='primary'>
        <AiOutlineShoppingCart
          onClick={createStripeSession}
          className='text-3xl text-black'
        />
      </Badge>
    </>
  );
};
export default ShoppingCart;
