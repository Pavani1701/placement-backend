const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');
const applicationRoutes = require('./routes/Application');


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
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
