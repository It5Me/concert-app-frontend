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
          <div className='block lg:hidden space-y-6'>
            {historyData.map((entry, index) => (
              <div
                key={index}
                className='p-4 bg-white shadow-lg rounded-lg border border-gray-200'
              >
                <div className='mb-2'>
                  <span className='font-semibold text-gray-700'>
                    Date time:
                  </span>{' '}
                  <span className='text-gray-600'>{entry.dateTime}</span>
                </div>
                <div className='mb-2'>
                  <span className='font-semibold text-gray-700'>Username:</span>{' '}
                  <span className='text-gray-600'>{entry.username}</span>
                </div>
                <div className='mb-2'>
                  <span className='font-semibold text-gray-700'>
                    Concert name:
                  </span>{' '}
                  <span className='text-gray-600'>{entry.concertName}</span>
                </div>
                <div>
                  <span className='font-semibold text-gray-700'>Action:</span>{' '}
                  <span
                    className={`${
                      entry.action === 'Cancel'
                        ? 'text-red-600'
                        : 'text-green-600'
                    } font-medium`}
                  >
                    {entry.action}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className='hidden lg:block overflow-x-auto'>
            <table className='min-w-full table-auto border-collapse border border-gray-300'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300'>
                    Date time
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300'>
                    Username
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300'>
                    Concert name
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((entry, index) => (
                  <tr key={index} className='bg-white hover:bg-gray-100'>
                    <td className='px-4 py-2 text-sm text-gray-600 border border-gray-300'>
                      {entry.dateTime}
                    </td>
                    <td className='px-4 py-2 text-sm text-gray-600 border border-gray-300'>
                      {entry.username}
                    </td>
                    <td className='px-4 py-2 text-sm text-gray-600 border border-gray-300'>
                      {entry.concertName}
                    </td>
                    <td
                      className={`px-4 py-2 text-sm ${
                        entry.action === 'Cancel'
                          ? 'text-red-600'
                          : 'text-green-600'
                      } font-medium border border-gray-300`}
                    >
                      {entry.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
