import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Share2, Download } from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Area,
  AreaChart
} from 'recharts';
import { formatCurrency } from '@/utils/chartUtils';

const QueryResult = () => {
  const result = useSelector((state: RootState) => state.query.result);

  if (!result) return null;

  return (
    <div className="mb-8">
      <Card>
        <CardHeader className="border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">{result.title}</h2>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-4">{result.text}</p>
            
            {/* Information callout */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Note that May showed a slight dip of 2.3%, potentially due to seasonal factors.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase">Avg. Monthly Revenue</p>
                <p className="text-xl font-semibold">{result.metrics.avgMonthlyRevenue}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase">Peak Month</p>
                <p className="text-xl font-semibold">{result.metrics.peakMonth}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase">Growth Rate</p>
                <p className="text-xl font-semibold text-emerald-500">{result.metrics.growthRate}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase">Predicted Next Month</p>
                <p className="text-xl font-semibold">{result.metrics.predictedNextMonth}</p>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: 'rgba(31, 41, 55, 0.9)', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '12px'
                  }}
                  labelStyle={{ color: 'white' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Follow-up questions */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-base font-medium text-gray-900 mb-3">Suggested follow-up questions:</h3>
            <div className="flex flex-wrap gap-2">
              {result.followUpQuestions.map((question, index) => (
                <button 
                  key={index} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 hover:bg-primary-100"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QueryResult;
