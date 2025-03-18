const authMiddleware = require('../middleware/auth');

router.get('/user/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;

    // البحث عن المستخدم باستخدام الـ ID
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // إرسال معلومات المستخدم
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});