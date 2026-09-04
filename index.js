const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Bayanan Admin na wucin gadi
const ADMIN_CREDENTIALS = {
    email: "admin@almustaphaverify.com",
    password: "password123"
};

// 1. Root Route
app.get('/', (req, res) => {
    res.send('AlmustaphaVerify Backend is running successfully!');
});

// 2. Admin Login API Route
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: "Lura: Ana buƙatar email da kalmar sirri (password)!" 
        });
    }

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        return res.status(200).json({
            success: true,
            message: "An shiga dashboard cikin nasara!",
            token: "almustapha-secure-token-2026"
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "Kuskure: Email ko kalmar sirri ba ta daidaita ba!"
        });
    }
});

// 3. Business Management Route
app.get('/api/business/stats', (req, res) => {
    res.status(200).json({
        success: true,
        businessName: "Almustapha Verify Enterprise",
        totalVerifications: 0,
        activeStatus: "Active",
        message: "An samu bayanan kasuwanci lafiya lau."
    });
});

// Fara aikin Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
        
