const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('viewstream', { title: 'Live Stream', user: req.user })
});

module.exports = router;