import axios from 'axios';

// @desc    Chat with AI assistant
// @route   POST /api/chat
// @access  Private
export const chatWithAI = async (req, res, next) => {
  try {
    const { message, userType } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Enhanced AI responses for agricultural queries
    const getAgriculturalResponse = (msg, type) => {
      const lower = msg.toLowerCase();
      
      // Price predictions
      if (lower.includes('price') || lower.includes('cost') || lower.includes('rate')) {
        if (lower.includes('tomato')) {
          return "🍅 Tomato prices are expected to rise by 15-20% next week due to increased demand. Current market rate: ₹45-55/kg. Best time to sell: Next 7-10 days.";
        }
        if (lower.includes('potato')) {
          return "🥔 Potato prices stable at ₹25-35/kg. Demand expected to increase during festival season. Consider storing for better prices.";
        }
        return "📊 AI Price Analysis: Current market trends show vegetable prices increasing by 8-12% overall. Best selling crops: Tomatoes, Onions, Leafy greens.";
      }

      // Crop diseases
      if (lower.includes('disease') || lower.includes('pest') || lower.includes('problem')) {
        if (lower.includes('tomato') && (lower.includes('yellow') || lower.includes('curling'))) {
          return "🍅 Yellow leaf curling in tomatoes: Use neem oil spray (5ml/liter) and remove affected leaves. Ensure proper drainage and avoid over-watering.";
        }
        if (lower.includes('pest')) {
          return "🐛 Common pest solutions: Neem oil (5ml/liter), garlic spray, or organic pesticides. Maintain crop rotation and companion planting.";
        }
        return "🌱 For disease prevention: Ensure proper spacing, good drainage, and regular monitoring. Use organic pesticides when needed.";
      }

      // Fertilizer recommendations
      if (lower.includes('fertilizer') || lower.includes('nutrient')) {
        return "🌾 Fertilizer Guide:\n• Vegetables: NPK 19-19-19 (2kg/acre)\n• Fruits: NPK 20-20-20 (3kg/acre)\n• Organic: Vermicompost (2-3 tons/acre)\n• Apply during early morning for best absorption";
      }

      // Weather impact
      if (lower.includes('weather') || lower.includes('rain') || lower.includes('climate')) {
        return "🌤️ Weather Advisory:\n• Excess rain: Improve drainage, avoid over-watering\n• High temperature: Mulching and shade nets recommended\n• Drought: Drip irrigation and drought-resistant varieties";
      }

      // Seasonal advice
      if (lower.includes('season') || lower.includes('when to plant')) {
        return "📅 Seasonal Planting Guide:\n• Summer: Tomatoes, Peppers, Cucumbers\n• Monsoon: Leafy vegetables, Gourds\n• Winter: Carrots, Cauliflower, Peas\n• Spring: All vegetables ideal time";
      }

      // Market demand
      if (lower.includes('demand') || lower.includes('market') || lower.includes('sell')) {
        return "📈 Current Market Trends:\n• High Demand: Organic vegetables, Exotic fruits\n• Moderate: Traditional vegetables\n• Low: Common grains\n• Tip: Focus on organic and seasonal produce for better prices";
      }

      // Storage tips
      if (lower.includes('storage') || lower.includes('preserve')) {
        return "🏪 Storage Tips:\n• Root vegetables: Cool, dark place\n• Leafy greens: Refrigerate with paper towels\n• Fruits: Room temperature until ripe\n• Grains: Airtight containers, cool place";
      }

      // Default responses based on user type
      if (type === 'farmer') {
        return "🌾 Farming Assistant: I can help with crop selection, disease management, price predictions, and market trends. Ask me anything about farming!";
      } else {
        return "🛒 Shopping Assistant: I can help you find the best products, compare prices, and understand seasonal availability. What would you like to know?";
      }
    };

    // Get AI response
    let response;
    
    // If Chat API key is configured, use external AI
    if (process.env.CHAT_API_KEY && process.env.CHAT_API_KEY !== 'your-openai-or-chatgpt-api-key') {
      try {
        const aiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are an agricultural AI assistant for ${userType === 'farmer' ? 'farmers' : 'buyers'}. Provide helpful, practical advice about farming, crops, prices, and market trends. Use emojis where appropriate. Be concise but informative.`
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 150
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.CHAT_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });

        response = aiResponse.data.choices[0].message.content;
      } catch (error) {
        // Fallback to local responses if API fails
        response = getAgriculturalResponse(message, userType);
      }
    } else {
      // Use local responses
      response = getAgriculturalResponse(message, userType);
    }

    res.status(200).json({
      success: true,
      response
    });
  } catch (error) {
    next(error);
  }
};
