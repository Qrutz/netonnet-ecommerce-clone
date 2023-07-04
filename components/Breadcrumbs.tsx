'use client';

import Typography from '../utils/LibraryCompsToClientConvert/Typography';
import Breadcrumbs from '../utils/LibraryCompsToClientConvert/Breadcrumbs';
import { AiOutlineHome } from 'react-icons/ai';
import { useParams } from 'next/navigation';
import Link from 'next/link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function IconBreadcrumbs({}) {
  const segment = useParams();

  if (segment.Product) {
    // UI for /Category/SubCategory/SubSubCategory/Product
    return (
      <div role='presentation' onClick={handleClick}>
        <Breadcrumbs className='' aria-label='breadcrumb'>
          <Link className='text-light-blue-600 hover:underline' href={`/`}>
            <AiOutlineHome className='text-xl' fontSize='inherit' />
          </Link>
          <Link
            prefetch={false}
            className='text-light-blue-600 hover:underline'
            href={`art${segment.Category}`}
          >
            {segment.Category}
          </Link>
          <Link
            prefetch={false}
            className='text-light-blue-600 hover:underline'
            href={`art/${segment.Category}/${segment.SubCategory}`}
          >
            {segment.SubCategory}
          </Link>
          <Link
            prefetch={false}
            className='text-light-blue-600 hover:underline'
            href={`art/${segment.Category}/${segment.SubCategory}/${segment.SubSubCategory}`}
          >
            {segment.SubSubCategory}
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color='text.primary'
          >
            {segment.Product}
          </Typography>
        </Breadcrumbs>
      </div>
    );
  } else if (segment.SubSubCategory) {
    // UI for /Category/SubCategory/SubSubCategory
    return (
      <div role='presentation' onClick={handleClick}>
        <Breadcrumbs className='' aria-label='breadcrumb'>
          <Link
            prefetch={false}
            className='text-light-blue-600 hover:underline'
            href={`/`}
          >
            <AiOutlineHome className='text-xl' fontSize='inherit' />
          </Link>
          <Link
            prefetch={false}
            className='text-light-blue-600 hover:underline'
            href={`art${segment.Category}`}
          >
            {segment.Category}
          </Link>
          <Link
            prefetch={false}
            className='text-light-blue-600 hover:underline'
            href={`art${segment.Category}/${segment.SubCategory}`}
          >
            {segment.SubCategory}
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color='text.primary'
          >
            {segment.SubSubCategory}
          </Typography>
        </Breadcrumbs>
      </div>
    );
  } else if (segment.SubCategory) {
    // UI for /Category/SubCategory
    return (
      <div role='presentation' onClick={handleClick}>
        <Breadcrumbs className='' aria-label='breadcrumb'>
          <Link
            prefetch={false}
            className='text-light-blue-600 hover:underline'
            href={`/`}
          >
            <AiOutlineHome className='text-xl' fontSize='inherit' />
          </Link>
          <Link
            prefetch={false}
            className='text-light-blue-600 hover:underline'
            href={`art${segment.Category}`}
          >
            {segment.Category}
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color='text.primary'
          >
            {segment.SubCategory}
          </Typography>
        </Breadcrumbs>
      </div>
    );
  } else if (segment.Category) {
    // UI for /Category
    return (
      <div role='presentation' onClick={handleClick}>
        <Breadcrumbs className='' aria-label='breadcrumb'>
          <Link
            prefetch={false}
            className='text-light-blue-600 hover:underline'
            href={`/`}
          >
            <AiOutlineHome className='text-xl' fontSize='inherit' />
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color='text.primary'
          >
            {segment.Category}
          </Typography>
        </Breadcrumbs>
      </div>
    );
  } else {
    // UI for other cases
    return null;
  }
}
