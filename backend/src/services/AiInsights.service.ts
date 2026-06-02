import type { NextFunction } from "express";
import { callModel } from "../config/googleClient.js";
import { ApiError } from "../utils/ApiError.js";
import { getTodayAnalyticsService } from "./salon.service.js";

export const getAiInsightsService = async (
  salonId: number,
  next: NextFunction,
) => {
  const analytics = await getTodayAnalyticsService(salonId);
  console.log("Analytics retrieved:", analytics);
  const prompt = `
You are an expert salon business analyst.

Analyze the following salon performance metrics and generate actionable business insights.

Salon Metrics:
- Customers Served: ${analytics.customersServed}
- Revenue: ₹${analytics.revenue}
- Top Service: ${analytics.topService}
- Peak Hour: ${analytics.peakHour}

Instructions:
1. Analyze the salon's performance based ONLY on the provided metrics.
2. Provide practical and realistic recommendations for a local salon business.
3. Suggest one specific growth opportunity.
4. Keep each response concise (maximum 2-3 sentences).
5. Do NOT invent statistics, trends, percentages, or assumptions that are not provided.
6. Do NOT mention missing data.
7. Do NOT use markdown formatting.
8. Do NOT wrap the response in \`\`\`json or any code block.
9. Return ONLY a valid JSON object.
10. Do NOT include any text before or after the JSON object.

Expected JSON Schema:
{
  "summary": string,
  "recommendation": string,
  "growthOpportunity": string
}

Example Output:
{
  "summary": "The salon generated ₹5000 from 20 customers, with Haircut being the most popular service and peak demand occurring between 6 PM and 7 PM.",
  "recommendation": "Ensure adequate staffing during peak hours to reduce wait times and improve customer experience.",
  "growthOpportunity": "Create bundled offers around the most popular service to increase average revenue per customer."
}
`;

  try {
    const AiResponse = await callModel(prompt);

    if (!AiResponse) {
      throw new ApiError(500, "Failed to get AI insights");
    }
    return AiResponse;
  } catch (error) {
    next(error);
  }
};
