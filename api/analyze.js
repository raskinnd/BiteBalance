// Vercel Serverless Function
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { mealDescription } = req.body;

    if (!mealDescription) {
      return res.status(400).json({ error: 'Missing meal description' });
    }

    // Get API key from environment variable
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `אתה תזונאי מומחה. נתח את הארוחה הבאה לפי הקווים המנחים של הולטר סוכר.

קווים מנחים:
- תזונה מאוזנת עם עומס גליקמי נמוך
- עדיפות למזון מלא ולא מעובד
- איזון בין חלבונים, פחמימות מורכבות ושומנים בריאים
- הימנעות ממזון מעובד, סוכר מוסף ופחמימות פשוטות

ארוחה לניתוח: ${mealDescription}

אנא ספק ניתוח מפורט בפורמט הבא בעברית (השתמש באימוג'ים):

1. תיאור הארוחה
2. דירוג כללי: [💫/⭐] - [אחוז] - [תיאור]
3. האם כדאי לאכול: [Always ✅ / Sometimes ⚖️ / Never ❌]
4. סיבת הדירוג (פסקה קצרה)
5. פרמטרים של מזון:
   - עומס גליקמי: [✅ נמוך / ⚠️ בינוני / 🚫 גבוה]
   - גודל מנה: [🍽️ תיאור]
   - איזון מקרו-נוטריאנטים: [תיאור]
6. נוטריאנטים משוערים:
   - אנרגיה: [קלוריות] קלוריות
   - חלבון: [גרם]ג
   - פחמימות: [גרם]ג
   - סיבים תזונתיים: [רמה]
   - שומנים: [גרם]ג
   - שומן רווי: [רמה]
   - נתרן: [כמות]
7. תחליפים מומלצים (3-4 אפשרויות מרכזיות בלבד)
8. נימוק לארוחה הבאה (שורה-שורה וחצי)
9. המלצות לארוחה הבאה (3 אפשרויות):
   - אופציה צמחונית: [תיאור]
   - אופציה בשרית: [תיאור]
   - אופציה דגים: [תיאור]
10. סיכום והמלצות (2-3 נקודות)`
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed');
    }

    // Return the analysis
    res.status(200).json({
      success: true,
      analysis: data.content[0].text
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error' 
    });
  }
}
