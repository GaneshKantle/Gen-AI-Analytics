import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, X, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface MobileHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearHistory: () => void;
}

const MobileHistoryModal = ({ isOpen, onClose, onClearHistory }: MobileHistoryModalProps) => {
  const queryHistory = useSelector((state: RootState) => state.query.queryHistory);

  if (!isOpen) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto bg-gray-500 bg-opacity-75 md:hidden">
      <div className="min-h-screen px-4 text-center">
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Query History</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {queryHistory.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>No queries yet</p>
              </div>
            ) : (
              queryHistory.map((query) => (
                <div key={query.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getStatusIcon(query.status)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{query.text}</p>
                      <p className="text-xs text-gray-500">
                        {query.category} • {formatDistanceToNow(new Date(query.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={onClearHistory}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHistoryModal;
