# Backend Setup Instructions

The statistics are now stored on a shared backend so all users see the same cumulative data.

## Get Your Secret Key

1. **In JSONBin.io**, go to your bin (ID: `698e8108d0ea881f40b63f14`)
2. Look for **"Secret Key"** or **"Access Key"** in the bin details
3. Click **"Show"** or **"Reveal"** to see the key
4. Copy the entire key (it should start with `$2a$10$`)

## Update script.js

1. Open `script.js`
2. Find this line:
   ```javascript
   const JSONBIN_API_KEY = 'YOUR_SECRET_KEY_HERE';
   ```
3. Replace `YOUR_SECRET_KEY_HERE` with your actual Secret Key from JSONBin.io
4. The Bin ID is already set to your bin: `698e8108d0ea881f40b63f14`

## Commit and Push

```bash
git add script.js
git commit -m "Configure JSONBin.io API key"
git push
```

## How It Works

- All users' selections are stored in your JSONBin.io bin
- The bin structure is `{"stats": {...}}` where stats contains all the animal counts
- When someone makes a selection, it updates the shared database
- When viewing statistics, it fetches from the shared database
- Statistics are cumulative across all users

## Testing

After updating the API key, test it by:
1. Opening your site
2. Making a selection
3. Opening the site in an incognito/private window
4. Viewing the statistics - you should see your previous selection counted
