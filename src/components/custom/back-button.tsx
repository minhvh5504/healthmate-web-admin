import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const BackButton = ({ 
  className = '',
  label = 'Back',
  endpoint = '',
}: { 
  className?: string;
  label?: string;
  endpoint?: string;
}) => {
  const router = useRouter();

  return (
    <button
      onClick={() => endpoint ? router.push(endpoint) : router.back()}
      className={`flex items-center gap-1 text-gray-600 hover:text-gray-900 ${className}`}
    >
      <ArrowLeft size={20} />
      <span>{label}</span>
    </button>
  );
};