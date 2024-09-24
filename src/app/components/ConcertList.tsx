import ConcertItem from './ConcertItem';

interface Concert {
  name: string;
  description: string;
  attendees: number;
}

interface ConcertListProps {
  concerts: Concert[];
  onDeleteConcert: (name: string) => void;
}

export default function ConcertList({
  concerts,
  onDeleteConcert,
}: ConcertListProps) {
  return (
    <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
      <h3 className='text-xl font-semibold mb-4'>Overview</h3>

      <div className='space-y-4'>
        {concerts.map((concert) => (
          <ConcertItem
            key={concert.name}
            name={concert.name}
            description={concert.description}
            attendees={concert.attendees}
            onDelete={() => onDeleteConcert(concert.name)}
          />
        ))}
      </div>
    </div>
  );
}
