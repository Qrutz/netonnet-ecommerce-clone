'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';

export default function FilterProductsComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultSortStrategy = 'recomended';
  const defaultPageSize = 3;

  const sortStrategyParam = searchParams.get('sort');
  const pageSizeParam = searchParams.get('pageSize');
  const currentPageParam = searchParams.get('page');

  const [sortStrategy, setSortStrategy] = React.useState(
    sortStrategyParam || defaultSortStrategy
  );
  const [pageSize, setPageSize] = React.useState(
    pageSizeParam || defaultPageSize
  );
  const [currentPage, setCurrentPage] = React.useState(
    Number(currentPageParam) || 1
  );

  function handleSortChange(event: SelectChangeEvent) {
    const selectedSortStrategy = event.target.value;
    setSortStrategy(selectedSortStrategy);
    router.push(
      `?sort=${selectedSortStrategy}&pageSize=${pageSize}&page=${currentPage}`
    );
  }

  function handlePageSizeChange(event: SelectChangeEvent) {
    const selectedPageSize = event.target.value;
    setPageSize(selectedPageSize);
    router.push(
      `?sort=${sortStrategy}&pageSize=${selectedPageSize}&page=${currentPage}`
    );
  }

  function handlePageChange() {
    const alteredPage = Number(currentPage) + 1;
    setCurrentPage(alteredPage);
    router.push(
      `?sort=${sortStrategy}&pageSize=${pageSize}&page=${alteredPage}`
    );
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    router.push(`?sort=${sortStrategy}&pageSize=${pageSize}&page=${value}`);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <span className='text-gray-700 text-sm'>
          Visar <span className='text-gray-800'>y </span>produkter på{' '}
          <span className='text-gray-800'>x </span> sidor
        </span>

        <span className='flex gap-2'>
          <div className='flex items-center gap-2'>
            <span className='text-gray-700 text-sm'>
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
            <span className='text-gray-700 text-sm'>Sortera efter:</span>
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
                <MenuItem value={'Betyg'}>Betyg</MenuItem>
                <MenuItem value={'price'}>Pris, lägst först</MenuItem>
                <MenuItem value={'priceHigh'}>Pris, högst först</MenuItem>
                <MenuItem value={'name'}>Namn, A-Ö</MenuItem>
                <MenuItem value={'nameHigh'}>Namn, Ö-A</MenuItem>
              </Select>
            </FormControl>
          </div>
        </span>
      </div>
      {children}
    </div>
  );
}
