import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for query history and suggestions
  app.get('/api/suggestions', (req, res) => {
    const { query } = req.query;
    
    // Default suggestions
    let suggestions = [
      "Show revenue by product category",
      "Compare Q1 vs Q2 sales",
      "Which region has highest growth?",
    ];
    
    // Return suggestions based on query parameter
    if (query) {
      const queryStr = query.toString().toLowerCase();
      
      if (queryStr.includes('revenue') || queryStr.includes('sales')) {
        suggestions = [
          "What was our revenue last month?",
          "Compare sales across regions",
          "Show revenue growth trend"
        ];
      } else if (queryStr.includes('user') || queryStr.includes('customer')) {
        suggestions = [
          "How many active users do we have?",
          "What's our user retention rate?",
          "Show customer acquisition cost"
        ];
      }
    }
    
    res.json({ suggestions });
  });

  const httpServer = createServer(app);
  return httpServer;
}
