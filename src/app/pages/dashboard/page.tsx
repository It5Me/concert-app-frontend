'use client';
import { useEffect, useState } from 'react';
import AdminView from './AdminView';
import UserConcertList from './UserConcertList';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';

export default function Dashboard() {
  const router = useRouter();
  const { role: contextRole, currentMode } = useUser();
  const [role, setRole] = useState<string | null>(contextRole || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');

    if (!contextRole && storedRole) {
      setRole(storedRole);
    } else if (!contextRole && !storedRole) {
      router.push('/pages/login');
    } else {
      setRole(contextRole);
    }

    setLoading(false);
  }, [contextRole, router]);

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col lg:flex-row bg-gray-100'>
      <main className='flex-1 p-4 md:p-6 bg-white'>
        {currentMode === 'admin' ? <AdminView /> : <UserConcertList />}
      </main>
    </div>
  );
}
