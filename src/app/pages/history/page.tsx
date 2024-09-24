'use client';

export default function History() {
  const historyData = [
    {
      dateTime: '12/09/2024 15:00:00',
      username: 'Sara John',
      concertName: 'The festival Int 2024',
      action: 'Cancel',
    },
    {
      dateTime: '12/09/2024 10:39:20',
      username: 'Sara John',
      concertName: 'The festival Int 2024',
      action: 'Reserve',
    },
  ];

  return (
    <div className='min-h-screen flex bg-gray-100'>
      <main className='flex-1 p-6 bg-white'>
        <div className='p-6 bg-white rounded-lg shadow-md'>
          <table className='min-w-full table-auto border-collapse border border-gray-300'>
            <thead>
              <tr>
                <th className='px-4 py-2 border border-gray-300'>Date time</th>
                <th className='px-4 py-2 border border-gray-300'>Username</th>
                <th className='px-4 py-2 border border-gray-300'>
                  Concert name
                </th>
                <th className='px-4 py-2 border border-gray-300'>Action</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((entry, index) => (
                <tr key={index}>
                  <td className='px-4 py-2 border border-gray-300'>
                    {entry.dateTime}
                  </td>
                  <td className='px-4 py-2 border border-gray-300'>
                    {entry.username}
                  </td>
                  <td className='px-4 py-2 border border-gray-300'>
                    {entry.concertName}
                  </td>
                  <td className='px-4 py-2 border border-gray-300'>
                    {entry.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
