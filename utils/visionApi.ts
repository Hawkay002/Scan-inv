// Made by Shovith (Sid)

// Expo automatically exposes variables that start with EXPO_PUBLIC_
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY; 

export async function processReceiptImage(base64Image: string) {
  if (!GEMINI_API_KEY) {
    console.error("Missing Gemini API Key. Ensure .env is set up correctly.");
    return {
      storeName: "Configuration Error",
      total: 0.00,
      items: [{ name: "API Key Missing", price: 0.00 }]
    };
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `
    Analyze this receipt image. Extract the store name, the total amount, and a list of purchased items with their prices. 
    Return strictly a JSON object with this exact structure:
    {
      "storeName": "Name of Store",
      "total": 0.00,
      "items": [
        { "name": "Item 1", "price": 0.00 }
      ]
    }
    Do not include markdown blocks or any other text, just the raw JSON object.
  `;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: base64Image,
                },
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    
    // Extract the JSON text from the Gemini response
    const rawText = data.candidates[0].content.parts[0].text;
    
    // Clean up any potential markdown formatting the AI might add
    const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error calling Vision API:", error);
    return {
      storeName: "Scan Error",
      total: 0.00,
      items: [{ name: "Processing Failed", price: 0.00 }]
    };
  }
}
