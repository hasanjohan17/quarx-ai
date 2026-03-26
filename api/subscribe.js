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

    // Debug: Check if API key exists
    const apiKey = process.env.BREVO_API_KEY;
    console.log('🔍 Debug:', {
      hasApiKey: !!apiKey,
      keyLength: apiKey?.length,
      keyPrefix: apiKey?.substring(0, 10)
    });

    if (!apiKey) {
      return res.status(401).json({ 
        error: 'API key missing',
        env_vars: Object.keys(process.env).filter(k => k.includes('BREVO') || k.includes('brevo'))
      });
    }

    console.log('📧 Subscribing:', email);

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        listIds: [3],
        updateEnabled: true
      })
    });

    const data = await response.json();
    console.log('✉️ Brevo response:', response.status, data);

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || 'Subscription failed',
        brevo_error: data.code
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
