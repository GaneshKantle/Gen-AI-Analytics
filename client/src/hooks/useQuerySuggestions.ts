import { useState, useEffect } from 'react';

const defaultSuggestions = [
  "Show revenue by product category",
  "Compare Q1 vs Q2 sales",
  "Which region has highest growth?",
];

const revenueRelatedSuggestions = [
  "Show revenue breakdown by product line",
  "What is the monthly revenue growth rate?",
  "Compare revenue between regions",
  "Forecast revenue for next quarter"
];

const userRelatedSuggestions = [
  "How many active users do we have?",
  "What's our user retention rate?",
  "Show user acquisition cost trends",
  "Compare desktop vs mobile users"
];

const productRelatedSuggestions = [
  "Which products have the highest profit margin?",
  "Show product return rates",
  "Compare product performance across regions",
  "What products are most often purchased together?"
];

export const useQuerySuggestions = (query: string) => {
  const [suggestions, setSuggestions] = useState<string[]>(defaultSuggestions);

  useEffect(() => {
    // Simple keyword matching for suggestions
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('revenue') || lowerQuery.includes('sales') || lowerQuery.includes('income')) {
      setSuggestions(revenueRelatedSuggestions);
    } else if (lowerQuery.includes('user') || lowerQuery.includes('customer') || lowerQuery.includes('client')) {
      setSuggestions(userRelatedSuggestions);
    } else if (lowerQuery.includes('product') || lowerQuery.includes('item') || lowerQuery.includes('merchandise')) {
      setSuggestions(productRelatedSuggestions);
    } else if (lowerQuery.length === 0) {
      setSuggestions(defaultSuggestions);
    }
  }, [query]);

  return { suggestions };
};
