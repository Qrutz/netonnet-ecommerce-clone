'use client';

import React, { useRef, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Product from './Product';
import { Transition } from '@headlessui/react';

interface CarouselProps {
  items: Product[];
}
const PromotionalCarousel: React.FC<CarouselProps> = ({ items }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    setScrollPosition(scrollPosition + 1);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left:
          containerRef.current.scrollLeft + containerRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollLeft = () => {
    setScrollPosition(scrollPosition - 1);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left:
          containerRef.current.scrollLeft - containerRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const renderItems = () => {
    const visibleItems = items.slice(scrollPosition, scrollPosition + 5);

    return visibleItems.map((item, index) => (
      <Product key={index} showAddToCart={false} product={item} />
    ));
  };

  return (
    <div className='w-full text-black relative overflow-hidden'>
      <div
        className='flex gap-2 transition-transform ease-in-out duration-4000'
        style={{ transform: `translateX(-${scrollPosition * 15}%)` }}
        ref={containerRef}
      >
        {renderItems()}
      </div>
      <button
        className={`bg-light-blue-500 hover:bg-light-blue-900 text-white text-3xl h-[90px] w-[30px] absolute left-0 top-1/2 transform -translate-y-1/2 ${
          scrollPosition === 0 ? 'hidden' : ''
        }`}
        onClick={handleScrollLeft}
      >
        &lt;
      </button>
      <button
        className={`absolute bg-light-blue-500 hover:bg-light-blue-900 text-white text-3xl h-[90px] w-[30px] right-0 top-1/2 transform -translate-y-1/2 ${
          scrollPosition >= items.length - 5 ? 'hidden' : ''
        }`}
        onClick={handleScrollRight}
      >
        &gt;
      </button>
    </div>
  );
};

export default PromotionalCarousel;
