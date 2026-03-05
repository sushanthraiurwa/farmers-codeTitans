export const CHATBOT_RESPONSES = {
  greet: [
    "Hello! Welcome to FarmLink 🌾",
    "I'm your AI farming assistant. How can I help you today?",
    "You can ask me about products, orders, pricing, or farming tips!"
  ],
  price: [
    "Our AI suggests prices based on current market rates. Tomatoes: ₹40-50/kg, Spinach: ₹25-35/bundle.",
    "Would you like a detailed price analysis for a specific product?"
  ],
  organic: [
    "Organic farming uses natural methods without synthetic pesticides. Our organic farmers are certified.",
    "Benefits include healthier produce, better for the environment, and often higher nutritional value."
  ],
  order: [
    "You can track your orders in the 'My Orders' section of your dashboard.",
    "Orders are typically processed within 24 hours. Delivery takes 1-3 days based on your location."
  ],
  forecast: [
    "📊 AI Forecast: Tomato demand expected to increase by 18% next week!",
    "Mango season is approaching — expect 35% higher demand. Stock up now!",
    "Green vegetables have stable demand this month."
  ],
  default: [
    "I'm here to help! Ask me about products, prices, orders, or farming tips.",
    "You can also use voice input to add products to your listings.",
    "Need help? Try asking about 'prices', 'organic farming', or 'order status'."
  ],
};

export function getChatResponse(message: string): string[] {
  const lower = message.toLowerCase();
  
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return CHATBOT_RESPONSES.greet;
  }
  if (lower.includes("price") || lower.includes("cost") || lower.includes("rate")) {
    return CHATBOT_RESPONSES.price;
  }
  if (lower.includes("organic")) {
    return CHATBOT_RESPONSES.organic;
  }
  if (lower.includes("order") || lower.includes("delivery") || lower.includes("track")) {
    return CHATBOT_RESPONSES.order;
  }
  if (lower.includes("demand") || lower.includes("forecast") || lower.includes("trend")) {
    return CHATBOT_RESPONSES.forecast;
  }
  
  return CHATBOT_RESPONSES.default;
}
