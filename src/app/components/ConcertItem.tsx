interface ConcertItemProps {
  name: string;
  description: string;
  attendees: number;
  onDelete: () => void;
}

export default function ConcertItem({
  name,
  description,
  attendees,
  onDelete,
}: ConcertItemProps) {
  return (
    <div className='p-4 border rounded-lg flex justify-between items-center'>
      <div>
        <h4 className='text-lg font-semibold'>{name}</h4>
        <p className='text-sm text-gray-600'>{description}</p>
        <p className='flex items-center space-x-1 text-gray-600 mt-2'>
          <i className='fas fa-users'></i>
          <span>{attendees}</span>
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
