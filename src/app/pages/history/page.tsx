'use client';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ReservationTable from './ReservationTable';
import ReservationCardList from './ReservationCardList';

interface Reservation {
  createdAt: string;
  user: {
    username: string;
  };
  concert: {
    name: string;
  };
  action: string;
}

export default function ReservationHistory() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/reservations/admin/reservations'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch reservation history');
        }

        const data = await response.json();
        setReservations(data);
      } catch (err) {
        console.error('Error fetching reservation history:', err);
        setError('Failed to fetch reservations. Please try again later.');
      }
    };

    fetchReservations();
  }, []);

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD/MM/YYYY HH:mm:ss');
  };

  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold mb-4'>Reservation History</h2>

      {error && <p className='text-red-500'>{error}</p>}

      <ReservationTable reservations={reservations} formatDate={formatDate} />

      <ReservationCardList
        reservations={reservations}
        formatDate={formatDate}
      />
    </div>
  );
}
