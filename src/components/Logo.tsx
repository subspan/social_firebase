import React from 'react';
import { FaFireAlt } from 'react-icons/fa';

const Logo: React.FC = () => {
  return (
    <div className="text-xl font-bold flex items-center gap-2">
      <FaFireAlt className="text-orange-500" />
      <span>Firebase Buttons</span>
    </div>
  );
};

export default Logo;
