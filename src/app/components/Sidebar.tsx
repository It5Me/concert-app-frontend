'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (linkPath: string) => pathname === linkPath;

  return (
    <aside className='w-full lg:w-64 bg-white p-4 border-b lg:border-r lg:border-b-0'>
      <div className='text-lg font-semibold mb-6'>Admin</div>
      <nav className='space-y-4'>
        <Link
          href='/pages/dashboard'
          className={`flex items-center space-x-2 ${
            isActive('/pages/dashboard')
              ? 'text-blue-500'
              : 'text-gray-600 hover:text-blue-500'
          }`}
        >
          <i className='fas fa-home'></i>
          <span>Home</span>
        </Link>
        <Link
          href='/pages/history'
          className={`flex items-center space-x-2 ${
            isActive('/pages/history')
              ? 'text-blue-500'
              : 'text-gray-600 hover:text-blue-500'
          }`}
        >
          <i className='fas fa-history'></i>
          <span>History</span>
        </Link>
        <Link
          href='#'
          className='flex items-center space-x-2 text-gray-600 hover:text-blue-500'
        >
          <i className='fas fa-user'></i>
          <span>Switch to user</span>
        </Link>
      </nav>
      <Link
        href='#'
        className='mt-auto flex items-center space-x-2 text-gray-600 hover:text-blue-500 pt-6'
      >
        <i className='fas fa-sign-out-alt'></i>
        <span>Logout</span>
      </Link>
    </aside>
  );
}
