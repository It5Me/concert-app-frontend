/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import ConcertList from '@/app/components/ConcertList';
import CreateConcertForm from '@/app/components/CreateConcertForm';
import Modal from '@/app/components/Modal';
import Tabs from '@/app/components/Tabs';
import { useState } from 'react';

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [concerts, setConcerts] = useState([
    {
      name: 'Concert Name 1',
      description: 'Lorem ipsum dolor...',
      attendees: 500,
    },
    {
      name: 'Concert Name 2',
      description: 'Lorem ipsum dolor...',
      attendees: 200,
    },
  ]);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className='min-h-screen flex flex-col lg:flex-row bg-gray-100'>
      <main className='flex-1 p-4 md:p-6 bg-white'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8'>
          <div className='bg-blue-500 text-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col items-center'>
            <i className='fas fa-users text-2xl md:text-3xl'></i>
            <h3 className='text-lg md:text-xl font-semibold mt-2 md:mt-4'>
              Total of seats
            </h3>
            <span className='text-3xl md:text-4xl font-bold'>500</span>
          </div>
          <div className='bg-green-500 text-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col items-center'>
            <i className='fas fa-ticket-alt text-2xl md:text-3xl'></i>
            <h3 className='text-lg md:text-xl font-semibold mt-2 md:mt-4'>
              Reserve
            </h3>
            <span className='text-3xl md:text-4xl font-bold'>120</span>
          </div>
          <div className='bg-red-500 text-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col items-center'>
            <i className='fas fa-times-circle text-2xl md:text-3xl'></i>
            <h3 className='text-lg md:text-xl font-semibold mt-2 md:mt-4'>
              Cancel
            </h3>
            <span className='text-3xl md:text-4xl font-bold'>12</span>
          </div>
        </div>

        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

        <div className='p-4 md:p-6 bg-white rounded-lg shadow-md'>
          {activeTab === 'overview' && (
            <ConcertList
              concerts={concerts}
              onDeleteConcert={handleDeleteClick}
            />
          )}
          {activeTab === 'create-concert' && (
            <div>
              <CreateConcertForm />
            </div>
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          title='Are you sure to delete?'
          content={'test'}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      </main>
    </div>
  );
}
