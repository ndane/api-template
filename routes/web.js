import express from 'express';

/* Base Router */
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'API Only',
  });
});

export default router;
