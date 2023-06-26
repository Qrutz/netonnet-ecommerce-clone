'use client';

import { Carousel } from '@material-tailwind/react';

interface CarouselProps {
  children: React.ReactNode;
}

export default function HeroCarousel({ children }: CarouselProps) {
  return <Carousel className='rounded-md  flex-[8]'>{children}</Carousel>;
}
