'use client';

import Rating from '@material-tailwind/react/components/Rating';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

export default function RatingComponent() {
  const segment = useSelectedLayoutSegment();

  console.log(segment);
  return (
    <>
      <Rating title='disabled' value={5} />
    </>
  );
}
