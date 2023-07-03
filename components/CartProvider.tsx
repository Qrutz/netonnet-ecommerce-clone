'use client';

import { CartProvider as USCProvider } from 'use-shopping-cart';

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <USCProvider
      shouldPersist={true}
      cartMode='checkout-session'
      stripe={
        'pk_test_51NPRqkDpSfGkQqlP8tCebECjPqaQz4rC3HZ2kdJcEUHrlhWBSjEorhinqwRUyD4gZM3GnL2muH3rmZ53Oru1OSVY008Ox0zwtp'
      }
      currency='SEK'
    >
      {children}
    </USCProvider>
  );
}
