export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let email = req.body?.email;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email required' });
    }

    email = email.trim().toLowerCase();
    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return res.status(401).json({ error: 'API key missing' });
    }

    const payload = {
      email: email,
      listIds: [3],
      updateEnabled: true
    };

    console.log('📨 POST to Brevo:', {
      email,
      apiKeyLength: apiKey.length,
      payload
    });

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }

    console.log('✉️ Brevo returned:', {
      status: response.status,
      statusText: response.statusText,
      data
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Subscription failed',
        status: response.status,
        details: data
      });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (error) {
    console.error('❌ Exception:', error.message, error.stack);
    return res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
}
