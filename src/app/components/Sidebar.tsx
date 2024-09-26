'use client';
import {
  HiOutlineHome,
  HiOutlineClock,
  HiOutlineSwitchHorizontal,
  HiOutlineLogout,
} from 'react-icons/hi';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentMode, toggleMode, role, handleLogout } = useUser();

  return (
    <>
      <button
        className='p-2 lg:hidden focus:outline-none'
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed inset-0 bg-white p-6 z-50 transform ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        } transition-transform duration-300 ease-in-out lg:translate-y-0 lg:w-64 lg:relative lg:border-r lg:inset-auto flex flex-col justify-between`}
      >
        <button
          className='lg:hidden mb-4 focus:outline-none'
          onClick={() => setIsOpen(false)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
        <div>
          <div className='text-lg font-semibold mb-6'>
            {currentMode === 'admin' ? 'Admin' : 'User'}
          </div>

          <nav className='flex flex-col space-y-4'>
            {currentMode === 'admin' && (
              <Link
                href='/pages/dashboard'
                className='flex items-center space-x-2 text-gray-600 hover:text-blue-500'
              >
                <HiOutlineHome className='h-6 w-6 text-gray-500' />
                <span>Home</span>
              </Link>
            )}
            {currentMode === 'admin' && (
              <Link
                href='/pages/history'
                className='flex items-center space-x-2 text-gray-600 hover:text-blue-500'
              >
                <HiOutlineClock className='h-6 w-6 text-gray-500' />
                <span>History</span>
              </Link>
            )}
            {role === 'admin' && (
              <button
                onClick={toggleMode}
                className='flex items-center space-x-2 text-gray-600 text-left hover:text-blue-500'
              >
                <HiOutlineSwitchHorizontal className='h-6 w-6 text-gray-500' />
                <span>
                  {currentMode === 'admin'
                    ? 'Switch to User'
                    : 'Switch to Admin'}
                </span>
              </button>
            )}
          </nav>
        </div>
        <div className='xl:mb-5'>
          <button
            onClick={handleLogout}
            className='flex items-center space-x-2 text-gray-600 hover:text-blue-500'
          >
            <HiOutlineLogout className='h-6 w-6 text-gray-500' />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
