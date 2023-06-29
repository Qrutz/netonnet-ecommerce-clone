'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface props {
  sortStrategy: string;
  pageSize: number;
}

export default function FilterProductsComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultSortStrategy = 'recomended';
  const defaultPageSize = 6;

  const sortStrategyParam = searchParams.get('sort');
  const pageSizeParam = searchParams.get('pageSize');

  const [sortStrategy, setSortStrategy] = React.useState(
    sortStrategyParam || defaultSortStrategy
  );
  const [pageSize, setPageSize] = React.useState(
    pageSizeParam || defaultPageSize
  );

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

  return (
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
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={18}>18</MenuItem>
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
  );
}
