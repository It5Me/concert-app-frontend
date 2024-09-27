'use client';
import ConcertList, { Concert } from '@/app/components/ConcertList';
import CreateConcertForm from '@/app/components/CreateConcertForm';
import Modal from '@/app/components/Modal';
import StatBox from '@/app/components/StatBox';
import Tabs from '@/app/components/Tabs';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState<string | null>(null);
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [concertToDelete, setConcertToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSeats, setTotalSeats] = useState(0);
  const [totalOfReserved, setTotalOfReserved] = useState(0);
  const [totalOfCancel, setTotalOfCancel] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchConcerts = async (page = 1) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/concerts?page=${page}&limit=${limit}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch concerts');
        }

        const data = await response.json();
        console.log('dat', data);
        setConcerts(data.concerts);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setTotalSeats(data.totalSeats);
        setTotalOfReserved(data.totalReserved);
        setTotalOfCancel(data.totalCanceled);
      } catch (err) {
        console.error('Error fetching concerts:', err);
        setError('Failed to fetch concerts. Please try again later.');
      }
    };

    fetchConcerts(currentPage);
  }, [activeTab, currentPage]);

  const handleDeleteClick = (concertId: string) => {
    setConcertToDelete(concertId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setConcertToDelete(null);
  };

  const handleConfirm = async () => {
    if (concertToDelete) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/concerts/${concertToDelete}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete concert');
        }

        setConcerts((prevConcerts) =>
          prevConcerts.filter((concert) => concert.id !== concertToDelete)
        );

        setIsModalOpen(false);
        setConcertToDelete(null);
      } catch (err) {
        console.error('Error deleting concert:', err);
        setError('Failed to delete concert. Please try again later.');
      }
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='min-h-screen flex flex-col lg:flex-row bg-gray-100'>
      <main className='flex-1 p-4 md:p-6 bg-white'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8'>
          <StatBox label='Total of seats' value={totalSeats} color='#1E90FF' />{' '}
          <StatBox label='Reserve' value={totalOfReserved} color='#28a745' />
          <StatBox label='Cancel' value={totalOfCancel} color='#f44336' />
        </div>

        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === 'overview' && (
          <>
            <ConcertList
              concerts={concerts}
              onDeleteConcert={handleDeleteClick}
            />

            <div className='flex justify-between mt-4'>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className='bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300'
              >
                Previous
              </button>

              <span className='text-gray-700'>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className='bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300'
              >
                Next
              </button>
            </div>
          </>
        )}

        {activeTab === 'create-concert' && (
          <div>
            <CreateConcertForm />
          </div>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        title='Are you sure to delete?'
        content={`You are about to delete this concert. This action cannot be undone.`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
