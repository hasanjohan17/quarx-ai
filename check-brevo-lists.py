#!/usr/bin/env python3
"""
Brevo Lists Inspector
Run: python check-brevo-lists.py
"""

import os
import urllib.request
import urllib.error
import json

api_key = os.environ.get('BREVO_API_KEY')

if not api_key:
    print('❌ Set BREVO_API_KEY environment variable')
    print('export BREVO_API_KEY=your_api_key_here')
    exit(1)

print('📡 Fetching Brevo lists...\n')

try:
    print(f'Using API key: {api_key[:20]}...\n')
    
    req = urllib.request.Request(
        'https://api.brevo.com/v3/contacts/lists',
        headers={
            'api-key': api_key,
            'Content-Type': 'application/json',
        }
    )
    
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        
        if 'lists' in data:
            print('✅ Lists found:\n')
            for lst in data['lists']:
                print(f"  📋 {lst['name']}")
                print(f"     ID: {lst['id']}")
                print(f"     Members: {lst['totalSubscribers']}")
                print()
            
            print('💡 Update /api/newsletter.js with the correct List ID (currently: 2)')
        else:
            print('❌ No lists found or error:', data.get('message', data))
            
except urllib.error.HTTPError as e:
    print(f'❌ HTTP Error: {e.code}')
    print(f'URL: {e.url}')
    print(f'Headers: api-key: {api_key[:20]}...')
    try:
        error_data = json.loads(e.read().decode())
        print(error_data.get('message', error_data))
    except:
        print(e.read().decode())
except Exception as e:
    print(f'❌ Error: {e}')
