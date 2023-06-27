'use client';

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { RiXboxFill, RiXingFill, RiXingLine } from 'react-icons/ri';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

interface IconBreadcrumbsProps {
  params: string;
}

export default function IconBreadcrumbs({ params }: IconBreadcrumbsProps) {
  return (
    <div role='presentation' onClick={handleClick}>
      <Breadcrumbs className='' aria-label='breadcrumb'>
        <Link
          underline='hover'
          sx={{ display: 'flex', alignItems: 'center' }}
          color='inherit'
          href='/'
        >
          <AiOutlineHome className='text-xl' fontSize='inherit' />
        </Link>
        <h3 className='text-md' color='inherit'>
          {params}
        </h3>
        {/* <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color='text.primary'
        >
          <RiXingFill fontSize='inherit' />
          Breadcrumb
        </Typography> */}
      </Breadcrumbs>
    </div>
  );
}
