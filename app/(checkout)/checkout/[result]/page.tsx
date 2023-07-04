import Link from 'next/link';
import React from 'react';

export default function page({ params }: { params: { result: string } }) {
  return (
    <div className=' justify-center text-black font-semibold items-center flex p-9'>
      {params.result === 'success' ? (
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-4xl font-semibold'>Tack för din beställning!</h1>
          <p className='text-lg'>
            Din order är nu mottagen och kommer att behandlas inom kort.
          </p>
          <Link className='text-lg underline' href='/'>
            Tillbaka till startsidan
          </Link>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-4xl font-semibold'>Något gick fel!</h1>
          <p className='text-lg'>
            Din order är inte mottagen, vänligen försök igen.
          </p>
          <Link className='text-lg underline' href='/'>
            Tillbaka till startsidan
          </Link>
        </div>
      )}
    </div>
  );
}
