import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  setCurrentQuery,
  startProcessing,
  addQueryToHistory,
  setQueryResult,
} from '@/redux/slices/querySlice';
import { useToast } from '@/hooks/use-toast';
import { useQuerySuggestions } from '@/hooks/useQuerySuggestions';
import { simulateQueryResponse } from '@/utils/mockData';
import { HelpCircle } from 'lucide-react';

const QueryInput = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const currentQuery = useSelector((state: RootState) => state.query.currentQuery);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [resizing, setResizing] = useState(false);
  
  const { suggestions } = useQuerySuggestions(currentQuery);

  useEffect(() => {
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
      }
    };

    if (!resizing) {
      adjustHeight();
    }
  }, [currentQuery, resizing]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setCurrentQuery(e.target.value));
  };

  const handleSuggestionClick = (suggestion: string) => {
    dispatch(setCurrentQuery(suggestion));
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleQuerySubmit = () => {
    if (!currentQuery.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a question to analyze your data.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Query submitted",
      description: "Processing your data request..."
    });

    // Add to history
    dispatch(addQueryToHistory({
      text: currentQuery,
      category: 'Data Analysis',
      status: 'success'
    }));

    // Start processing animation
    dispatch(startProcessing());

    // Simulate API call delay
    setTimeout(() => {
      const result = simulateQueryResponse(currentQuery);
      dispatch(setQueryResult(result));
    }, 3500);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="p-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HelpCircle className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            ref={textareaRef}
            value={currentQuery}
            onChange={handleQueryChange}
            onFocus={() => setResizing(false)}
            onBlur={() => setResizing(false)}
            className="block w-full pl-10 pr-12 py-3 border-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm resize-none min-h-[80px]"
            placeholder="Ask a question about your data..."
          />
          <div className="absolute right-0 inset-y-0 flex py-1.5 pr-1.5">
            <button
              type="button"
              onClick={handleQuerySubmit}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              Run
            </button>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueryInput;
