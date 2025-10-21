import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApiErrorBlock from '../components/ApiErrorBlock/ApiErrorBlock';

const ApiError: React.FC = () => {
   const navigate = useNavigate();

   const handleRetry = () => {
      navigate('/'); // возвращаем на главную
      // или window.location.reload() для перезагрузки
   };

   return <ApiErrorBlock onRetry={handleRetry} />;
};

export default ApiError;
