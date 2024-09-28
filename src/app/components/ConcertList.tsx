import ConcertItem from './ConcertItem';

export interface Concert {
  id: string;
  name: string;
  description: string;
  totalSeats: number;
}

interface ConcertListProps {
  concerts: Concert[];
  onDeleteConcert: (concertId: string) => void;
}

export default function ConcertList({
  concerts,
  onDeleteConcert,
}: ConcertListProps) {
  return (
    <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
      <div className='space-y-4 overflow-y-auto flex-grow h-[calc(100vh-350px)]'>
        {concerts?.map((concert) => (
          <ConcertItem
            key={concert.id}
            id={concert.id}
            name={concert.name}
            description={concert.description}
            totalSeats={concert.totalSeats}
            onDelete={() => onDeleteConcert(concert.id)}
          />
        ))}
      </div>
    </div>
  );
}
