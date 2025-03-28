import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateProcessingProgress, updateProcessingStep } from '@/redux/slices/querySlice';
import { Progress } from '@/components/ui/progress';
import { Zap } from 'lucide-react';

const processingSteps = [
  "Analyzing data sources",
  "Identifying relevant metrics",
  "Extracting revenue data",
  "Calculating monthly trends",
  "Generating visualization",
  "Preparing insights"
];

const QueryProcessing = () => {
  const dispatch = useDispatch();
  const { processingProgress, processingStep } = useSelector((state: RootState) => state.query);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      dispatch(updateProcessingProgress(Math.min(processingProgress + 5, 100)));
      
      if (processingProgress % 20 === 0 && processingStep < processingSteps.length - 1) {
        dispatch(updateProcessingStep(processingStep + 1));
      }
      
      if (processingProgress >= 95) {
        clearInterval(progressInterval);
      }
    }, 200);

    return () => clearInterval(progressInterval);
  }, [dispatch, processingProgress, processingStep]);

  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-600 animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Processing your query</h3>
            <div className="mt-1 text-sm text-gray-500 flex items-center">
              {processingSteps[processingStep]}
              <span className="ml-1 inline-block animate-pulse">|</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Progress value={processingProgress} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default QueryProcessing;
