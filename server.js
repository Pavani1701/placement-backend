const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/Job');
const applicationRoutes = require('./routes/Application');


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: 'https://placementsportal.netlify.app',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running...');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes); 
app.use('/api/applications', applicationRoutes);
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
