import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Check, X } from 'lucide-react';

type ToastType = 'success' | 'error';

const ToastNotification = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('success');
  const processing = useSelector((state: RootState) => state.query.processing);
  const error = useSelector((state: RootState) => state.query.error);
  const result = useSelector((state: RootState) => state.query.result);

  useEffect(() => {
    if (processing) {
      setMessage('Query submitted successfully');
      setType('success');
      setVisible(true);
    }
  }, [processing]);

  useEffect(() => {
    if (error) {
      setMessage('Error processing query');
      setType('error');
      setVisible(true);
    }
  }, [error]);

  useEffect(() => {
    if (result) {
      setMessage('Query results ready');
      setType('success');
      setVisible(true);
    }
  }, [result]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (visible) {
      timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
      {type === 'success' ? (
        <Check className="h-5 w-5 mr-3" />
      ) : (
        <X className="h-5 w-5 mr-3" />
      )}
      <span>{message}</span>
    </div>
  );
};

export default ToastNotification;
