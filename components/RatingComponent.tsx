'use client';

import Rating from '@material-tailwind/react/components/Rating';
import React from 'react';

export default function RatingComponent() {
  return (
    <>
      <Rating title='disabled' value={5} />
    </>
  );
}
