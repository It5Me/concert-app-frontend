'use client';
import AdminView from './AdminView';
import UserConcertList from './UserConcertList';
import { useUser } from '@/app/context/UserContext';

export default function Dashboard() {
  const { currentMode, loading } = useUser();

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
