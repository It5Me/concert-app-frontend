import { useEffect, useState } from 'react';

export interface Concert {
  id: string;
  name: string;
  description: string;
  totalSeats: number;
  reserved: boolean;
}

export default function UserConcertList() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    const fetchConcerts = async (page = 1) => {
      try {
        const response = await fetch(
          `http://localhost:8080/concerts?page=${page}&limit=${limit}`
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

  const handleReserveToggle = (concertId: string) => {
    console.log(`Toggling reserve for concert ${concertId}`);
  };

  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold mb-4'>Concerts</h2>

      {error && <p className='text-red-500'>{error}</p>}

      <div className='grid gap-6'>
        {concerts.map((concert) => (
          <div
            key={concert.id}
            className='border border-gray-200 rounded-lg p-4 mb-4'
          >
            <h3 className='text-lg font-semibold text-blue-500 mb-2'>
              {concert.name}
            </h3>
            <p className='text-gray-700 mb-4'>{concert.description}</p>

            <div className='flex justify-between items-center'>
              <div className='flex items-center'>
                <span className='mr-2'>👤</span>
                <span>{concert.totalSeats.toLocaleString()}</span>
              </div>

              <button
                onClick={() => handleReserveToggle(concert.id)}
                className={`px-4 py-2 rounded ${
                  concert.reserved
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {concert.reserved ? 'Cancel' : 'Reserve'}
              </button>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
}
