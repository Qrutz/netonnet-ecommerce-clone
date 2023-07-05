'use client';

import { BsSearch } from 'react-icons/bs';
import { clientFetch } from '@/sanity/lib/client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

async function searchProducts(query: string) {
  console.log('query', query);
  if (!query) return [];
  const res =
    await clientFetch(`*[_type == "product" && title match "*${query}*" && defined(Category) && defined(subcategory) && defined(subsubcategory)] [0..5]   {
    _id,
    title,
    slug {
      current
    },
    Category->{
      slug {
        current
      }
    },
    subcategory->{slug{current}},
    subsubcategory->{slug{current}},
    CardName,
    bulletPoints[],
    Images[]{_key, asset->{url}},
    ArtikelNummer,
    details
  }`);

  return res;
}

function SearchBox() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearch('');
        setProducts([]);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    const products = await searchProducts(query);
    setProducts(products);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch('');
    setProducts([]);
    router.replace(`/search?query=${search}`);
  };

  return (
    <div className='relative   items-center' ref={searchRef}>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          className='lg:w-[32rem] w-full bg-white rounded-xl  py-2 pl-[0.75rem] pr-12 text-md text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          placeholder='Search for products...'
          value={search}
          onChange={handleChange}
        />
        <button className='absolute right-0 top-0 bottom-0 flex items-center justify-center px-4 bg-blue-500 text-white  rounded-r-xl focus:outline-none'>
          <BsSearch className='w-6 h-6' />
        </button>
      </form>

      {products.length > 0 && (
        <div className='absolute w-[32rem] z-[500] left-0  bg-white text-black border border-gray-300 rounded-lg rounded-t-none'>
          {products.map((product) => (
            <Link
              onClick={() => setProducts([])}
              href={`/art/${product.Category.slug.current}/${product.subcategory.slug.current}/${product.subsubcategory.slug.current}/${product.slug.current}`}
              key={product._id}
              className='px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-4'
            >
              <img width={20} src={product.Images[0].asset.url} alt='' />
              <h2>{product.title}</h2>
            </Link>
          ))}
          <li
            onClick={() => {
              router.replace(`/search?query=${search}`);
              setSearch('');
              setProducts([]);
            }}
            className='px-4 py-2 cursor-pointer hover:bg-gray-100 list-none'
          >
            Show all results
          </li>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
