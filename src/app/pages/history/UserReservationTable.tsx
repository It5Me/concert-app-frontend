'use client';

interface Reservation {
  createdAt: string;
  concert: {
    name: string;
  };
  action: string;
}

interface UserReservationTableProps {
  reservations: Reservation[];
  formatDate: (dateString: string) => string;
}

export default function UserReservationTable({
  reservations,
  formatDate,
}: UserReservationTableProps) {
  return (
    <div className='hidden sm:block overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='py-3 px-6 border-b text-left font-semibold text-gray-700 text-lg'>
              Date time
            </th>
            <th className='py-3 px-6 border-b text-left font-semibold text-gray-700 text-lg'>
              Concert name
            </th>
            <th className='py-3 px-6 border-b text-left font-semibold text-gray-700 text-lg'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-gray-100 transition-colors duration-200`}
            >
              <td className='py-4 px-6 border-b text-gray-600'>
                {formatDate(reservation.createdAt)}
              </td>
              <td className='py-4 px-6 border-b text-gray-600'>
                {reservation.concert.name}
              </td>
              <td className='py-4 px-6 border-b'>
                <span
                  className={`font-semibold ${
                    reservation.action === 'reserved'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
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
