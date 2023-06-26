'use client';

import { useState } from 'react';
import { Menu } from '@headlessui/react';

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative w-full '>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              className={`flex items-center focus:outline-none ${
                open ? 'text-gray-900' : 'text-gray-500'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className=''>Open main menu</span>
            </Menu.Button>
            {isOpen && (
              <Menu.Items
                static
                className='absolute mx-auto mx-auto max-w-screen-2xl  w-full  right-0 z-10 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg outline-none'
              >
                <div className='px-1 py-1  flex w-full bg-white '>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='/'
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-between px-4 py-2 text-sm`}
                      >
                        Home
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='/about'
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-between px-4 py-2 text-sm`}
                      >
                        About
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='/contact'
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-between px-4 py-2 text-sm`}
                      >
                        Contact
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='/contact'
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-between px-4 py-2 text-sm`}
                      >
                        Contact
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='/contact'
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-between px-4 py-2 text-sm`}
                      >
                        Contact
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
    </div>
  );
};

export default NavigationMenu;
