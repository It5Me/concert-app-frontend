'use client';
import Sidebar from './components/Sidebar';
import './globals.css';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang='en'>
      <body className='min-h-screen flex flex-col lg:flex-row bg-gray-100'>
        {pathname !== '/pages/login' && <Sidebar />}
        <main className='flex-1 bg-white'>{children}</main>
      </body>
    </html>
  );
}
