export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server not configured' });
    }

    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        listIds: [3],
        updateEnabled: true,
      }),
    });

    const responseData = await brevoResponse.json();

    if (!brevoResponse.ok) {
      return res.status(400).json({
        error: responseData.message || 'Failed to subscribe',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      message: error.message,
    });
  }
}
