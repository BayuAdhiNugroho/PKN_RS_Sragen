const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const doctorController = require('../controllers/doctorController');
const scheduleController = require('../controllers/scheduleController');
const newsController = require('../controllers/newsController');
const facilityController = require('../controllers/facilityController');
const achievementController = require('../controllers/achievementController');
const promotionController = require('../controllers/promotionController');
const contactController = require('../controllers/contactController');
const settingController = require('../controllers/settingController');

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.json({ message: 'Admin API' });
});

router.get('/doctors', doctorController.getAll);
router.post('/doctors', upload.single('foto'), doctorController.create);
router.put('/doctors/:id', upload.single('foto'), doctorController.update);
router.delete('/doctors/:id', doctorController.remove);

router.get('/schedules', scheduleController.getAll);
router.post('/schedules', scheduleController.create);
router.put('/schedules/:id', scheduleController.update);
router.delete('/schedules/:id', scheduleController.remove);

router.get('/news', newsController.getAll);
router.post('/news', upload.single('gambar'), newsController.create);
router.put('/news/:id', upload.single('gambar'), newsController.update);
router.delete('/news/:id', newsController.remove);

router.get('/facilities', facilityController.getAll);
router.post('/facilities', upload.single('gambar'), facilityController.create);
router.put('/facilities/:id', upload.single('gambar'), facilityController.update);
router.delete('/facilities/:id', facilityController.remove);

router.get('/achievements', achievementController.getAll);
router.post('/achievements', upload.single('gambar'), achievementController.create);
router.put('/achievements/:id', upload.single('gambar'), achievementController.update);
router.delete('/achievements/:id', achievementController.remove);

router.get('/promotions', promotionController.getAllAdmin);
router.post('/promotions', upload.single('gambar'), promotionController.create);
router.put('/promotions/:id', upload.single('gambar'), promotionController.update);
router.delete('/promotions/:id', promotionController.remove);

router.put('/contact', contactController.update);
router.put('/settings/linktree', settingController.updateLinktree);

module.exports = router;
