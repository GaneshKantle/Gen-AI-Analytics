import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface QueryHistoryProps {
  className?: string;
  onClearHistory: () => void;
}

const QueryHistory = ({ className, onClearHistory }: QueryHistoryProps) => {
  const queryHistory = useSelector((state: RootState) => state.query.queryHistory);

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
    <aside className={className}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Query History</h2>
        <p className="text-sm text-gray-500">Your recent data explorations</p>
      </div>
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        {queryHistory.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p>No queries yet</p>
          </div>
        ) : (
          queryHistory.map((query) => (
            <div key={query.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {getStatusIcon(query.status)}
                </div>
                <div className="flex-grow">
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
      <div className="p-4 border-t border-gray-200">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center"
          onClick={onClearHistory}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear History
        </Button>
      </div>
    </aside>
  );
};

export default QueryHistory;
