export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Add contact to Brevo
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        listIds: [3], // List ID for newsletter
        updateEnabled: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Brevo error:', data);
      return res.status(400).json({ 
        error: data.message || 'Failed to subscribe' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter' 
    });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}
