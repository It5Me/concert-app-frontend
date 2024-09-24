/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import ConcertList from '@/app/components/ConcertList';
import CreateConcertForm from '@/app/components/CreateConcertForm';
import Modal from '@/app/components/Modal';
import StatBox from '@/app/components/StatBox';
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
          <StatBox label='Total of seats' value={500} color='#1E90FF' />{' '}
          <StatBox label='Reserve' value={120} color='#28a745' />
          <StatBox label='Cancel' value={12} color='#f44336' />
        </div>

        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

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
