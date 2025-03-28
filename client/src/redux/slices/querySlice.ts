import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QueryHistoryItem {
  id: string;
  text: string;
  timestamp: number;
  category: string;
  status: 'success' | 'warning' | 'error';
}

export interface QueryState {
  currentQuery: string;
  queryHistory: QueryHistoryItem[];
  processing: boolean;
  processingStep: number;
  processingProgress: number;
  error: boolean;
  result: {
    title: string;
    text: string;
    chartData: any;
    metrics: {
      avgMonthlyRevenue: string;
      peakMonth: string;
      growthRate: string;
      predictedNextMonth: string;
    };
    followUpQuestions: string[];
  } | null;
}

const initialState: QueryState = {
  currentQuery: '',
  queryHistory: [
    {
      id: '1',
      text: 'What was our revenue trend over the last 6 months?',
      timestamp: Date.now() - 7200000, // 2 hours ago
      category: 'Revenue Analysis',
      status: 'success',
    },
    {
      id: '2',
      text: 'How many active users do we have by region?',
      timestamp: Date.now() - 18000000, // 5 hours ago
      category: 'User Demographics',
      status: 'success',
    },
    {
      id: '3',
      text: 'Compare conversion rates between desktop and mobile',
      timestamp: Date.now() - 86400000, // 1 day ago
      category: 'Platform Analysis',
      status: 'warning',
    },
    {
      id: '4',
      text: 'What products had the highest return rate last quarter?',
      timestamp: Date.now() - 172800000, // 2 days ago
      category: 'Product Performance',
      status: 'success',
    },
    {
      id: '5',
      text: 'Calculate ROI for each marketing channel',
      timestamp: Date.now() - 259200000, // 3 days ago
      category: 'Marketing Analytics',
      status: 'error',
    },
  ],
  processing: false,
  processingStep: 0,
  processingProgress: 0,
  error: false,
  result: null,
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCurrentQuery: (state, action: PayloadAction<string>) => {
      state.currentQuery = action.payload;
    },
    startProcessing: (state) => {
      state.processing = true;
      state.processingStep = 0;
      state.processingProgress = 0;
      state.error = false;
      state.result = null;
    },
    updateProcessingProgress: (state, action: PayloadAction<number>) => {
      state.processingProgress = action.payload;
    },
    updateProcessingStep: (state, action: PayloadAction<number>) => {
      state.processingStep = action.payload;
    },
    setQueryResult: (state, action: PayloadAction<QueryState['result']>) => {
      state.processing = false;
      state.result = action.payload;
    },
    setQueryError: (state) => {
      state.processing = false;
      state.error = true;
      state.result = null;
    },
    addQueryToHistory: (state, action: PayloadAction<Omit<QueryHistoryItem, 'id' | 'timestamp'>>) => {
      const newQuery = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      state.queryHistory.unshift(newQuery);
    },
    clearQueryHistory: (state) => {
      state.queryHistory = [];
    },
  },
});

export const {
  setCurrentQuery,
  startProcessing,
  updateProcessingProgress,
  updateProcessingStep,
  setQueryResult,
  setQueryError,
  addQueryToHistory,
  clearQueryHistory,
} = querySlice.actions;

export default querySlice.reducer;
