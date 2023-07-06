// @ts-nocheck

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  // create fake data with id as key
  const { cart } = await request.json();

  try {
    const stripe = new Stripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
      {
        apiVersion: '2022-11-15',
      }
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['SE'],
      },
      mode: 'payment',
      submit_type: 'pay',
         success_url:
        'https://netonnet-ecommerce-clone.vercel.app/checkout/success',
      cancel_url:
        'https://netonnet-ecommerce-clone.vercel.app/checkout/failure',
      line_items: Object.values(cart as any).map((item) => ({
        price_data: {
          currency: 'sek',

          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: [item.Image],
          },
        },
        quantity: 1,
      })),
    });

    return new Response(JSON.stringify({ id: session.id, url: session.url }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
