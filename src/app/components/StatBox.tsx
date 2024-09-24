interface StatBoxProps {
  label: string;
  value: number | string;
  color: string;
}

const StatBox: React.FC<StatBoxProps> = ({ label, value, color }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg flex flex-col items-center`}
      style={{ backgroundColor: color }}
    >
      <h3 className='text-white text-lg font-semibold'>{label}</h3>
      <span className='text-white text-4xl font-bold'>{value}</span>
    </div>
  );
};

export default StatBox;
