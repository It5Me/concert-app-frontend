import { useState } from 'react';

export default function CreateConcertForm() {
  const [concertName, setConcertName] = useState('');
  const [totalSeats, setTotalSeats] = useState<any>('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const concertData = {
      name: concertName,
      totalSeats: totalSeats,
      description: description,
    };

    try {
      const response = await fetch('http://localhost:8080/concerts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(concertData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Concert created successfully:', data);
        setSuccessMessage('Concert created successfully!');
        setConcertName(data.name);
        setTotalSeats(data.totalSeats);
        setDescription(data.description);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create concert.');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white shadow-md rounded-lg p-6 mx-auto '
    >
      <h2 className='text-2xl font-semibold text-blue-500 mb-4'>Create</h2>

      {error && <p className='text-red-500 mb-4'>{error}</p>}
      {successMessage && (
        <p className='text-green-500 mb-4'>{successMessage}</p>
      )}

      <div className='grid grid-cols-2 gap-6 mb-4'>
        <div>
          <label
            htmlFor='concertName'
            className='block text-sm font-medium text-gray-700'
          >
            Concert Name
          </label>
          <input
            type='text'
            id='concertName'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            placeholder='Please input concert name'
            value={concertName}
            onChange={(e) => setConcertName(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor='totalSeats'
            className='block text-sm font-medium text-gray-700'
          >
            Total of seat
          </label>
          <div className='relative mt-1 rounded-md shadow-sm'>
            <input
              type='number'
              id='totalSeats'
              className='block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              value={totalSeats}
              onChange={(e) =>
                setTotalSeats(
                  e.target.value === '' ? '' : Number(e.target.value)
                )
              }
              required
            />

            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <span className='text-gray-500 sm:text-sm'>👤</span>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-6'>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-700'
        >
          Description
        </label>
        <textarea
          id='description'
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          placeholder='Please input description'
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <button
        type='submit'
        className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center'
      >
        <i className='fas fa-save mr-2'></i> Save
      </button>
    </form>
  );
}
