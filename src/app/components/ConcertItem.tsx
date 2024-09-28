import { HiOutlineUser } from 'react-icons/hi';

interface ConcertItemProps {
  id: string;
  name: string;
  description: string;
  totalSeats: number;
  onDelete: () => void;
}

export default function ConcertItem({
  name,
  description,
  totalSeats,
  onDelete,
}: ConcertItemProps) {
  return (
    <div className='p-4 border rounded-lg flex justify-between items-center'>
      <div>
        <h4 className='text-lg font-semibold'>{name}</h4>
        <p className='text-sm text-gray-600'>{description}</p>
        <p className='flex items-center space-x-1 text-gray-600 mt-2'>
          <i className='fas fa-users'></i>
          <div className='flex items-center text-gray-700 '>
            <HiOutlineUser className='h-5 w-5 text-gray-500' />
            <span className='ml-2 font-medium'>
              {totalSeats === 0
                ? 'No Seats Available'
                : `${totalSeats.toLocaleString()} Seats`}
            </span>
          </div>
        </p>
      </div>
      <button
        className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'
        onClick={onDelete}
      >
        <i className='fas fa-trash-alt'></i> Delete
      </button>
    </div>
  );
}
