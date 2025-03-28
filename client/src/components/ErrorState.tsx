import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setCurrentQuery } from '@/redux/slices/querySlice';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

const ErrorState = () => {
  const dispatch = useDispatch();
  const currentQuery = useSelector((state: RootState) => state.query.currentQuery);

  const handleTryAgain = () => {
    dispatch(setCurrentQuery(currentQuery));
  };

  const handleSuggestionClick = (query: string) => {
    dispatch(setCurrentQuery(query));
  };

  const suggestedQueries = [
    "Show monthly sales for Q2",
    "What is our customer retention rate?",
    "Compare revenue by region"
  ];

  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">We couldn't process your query</h3>
          <p className="mt-1 text-sm text-gray-500">
            There was an error understanding or processing your request. Please try rephrasing or using one of the suggestions below.
          </p>
          <div className="mt-6">
            <Button 
              onClick={handleTryAgain}
              className="inline-flex items-center px-4 py-2"
            >
              Try Again
            </Button>
          </div>
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-900">Try one of these instead:</h3>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {suggestedQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(query)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
