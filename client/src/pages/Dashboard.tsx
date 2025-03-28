import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import QueryInput from '@/components/QueryInput';
import QueryHistory from '@/components/QueryHistory';
import QueryProcessing from '@/components/QueryProcessing';
import QueryResult from '@/components/QueryResult';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import MobileHistoryModal from '@/components/MobileHistoryModal';
import { clearQueryHistory } from '@/redux/slices/querySlice';

import { FileBarChart } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { processing, error, result } = useSelector((state: RootState) => state.query);
  const [showMobileHistory, setShowMobileHistory] = useState(false);

  const handleClearHistory = () => {
    dispatch(clearQueryHistory());
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-primary-600 mr-2">
                <FileBarChart className="h-8 w-8" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Gen AI Analytics</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-100 rounded-full p-2 text-gray-500 hover:bg-gray-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="bg-gray-100 rounded-full p-2 text-gray-500 hover:bg-gray-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <div className="flex items-center">
                <span className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Query History Sidebar (Desktop) */}
        <QueryHistory className="w-full md:w-80 bg-white border-r border-gray-200 md:flex md:flex-col hidden" onClearHistory={handleClearHistory} />

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-8 bg-gray-50 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Welcome section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Welcome to Gen AI Analytics</h1>
              <p className="text-gray-600 mt-2">Ask questions in plain English and get instant data insights</p>
            </div>

            {/* Query Input */}
            <QueryInput />

            {/* Query Processing */}
            {processing && <QueryProcessing />}

            {/* Query Result or Empty/Error State */}
            {!processing && result && <QueryResult />}
            {!processing && error && <ErrorState />}
            {!processing && !result && !error && <EmptyState />}
          </div>
        </main>
      </div>

      {/* Mobile History Toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-10">
        <button
          onClick={() => setShowMobileHistory(true)}
          className="bg-primary-500 rounded-full p-3 text-white shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Mobile History Modal */}
      <MobileHistoryModal
        isOpen={showMobileHistory}
        onClose={() => setShowMobileHistory(false)}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
};

export default Dashboard;
