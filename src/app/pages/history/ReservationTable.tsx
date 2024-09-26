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

interface ReservationTableProps {
  reservations: Reservation[];
  formatDate: (dateString: string) => string;
}

export default function ReservationTable({
  reservations,
  formatDate,
}: ReservationTableProps) {
  return (
    <div className='hidden sm:block overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-200'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b'>Date time</th>
            <th className='py-2 px-4 border-b'>Username</th>
            <th className='py-2 px-4 border-b'>Concert name</th>
            <th className='py-2 px-4 border-b'>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td className='py-2 px-4 border-b'>
                {formatDate(reservation.createdAt)}
              </td>
              <td className='py-2 px-4 border-b'>
                {reservation.user.username}
              </td>
              <td className='py-2 px-4 border-b'>{reservation.concert.name}</td>
              <td className='py-2 px-4 border-b'>
                <span
                  className={
                    reservation.action === 'reserved'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {reservation.action === 'reserved' ? 'Reserve' : 'Cancel'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
