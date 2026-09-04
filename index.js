
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root Route mai nuna Shafin Dashboard da API Docs
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AlmustaphaVerify - Dashboard & API Docs</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background: #f4f7f6; color: #333; }
            .container { max-width: 900px; margin: auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            h1, h2 { color: #0056b3; }
            .endpoint { background: #eef2f5; padding: 15px; border-left: 5px solid #0056b3; margin: 15px 0; border-radius: 4px; }
            .method { font-weight: bold; padding: 3px 6px; border-radius: 3px; color: #fff; font-size: 12px; }
            .post { background: #28a745; }
            .get { background: #007bff; }
            code { background: #272822; color: #f8f8f2; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>AlmustaphaVerify Dashboard & API Docs</h1>
            <p>Sabar ta tashi kuma tana aiki lafiya! Ga jerin hanyoyin sadarwa (Endpoints) da za a iya amfani da su.</p>
            
            <h3>Base URLs</h3>
            <ul>
                <li><strong>Sandbox:</strong> <code>https://sandbox.identityverify.ng</code></li>
                <li><strong>Production Live:</strong> <code>https://api.identityverify.ng</code></li>
            </ul>

            <h2>1. Admin & Statistics</h2>
            <div class="endpoint">
                <span class="method post">POST</span> <code>/api/admin/login</code>
                <p>Shiga shafin admin (Admin Login).</p>
            </div>
            <div class="endpoint">
                <span class="method get">GET</span> <code>/api/business/stats</code>
                <p>Kididdigar kasuwanci da alkaluman tantancewa.</p>
            </div>

            <h2>2. BVN Verification</h2>
            <div class="endpoint">
                <span class="method post">POST</span> <code>/v2/bvn/verify-basic</code>
                <p>Tantance BVN ta farko (Basic Validation).</p>
            </div>
            <div class="endpoint">
                <span class="method post">POST</span> <code>/v2/bvn/lookup-full</code>
                <p>Cikakken binciken BVN da hoton mai shi.</p>
            </div>

            <h2>3. NIN Verification</h2>
            <div class="endpoint">
                <span class="method post">POST</span> <code>/v2/nin/verify-vnin</code>
                <p>Tantance lambar vNIN.</p>
            </div>
            <div class="endpoint">
                <span class="method post">POST</span> <code>/v2/nin/lookup-direct</code>
                <p>Binciken lambar NIN ta asali ta digit 11.</p>
            </div>

            <h2>4. CAC Corporate Verification</h2>
            <div class="endpoint">
                <span class="method post">POST</span> <code>/v2/cac/search</code>
                <p>Binciken sunan kamfani a rajistar CAC.</p>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Admin Login Endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password123') {
    res.json({
      status: 'success',
      code: 'ADMIN_LOGIN_SUCCESS',
      message: 'Admin logged in successfully.',
      token: 'sec_live_sample_token_xyz987'
    });
  } else {
    res.status(401).json({
      status: 'error',
      code: 'UNAUTHORIZED',
      message: 'Invalid username or password.'
    });
  }
});

// Business Statistics API Endpoint
app.get('/api/business/stats', (req, res) => {
  res.json({
    status: 'success',
    code: 'STATS_RETRIEVED',
    data: {
      total_verifications: 1420,
      bvn_checked: 850,
      nin_checked: 420,
      cac_checked: 150,
      active_status: 'HEALTHY'
    }
  });
});

// BVN Verification Routes
app.post('/v2/bvn/verify-basic', (req, res) => {
  const { bvn, customer_consent } = req.body;
  res.json({ status: 'success', message: 'Basic BVN validation successful', data: { bvn, customer_consent, verified: true } });
});

app.post('/v2/bvn/lookup-full', (req, res) => {
  const { bvn } = req.body;
  res.json({ status: 'success', message: 'Full BVN demographics and photo retrieved', data: { bvn, first_name: 'Adebayo', last_name: 'Ibrahim' } });
});

// NIN Verification Routes
app.post('/v2/nin/verify-vnin', (req, res) => {
  res.json({ status: 'success', message: 'Virtual NIN verified successfully' });
});

app.post('/v2/nin/lookup-direct', (req, res) => {
  const { nin } = req.body;
  res.json({ status: 'success', message: 'Direct NIN lookup successful', data: { nin, first_name: 'Fatima', last_name: 'Bello' } });
});

// CAC Corporate Verification Routes
app.post('/v2/cac/search', (req, res) => {
  const { search_term } = req.body;
  res.json({ status: 'success', message: 'CAC search results retrieved', data: [{ rc_number: 'RC-1492018', company_name: search_term || 'ZENITH LOGISTICS' }] });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
