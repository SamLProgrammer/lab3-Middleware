const {Router } = require('express');
const {processQuery} = require('../controllers/monitor');
const router = Router();

router.get('/query', processQuery);

module.exports = router;