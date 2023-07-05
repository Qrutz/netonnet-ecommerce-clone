'use client';

import * as React from 'react';

import Divider from '@mui/material/Divider';

import { Button, Drawer } from '@mui/material';
import { FaHamburger } from 'react-icons/fa';
import { AiOutlineLaptop, AiOutlineMobile } from 'react-icons/ai';
import { MdArrowForwardIos } from 'react-icons/md';
import {
  IoGameControllerOutline,
  IoHardwareChipOutline,
} from 'react-icons/io5';
import { GiVacuumCleaner, GiWashingMachine } from 'react-icons/gi';
import { PiTelevisionSimpleDuotone } from 'react-icons/pi';
import { RiSurroundSoundLine } from 'react-icons/ri';
import Link from 'next/link';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)}>
        <FaHamburger className='text-3xl text-light-green-800 cursor-pointer' />
      </Button>
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        <div
          className='w-80'
          role='presentation'
          onClick={toggleDrawer('left', false)}
          onKeyDown={toggleDrawer('left', false)}
        >
          <Link
            href={'/art/dator-surfplatta'}
            className='flex p-2 justify-between text-2xl hover:bg-gray-300 cursor-pointer'
          >
            <span className='flex gap-2 items-center'>
              <AiOutlineLaptop />
              <h1 className='text-lg'>Dator & Surfplatta</h1>
            </span>

            <MdArrowForwardIos className='text-md' />
          </Link>
          <Divider />

          <Link
            href={'/art/datorkomponenter'}
            className='flex p-2 justify-between text-2xl hover:bg-gray-300 cursor-pointer'
          >
            <span className='flex gap-2 items-center'>
              <IoHardwareChipOutline />
              <h1 className='text-lg'>Dator & Datorkomponenter</h1>
            </span>

            <MdArrowForwardIos className='text-md' />
          </Link>
          <Divider />

          <Link
            href={'/art/gaming'}
            className='flex p-2 justify-between text-2xl hover:bg-gray-300 cursor-pointer'
          >
            <span className='flex gap-2 items-center'>
              <IoGameControllerOutline />
              <h1 className='text-lg'>Gaming</h1>
            </span>

            <MdArrowForwardIos className='text-md' />
          </Link>
          <Divider />
        </div>

        <Link
          href={'/art/hem-fritid'}
          className='flex p-2 justify-between text-2xl hover:bg-gray-300 cursor-pointer'
        >
          <span className='flex gap-2 items-center'>
            <GiVacuumCleaner />
            <h1 className='text-lg'>Hem & Fritid</h1>
          </span>

          <MdArrowForwardIos className='text-md' />
        </Link>
        <Divider />

        <Link
          href={'/art/tv'}
          className='flex p-2 justify-between text-2xl hover:bg-gray-300 cursor-pointer'
        >
          <span className='flex gap-2 items-center'>
            <PiTelevisionSimpleDuotone />
            <h1 className='text-lg'>TV</h1>
          </span>

          <MdArrowForwardIos className='text-md' />
        </Link>
        <Divider />

        <Link
          href={'/art/ljud'}
          className='flex p-2 justify-between text-2xl hover:bg-gray-300 cursor-pointer'
        >
          <span className='flex gap-2 items-center'>
            <RiSurroundSoundLine />
            <h1 className='text-lg'>Ljud</h1>
          </span>

          <MdArrowForwardIos className='text-md' />
        </Link>
        <Divider />

        <Link
          href={'/art/mobil-smartwatch'}
          className='flex p-2 justify-between text-2xl hover:bg-gray-300 cursor-pointer'
        >
          <span className='flex gap-2 items-center'>
            <AiOutlineMobile />
            <h1 className='text-lg'>Mobil & Smartwatch</h1>
          </span>

          <MdArrowForwardIos className='text-md' />
        </Link>
        <Divider />

        <Link
          href={'/art/vitvaror'}
          className='flex p-2 justify-between text-2xl hover:bg-gray-300 cursor-pointer'
        >
          <span className='flex gap-2 items-center'>
            <GiWashingMachine />
            <h1 className='text-lg'>Vitvaror</h1>
          </span>

          <MdArrowForwardIos className='text-md' />
        </Link>
        <Divider />
      </Drawer>
    </div>
  );
}
