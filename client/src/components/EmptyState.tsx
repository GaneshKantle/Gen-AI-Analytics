import { useDispatch } from 'react-redux';
import { setCurrentQuery } from '@/redux/slices/querySlice';
import { HelpCircle } from 'lucide-react';

const EmptyState = () => {
  const dispatch = useDispatch();

  const handleExampleClick = (query: string) => {
    dispatch(setCurrentQuery(query));
  };

  const exampleQueries = [
    "What's our revenue trend this year?",
    "Which products have the highest margins?",
    "How are our marketing campaigns performing?",
    "Show customer demographics by region"
  ];

  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Ask your first question</h3>
          <p className="mt-1 text-sm text-gray-500">
            Enter a business question in the field above to get started
          </p>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Example questions:</h3>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {exampleQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(query)}
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

export default EmptyState;
