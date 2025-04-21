import React from 'react';
import { FaFireAlt } from 'react-icons/fa';
import { LockKeyhole } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="text-xl font-bold flex items-center gap-2">
      <FaFireAlt className="text-orange-500" />
      <span>Firebase Auth</span>
      <LockKeyhole className="h-5 w-5 text-blue-500" />
    </div>
  );
};

export default Logo;
