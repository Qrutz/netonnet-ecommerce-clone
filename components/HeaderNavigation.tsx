'use client';

// NavigationMenu.tsx
import { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';

type types = 'Dator' | 'Laptop' | 'ff' | '';

const NavigationMenu = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<types>('');

  return (
    <div className='relative w-full z-[500]'>
      <Menu>
        {({ open }) => (
          <>
            <div className='flex w-full gap-8'>
              <Menu.Button
                className={`flex items-center focus:outline-none ${
                  open ? 'text-gray-900' : 'text-gray-500'
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span onClick={() => setType('Dator')} className=''>
                  Dator & surfplattor
                </span>
              </Menu.Button>

              <Menu.Button
                className={`flex items-center focus:outline-none ${
                  open ? 'text-gray-900' : 'text-gray-500'
                }`}
                onClick={
                  () => setIsOpen(!isOpen)
                  // setType('Laptop')
                }
              >
                <span onClick={() => setType('Laptop')} className=''>
                  Datorkomponenter
                </span>
              </Menu.Button>

              <Menu.Button
                className={`flex items-center focus:outline-none ${
                  open ? 'text-gray-900' : 'text-gray-500'
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className=''>Gaming</span>
              </Menu.Button>
            </div>
            <Transition
              show={isOpen}
              enter='transition duration-200 ease-out'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='transition duration-100 ease-in'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div
                className={`absolute inset-0 mx-auto max-w-screen-2xl w-full right-0 z-100 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg outline-none ${
                  isOpen ? '' : 'hidden'
                }`}
                id={id}
              >
                <div className='p-4 flex flex-col w-full bg-white text-black'>
                  <span className='flex w-full justify-between py-2 border-b border-gray-400/70'>
                    <h2 className='text-2xl text-black'>Dator & Surfplatta </h2>
                    <button onClick={() => setIsOpen(false)}>X</button>
                  </span>

                  <div className='flex space-x-12 w-full py-4'>
                    <div className='flex flex-[3] flex-col '>
                      <h2 className='font-bold'>Kategorier</h2>
                      <span className='py-1 text-light-blue-700 text-md rounded-sm cursor-pointer hover:bg-gray-200 border-b border-gray-200'>
                        Se allt i Dator & Surfplatta {type}
                      </span>

                      <span className='py-1 pl-5 rounded-sm cursor-pointer hover:bg-gray-200/50 border-b border-gray-200 '>
                        <p className='text-light-blue-700 transition-transform duration-150 transform hover:translate-x-4'>
                          Laptop
                        </p>
                      </span>

                      <span className='py-1 pl-5 rounded-sm cursor-pointer hover:bg-gray-200/50 border-b border-gray-200 '>
                        <p className='text-light-blue-700 transition-transform duration-150 transform hover:translate-x-4'>
                          Stationära datorer
                        </p>
                      </span>

                      <span className='py-1 pl-5 rounded-sm cursor-pointer hover:bg-gray-200/50 border-b border-gray-200 '>
                        <p className='text-light-blue-700 transition-transform duration-150 transform hover:translate-x-4'>
                          Surfplattor
                        </p>
                      </span>

                      <span className='py-1 pl-5 rounded-sm cursor-pointer hover:bg-gray-200/50 border-b border-gray-200 '>
                        <p className='text-light-blue-700 transition-transform duration-150 transform hover:translate-x-4'>
                          Datorskärmar
                        </p>
                      </span>

                      <span className='py-1 pl-5 rounded-sm cursor-pointer hover:bg-gray-200/50 border-b border-gray-200 '>
                        <p className='text-light-blue-700 transition-transform duration-150 transform hover:translate-x-4'>
                          Nätverk
                        </p>
                      </span>

                      <span className='py-1 pl-5 rounded-sm cursor-pointer hover:bg-gray-200/50 border-b border-gray-200 '>
                        <p className='text-light-blue-700 transition-transform duration-150 transform hover:translate-x-4'>
                          Skrivare & Scanner
                        </p>
                      </span>

                      <span className='py-1 pl-5 rounded-sm cursor-pointer hover:bg-gray-200/50 border-b border-gray-200 '>
                        <p className='text-light-blue-700 transition-transform duration-150 transform hover:translate-x-4'>
                          Datortillbehör
                        </p>
                      </span>

                      <span className='py-1 pl-5 rounded-sm cursor-pointer hover:bg-gray-200/50 border-b border-gray-200 '>
                        <p className='text-light-blue-700 transition-transform duration-150 transform hover:translate-x-4'>
                          Programvara
                        </p>
                      </span>
                    </div>

                    <div className='flex flex-[3]  flex-col font-bold'>
                      <h2 className='text-md'>Just nu Dator & Surfplatta</h2>

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
