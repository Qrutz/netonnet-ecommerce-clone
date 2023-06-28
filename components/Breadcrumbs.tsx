'use client';

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { RiXboxFill, RiXingFill, RiXingLine } from 'react-icons/ri';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { useParams } from 'next/navigation';
import Link from 'next/link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

interface IconBreadcrumbsProps {
  params: string;
}

export default function IconBreadcrumbs({ params }: IconBreadcrumbsProps) {
  const segment = useParams();

  return (
    <div role='presentation' onClick={handleClick}>
      <Breadcrumbs className='' aria-label='breadcrumb'>
        <Link className='text-light-blue-600 hover:underline' href={`/`}>
          <AiOutlineHome className='text-xl' fontSize='inherit' />
        </Link>
        {segment.SubCategory ? (
          <Link
            className='text-light-blue-600 hover:underline'
            href={`/${segment.Category}`}
          >
            {segment.Category}
          </Link>
        ) : (
          <h3 className='text-md' color='inherit'>
            {segment.Category}
          </h3>
        )}

        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color='text.primary'
        >
          {segment.SubCategory || null}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
