#!/usr/bin/env node

/**
 * Brevo Lists Inspector
 * Run: node check-brevo-lists.js
 */

const apiKey = process.env.BREVO_API_KEY;

if (!apiKey) {
  console.error('❌ BREVO_API_KEY not set');
  console.log('Add it to .env.local or set it manually:');
  console.log('export BREVO_API_KEY=your_api_key_here');
  process.exit(1);
}

console.log('📡 Fetching Brevo lists...\n');

fetch('https://api.brevo.com/v3/contacts/lists', {
  headers: {
    'api-key': apiKey,
    'Content-Type': 'application/json',
  },
})
  .then(res => res.json())
  .then(data => {
    if (data.lists) {
      console.log('✅ Lists found:\n');
      data.lists.forEach(list => {
        console.log(`  📋 ${list.name}`);
        console.log(`     ID: ${list.id}`);
        console.log(`     Members: ${list.totalSubscribers}`);
        console.log();
      });
      
      console.log('💡 Update /api/newsletter.js with the correct List ID (currently: 2)');
    } else if (data.message) {
      console.error('❌ Error:', data.message);
    } else {
      console.error('❌ Unexpected response:', data);
    }
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
  });
