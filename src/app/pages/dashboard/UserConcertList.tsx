import { useUser } from '@/app/context/UserContext';
import { useEffect, useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi';

export interface Concert {
  description: string;
  id: number;
  name: string;
  reservations: Array<{
    action: string;
    userId: number;
  }>;
  reservedSeats: number;
  totalSeats: number;
}

export default function UserConcertList() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;
  const { userId } = useUser();

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
        setConcerts(data.concerts);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (err) {
        console.error('Error fetching concerts:', err);
        setError('Failed to fetch concerts. Please try again later.');
      }
    };

    fetchConcerts(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleReserveToggle = async (concertId: number) => {
    if (!userId) {
      console.error('User is not logged in.');
      return;
    }

    const selectedConcert = concerts.find(
      (concert) => concert.id === concertId
    );
    const isReserved = selectedConcert
      ? isReservedByUser(selectedConcert)
      : false;

    try {
      const url = isReserved
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations/${concertId}/user/${userId}/cancel`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations/${concertId}/user/${userId}`;

      const method = isReserved ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${isReserved ? 'cancel' : 'reserve'} concert`
        );
      }

      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/concerts?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!updatedResponse.ok) {
        throw new Error('Failed to fetch updated concert data');
      }

      const updatedData = await updatedResponse.json();
      setConcerts(updatedData.concerts);
    } catch (err) {
      console.error('Error toggling reservation:', err);
      setError(
        `Failed to ${
          isReserved ? 'cancel' : 'reserve'
        } concert. Please try again later.`
      );
    }
  };

  const isReservedByUser = (concert: Concert) => {
    return concert.reservations.some(
      (reservation) =>
        reservation.userId === userId && reservation.action === 'reserved'
    );
  };

  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold mb-4'>Concerts</h2>

      {error && <p className='text-red-500'>{error}</p>}

      <div className='space-y-6'>
        {concerts.map((concert) => (
          <div
            key={concert.id}
            className={`border ${
              concert.totalSeats === 0
                ? 'bg-red-50 border-red-200 shadow-lg'
                : 'bg-white border-gray-200'
            } rounded-lg p-6 transition duration-300 ease-in-out transform hover:shadow-lg`}
          >
            <div className='flex justify-between items-center mb-2'>
              <h3
                className={`text-xl font-bold ${
                  concert.totalSeats === 0 ? 'text-red-600' : 'text-blue-600'
                }`}
              >
                {concert.name}
              </h3>

              {concert.totalSeats === 0 && (
                <div className='flex items-center'>
                  <span className='px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium'>
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            <p className='text-gray-600 mb-4'>{concert.description}</p>

            <div className='flex justify-between items-center'>
              <div className='flex items-center text-gray-700'>
                <HiOutlineUser className='h-6 w-6 text-gray-500' />
                <span className='ml-2 font-medium'>
                  {concert.totalSeats === 0
                    ? 'No Seats Available'
                    : `${concert.totalSeats.toLocaleString()} Seats`}
                </span>
              </div>
              <button
                onClick={() => handleReserveToggle(concert.id)}
                disabled={
                  concert.totalSeats === 0 && !isReservedByUser(concert)
                }
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  concert.totalSeats === 0 && !isReservedByUser(concert)
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : isReservedByUser(concert)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isReservedByUser(concert)
                  ? 'Cancel'
                  : concert.totalSeats === 0
                  ? 'Sold Out'
                  : 'Reserve'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-between mt-8'>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className='bg-blue-500 text-white px-6 py-3 rounded-lg disabled:bg-gray-300'
        >
          Previous
        </button>

        <span className='text-gray-700'>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className='bg-blue-500 text-white px-6 py-3 rounded-lg disabled:bg-gray-300'
        >
          Next
        </button>
      </div>
    </div>
  );
}
