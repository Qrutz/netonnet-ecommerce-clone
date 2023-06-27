'use client';

// NavigationMenu.tsx
import { useEffect, useRef, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import jsonData from './NavigationMenuCategories.json';
import Link from 'next/link';
import {
  AiOutlineLaptop,
  AiOutlineMobile,
  AiOutlineClose,
} from 'react-icons/ai';
import {
  IoHardwareChipOutline,
  IoGameControllerOutline,
} from 'react-icons/io5';
import { GiVacuumCleaner } from 'react-icons/gi';
import { PiTelevisionSimpleDuotone } from 'react-icons/pi';
import { GiWashingMachine } from 'react-icons/gi';
import { RiSurroundSoundLine } from 'react-icons/ri';
import { type } from 'os';

type types =
  | 'Dator & Surfplatta'
  | 'Datorkomponenter'
  | 'Gaming'
  | 'Hem & Fritid'
  | 'TV'
  | 'Ljud'
  | 'Mobil & Smartwatch'
  | 'Vitvaror'
  | '';

interface NavigationItem {
  title: string;
  href: string;
}

interface NavigationMenuItems {
  title: string;
  items: NavigationItem[];
}

const NavigationMenu: React.FC = () => {
  const menuRef = useRef<HTMLInputElement>(null);
  const [menuItems, setMenuItems] = useState<NavigationMenuItems[]>(
    jsonData.NavigationMenuItems
  );

  const [selectedType, setSelectedType] = useState<types>('');

  const handleClickType = (type: types) => {
    setSelectedType((prevType) => (prevType === type ? '' : type));
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSelectedType('');
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const CategoryIcons: { [key in types]: React.ReactNode } = {
    'Dator & Surfplatta': <AiOutlineLaptop />,
    Datorkomponenter: <IoHardwareChipOutline />,
    Gaming: <IoGameControllerOutline className='text-4xl' />,
    'Hem & Fritid': <GiVacuumCleaner />,
    TV: <PiTelevisionSimpleDuotone />,
    Ljud: <RiSurroundSoundLine />,
    'Mobil & Smartwatch': <AiOutlineMobile />,
    Vitvaror: <GiWashingMachine />,
    '': null,
  };
  return (
    <div
      className='relative w-full z-[500] hidden lg:block py-2 '
      ref={menuRef}
    >
      <Menu>
        {({ open }) => (
          <>
            <div className='flex justify-between w-full gap-8'>
              <span className='flex gap-4'>
                {menuItems.map((item) => (
                  <Menu.Button
                    key={item.title}
                    className={`flex text-sm py-2  font-semibold items-center focus:outline-none ${
                      selectedType === item.title
                        ? 'text-light-blue-900 border-b border-black transition-colors transition-150'
                        : 'text-gray-800  hover:text-light-blue-700 transition-colors transition-150'
                    }`}
                    onClick={() => handleClickType(item.title as types)}
                  >
                    {item.title}
                  </Menu.Button>
                ))}
              </span>

              <span className='flex gap-4 text-sm  font-md font-semibold'>
                <button className='text-gray-800  hover:text-light-blue-700 transition-colors transition-150'>
                  Outlet
                </button>
                <button className='text-gray-800  hover:text-light-blue-700 transition-colors transition-150'>
                  Tjänster
                </button>
                <button className='text-gray-800  hover:text-light-blue-700 transition-colors transition-150'>
                  Varumärken
                </button>
              </span>
            </div>
            <Transition
              show={selectedType !== ''}
              enter='transition duration-200 ease-out'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='transition duration-100 ease-in'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div
                className={`absolute inset-0 mx-auto max-w-screen-2xl w-full right-0 z-100 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg outline-none ${
                  selectedType !== '' ? 'bg-black' : 'hidden'
                }`}
              >
                <div className='p-4 flex flex-col w-full bg-white text-black'>
                  <span className='flex w-full justify-between py-2 border-b border-gray-400/70'>
                    <span className='flex gap-2 items-center text-3xl'>
                      {CategoryIcons[selectedType]}
                      <h2 className='font-md text-black'>{selectedType} </h2>
                    </span>
                    <button
                      className='p-2 hover:bg-gray-300/50 rounded'
                      onClick={() => setSelectedType('')}
                    >
                      <AiOutlineClose className='text-xl' />{' '}
                    </button>
                  </span>

                  <div className='flex space-x-12 w-full py-4'>
                    <div className='flex flex-[3] flex-col '>
                      <h2 className='font-bold'>Kategorier</h2>
                      <Link
                        onClick={() => setSelectedType('')}
                        href={`${selectedType}`}
                        className='py-1 text-light-blue-700 text-md rounded-sm cursor-pointer hover:bg-gray-200 border-b border-gray-200'
                      >
                        Se allt i {selectedType}
                      </Link>
                      {menuItems
                        .find((item) => item.title === selectedType.toString())
                        ?.items.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setSelectedType('')}
                            className='py-1 pl-5 rounded-sm cursor-pointer hover:bg-gray-200/50 border-b border-gray-200 '
                          >
                            <p className='text-light-blue-700 transition-transform duration-150 transform hover:translate-x-4'>
                              {item.title}
                            </p>
                          </Link>
                        ))}
                    </div>
                    <div className='flex flex-[3]  flex-col font-bold'>
                      <h2 className='text-md'>Just nu {selectedType}</h2>

                      <span className='grid grid-cols-3 gap-2 py-2'>
                        <button className='py-1 px-2 hover:bg-gray-300/50 border flex text-sm justify-center items-center font-semibold'>
                          Fyndvaror
                        </button>
                        <button className='p-5 hover:bg-gray-300/50 border flex text-sm justify-center items-center font-semibold'>
                          Nyheter
                        </button>
                        <button className='p-5 hover:bg-gray-300/50 border flex text-sm justify-center items-center font-semibold'>
                          Top 10
                        </button>
                        <button className='p-5 hover:bg-gray-300/50 border flex text-sm justify-center items-center font-semibold'>
                          Favoriter
                        </button>
                      </span>

                      <div className='py-8 flex flex-col gap-2'>
                        <h2 className='text-md'>Inspiration & Guider</h2>
                        <span className='py-1 pl-5 rounded-sm cursor-pointer hover:bg-gray-200/50 border-b border-gray-200 '>
                          <p className='text-light-blue-700 text-sm transition-transform duration-150 transform hover:translate-x-4'>
                            Se Inspiration & Guider
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className='flex-[3] flex flex-col justify-center items-center'>
                      promotion box
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default NavigationMenu;
