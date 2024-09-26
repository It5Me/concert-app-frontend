'use client';

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

interface ReservationCardListProps {
  reservations: Reservation[];
  formatDate: (dateString: string) => string;
}

export default function ReservationCardList({
  reservations,
  formatDate,
}: ReservationCardListProps) {
  return (
    <div className='sm:hidden'>
      {reservations.map((reservation, index) => (
        <div
          key={index}
          className='border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-md'
        >
          <div className='flex justify-between mb-2'>
            <span className='font-semibold'>Date time:</span>
            <span>{formatDate(reservation.createdAt)}</span>
          </div>
          <div className='flex justify-between mb-2'>
            <span className='font-semibold'>Username:</span>
            <span>{reservation.user.username}</span>
          </div>
          <div className='flex justify-between mb-2'>
            <span className='font-semibold'>Concert name:</span>
            <span>{reservation.concert.name}</span>
          </div>
          <div className='flex justify-between mb-2'>
            <span className='font-semibold'>Action:</span>
            <span
              className={
                reservation.action === 'reserved'
                  ? 'text-green-500'
                  : 'text-red-500'
              }
            >
              {reservation.action === 'reserved' ? 'Reserve' : 'Cancel'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
