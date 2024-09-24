interface TabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className='flex space-x-4 border-b border-gray-300 mb-4'>
      <button
        className={`py-2 px-4 font-medium ${
          activeTab === 'overview'
            ? 'text-blue-500 border-b-2 border-blue-500'
            : 'text-gray-500'
        }`}
        onClick={() => onTabChange('overview')}
      >
        Overview
      </button>
      <button
        className={`py-2 px-4 font-medium ${
          activeTab === 'create-concert'
            ? 'text-blue-500 border-b-2 border-blue-500'
            : 'text-gray-500'
        }`}
        onClick={() => onTabChange('create-concert')}
      >
        Create Concert
      </button>
    </div>
  );
}
