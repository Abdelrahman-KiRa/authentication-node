const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// تحميل متغيرات البيئة
dotenv.config();

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// إعداد Express
const app = express();
app.use(express.json()); // لتحليل JSON في الطلبات
app.use(cors()); // للسماح بطلبات CORS من التطبيق الجوال

// تحميل ملفات التوجيه (Routes)
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// تشغيل الخادم
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const PORT = process.env.PORT || 3000; // Vercel سيحدد PORT تلقائيًا
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});