import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  // create fake data with id as key
  const fakedata = {
    '1015638': {
      name: 'Apple MacBook Air 256GB M1 chip with 8-core CPU and 7-core GPU Space Grey (MGN63KS/A) ',
      price: 11990,
      Image:
        'https://cdn.sanity.io/images/o4too961/production/d22e05e175e8d7ed0c915e0978da33bd149cd61f-355x289.webp',
      id: '1015638',
      quantity: 1,
      value: 11990,
      price_data: {},
      product_data: {},
      formattedValue: '119,90 kr',
      formattedPrice: '119,90 kr',
    },
    '1029368': {
      name: 'Medion ERAZER DEPUTY P25 (MD62343) ',
      price: 8990,
      Image:
        'https://cdn.sanity.io/images/o4too961/production/a4ecd698ea723c3e8936634e4029247dc9b8dc3b-355x289.webp',
      id: '1029368',
      quantity: 1,
      value: 8990,
      price_data: {},
      product_data: {},
      formattedValue: '89,90 kr',
      formattedPrice: '89,90 kr',
    },
  };

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
        'http://localhost:3000/session/session_id={CHECKOUT_SESSION_ID}',
      cancel_url:
        'http://localhost:3000/session/?success=false?session_id={CHECKOUT_SESSION_ID}',
      line_items: Object.values(fakedata as any).map((item) => ({
        price_data: {
          currency: 'sek',

          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            description: item.description,
            images: [item.Image],
          },
        },
        quantity: item.quantity,
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
