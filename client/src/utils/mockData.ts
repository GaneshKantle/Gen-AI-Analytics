import { QueryState } from '@/redux/slices/querySlice';

// Chart data for revenue trend over 6 months
const revenueChartData = [
  { name: 'January', value: 720000 },
  { name: 'February', value: 765000 },
  { name: 'March', value: 810000 },
  { name: 'April', value: 842000 },
  { name: 'May', value: 823000 },
  { name: 'June', value: 994000 }
];

// Chart data for user demographics by region
const userDemographicsData = [
  { name: 'North America', value: 42500 },
  { name: 'Europe', value: 35200 },
  { name: 'Asia-Pacific', value: 28700 },
  { name: 'Latin America', value: 14300 },
  { name: 'Africa', value: 8200 }
];

// Chart data for conversion rates
const conversionRatesData = [
  { name: 'Desktop', value: 4.8 },
  { name: 'Mobile', value: 3.2 },
  { name: 'Tablet', value: 3.9 }
];

// Chart data for product return rates
const productReturnRatesData = [
  { name: 'Electronics', value: 5.2 },
  { name: 'Clothing', value: 8.7 },
  { name: 'Home Goods', value: 3.1 },
  { name: 'Toys', value: 4.5 },
  { name: 'Beauty', value: 2.8 }
];

// Chart data for marketing ROI
const marketingROIData = [
  { name: 'Search', value: 320 },
  { name: 'Social Media', value: 245 },
  { name: 'Email', value: 410 },
  { name: 'Display Ads', value: 180 },
  { name: 'Affiliates', value: 290 }
];

export const simulateQueryResponse = (query: string): QueryState['result'] => {
  const lowerQuery = query.toLowerCase();
  
  // Revenue trend response
  if (lowerQuery.includes('revenue') || lowerQuery.includes('sales') || lowerQuery.includes('trend')) {
    return {
      title: 'Revenue Trend Analysis',
      text: 'Your revenue has shown a consistent upward trend over the last 6 months, with a particularly strong performance in June. The overall growth rate is 14.8% compared to the previous 6-month period.',
      chartData: revenueChartData,
      metrics: {
        avgMonthlyRevenue: '$842,350',
        peakMonth: 'June',
        growthRate: '+14.8%',
        predictedNextMonth: '$965,000'
      },
      followUpQuestions: [
        'Which product category drove the June increase?',
        'How does this compare to last year?',
        'What\'s the revenue forecast for next quarter?'
      ]
    };
  }
  
  // User demographics response
  else if (lowerQuery.includes('user') || lowerQuery.includes('region') || lowerQuery.includes('demographic')) {
    return {
      title: 'User Distribution by Region',
      text: 'North America represents our largest user base at 33%, followed by Europe at 27%. The Asia-Pacific region is showing the fastest growth rate of 22% year-over-year.',
      chartData: userDemographicsData,
      metrics: {
        avgMonthlyRevenue: '129,000',
        peakMonth: 'North America',
        growthRate: '+22% (APAC)',
        predictedNextMonth: '135,000'
      },
      followUpQuestions: [
        'What is the user retention rate by region?',
        'Which region has the highest customer lifetime value?',
        'Show user acquisition cost by region'
      ]
    };
  }
  
  // Conversion rates response
  else if (lowerQuery.includes('conversion') || lowerQuery.includes('desktop') || lowerQuery.includes('mobile')) {
    return {
      title: 'Conversion Rate Comparison',
      text: 'Desktop consistently outperforms mobile in conversion rates, with a 50% higher conversion rate. However, mobile traffic volume is 2.3x higher than desktop.',
      chartData: conversionRatesData,
      metrics: {
        avgMonthlyRevenue: '3.9%',
        peakMonth: 'Desktop',
        growthRate: '+0.3%',
        predictedNextMonth: '4.1%'
      },
      followUpQuestions: [
        'What steps in the funnel have the biggest drop-off on mobile?',
        'How do conversion rates vary by time of day?',
        'What is the average order value by platform?'
      ]
    };
  }
  
  // Product return rates response
  else if (lowerQuery.includes('product') || lowerQuery.includes('return') || lowerQuery.includes('margin')) {
    return {
      title: 'Product Return Rate Analysis',
      text: 'Clothing has the highest return rate at 8.7%, which is 2.8x the average for other categories. Electronic products have seen a 0.5% reduction in returns after the new quality control process was implemented.',
      chartData: productReturnRatesData,
      metrics: {
        avgMonthlyRevenue: '4.9%',
        peakMonth: 'Clothing',
        growthRate: '-0.5%',
        predictedNextMonth: '4.7%'
      },
      followUpQuestions: [
        'What are the top reasons for clothing returns?',
        'Which product SKUs have the lowest return rates?',
        'How do return rates impact profit margins?'
      ]
    };
  }
  
  // Marketing ROI response
  else if (lowerQuery.includes('marketing') || lowerQuery.includes('roi') || lowerQuery.includes('campaign')) {
    return {
      title: 'Marketing Channel ROI',
      text: 'Email marketing shows the highest ROI at 410%, followed by search at 320%. Display ads are underperforming with only 180% ROI and might need optimization.',
      chartData: marketingROIData,
      metrics: {
        avgMonthlyRevenue: '289%',
        peakMonth: 'Email',
        growthRate: '+15%',
        predictedNextMonth: '305%'
      },
      followUpQuestions: [
        'Which email campaigns had the highest conversion?',
        'What is the customer acquisition cost by channel?',
        'How does ROI change with seasonal campaigns?'
      ]
    };
  }
  
  // Default response for any other query
  else {
    return {
      title: 'Data Analysis Results',
      text: 'Based on your query, we\'ve analyzed the relevant data points. Here are the key insights we found that might help answer your question.',
      chartData: revenueChartData, // Using revenue chart as default
      metrics: {
        avgMonthlyRevenue: '$825,150',
        peakMonth: 'June',
        growthRate: '+12.3%',
        predictedNextMonth: '$890,000'
      },
      followUpQuestions: [
        'Can you show a breakdown by category?',
        'How does this compare to industry benchmarks?',
        'What factors are driving these trends?'
      ]
    };
  }
};
