'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { clientFetch } from '@/sanity/lib/client';

interface props {
  children: React.ReactNode;
  total?: number;
}

export default function FilterProductsComponent({ children, total }: props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultSortStrategy = 'recomended';
  const defaultPageSize = 3;

  const sortStrategyParam = searchParams.get('sort');
  const pageSizeParam = searchParams.get('pageSize');
  // const currentPageParam = searchParams.get('page');

  const [sortStrategy, setSortStrategy] = React.useState(
    sortStrategyParam || defaultSortStrategy
  );
  const [pageSize, setPageSize] = React.useState(
    pageSizeParam || defaultPageSize
  );
  // const [currentPage, setCurrentPage] = React.useState(
  //   Number(currentPageParam) || 1
  // );

  function handleSortChange(event: SelectChangeEvent) {
    const selectedSortStrategy = event.target.value;
    setSortStrategy(selectedSortStrategy);
    router.push(`?sort=${selectedSortStrategy}&pageSize=${pageSize}`);
  }

  function handlePageSizeChange(event: SelectChangeEvent) {
    const selectedPageSize = event.target.value;
    setPageSize(selectedPageSize);
    router.push(`?sort=${sortStrategy}&pageSize=${selectedPageSize}`);
  }

  function CalculatePerPages() {
    if (!total) {
      return NaN;
    }

    return total / Number(pageSize);
  }

  return (
    <div className='flex flex-col gap-4' style={{ maxWidth: '100%' }}>
      <div
        className='flex flex-col md:flex-row justify-between items-center'
        style={{ flexWrap: 'wrap' }}
      >
        <span
          className='text-gray-700 text-sm'
          style={{ maxWidth: '100%', marginBottom: '0.5rem' }}
        >
          Visar <span className='text-gray-800 font-semibold'>{total} </span>
          produkter på&nbsp;
          <span className='text-gray-800 font-semibold'>
            {CalculatePerPages()}&nbsp;
          </span>
          sidor.
        </span>

        <span
          className='flex flex-col md:flex-row gap-2'
          style={{ maxWidth: '100%', marginBottom: '0.5rem' }}
        >
          <div className='flex items-center gap-2'>
            <span
              className='text-gray-700 text-sm'
              style={{ whiteSpace: 'nowrap' }}
            >
              Antal produkter per sida:
            </span>
            <FormControl sx={{ minWidth: 50, background: 'white' }}>
              <Select
                labelId='demo-simple-select-helper-label'
                value={pageSize.toString()}
                onChange={handlePageSizeChange}
                sx={{ height: '30px' }}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={9}>9</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className='flex items-center gap-2'>
            <span
              className='text-gray-700 text-sm'
              style={{ whiteSpace: 'nowrap' }}
            >
              Sortera efter:
            </span>
            <FormControl sx={{ minWidth: 170, background: 'white' }}>
              <Select
                labelId='demo-simple-select-helper-label'
                value={sortStrategy}
                onChange={handleSortChange}
                sx={{ height: '30px' }}
              >
                <MenuItem disabled value={'recomended'}>
                  Rekommenderat
                </MenuItem>
                <MenuItem disabled value={'Betyg'}>
                  Betyg
                </MenuItem>
                <MenuItem value={'price_asc'}>Pris, lägst först</MenuItem>
                <MenuItem value={'price_desc'}>Pris, högst först</MenuItem>
                <MenuItem value={'name_asc'}>Namn, A-Ö</MenuItem>
                <MenuItem value={'name_desc'}>Namn, Ö-A</MenuItem>
              </Select>
            </FormControl>
          </div>
        </span>
      </div>
      {children}
    </div>
  );
}
