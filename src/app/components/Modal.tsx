import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function Modal({
  isOpen,
  title,
  content,
  onCancel,
  onConfirm,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-8 shadow-lg max-w-md w-full'>
        <div className='flex justify-center mb-4'>
          <span className='text-red-500 text-4xl'>✖️</span>
        </div>
        <h3 className='text-xl font-semibold text-center mb-4'>{title}</h3>
        <p className='text-center text-gray-600 mb-6'>{content}</p>
        <div className='flex justify-around'>
          <button
            className='bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-gray-300'
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
