const {Router } = require('express');
const {processQuery, newInstance, notifyExistence} = require('../controllers/monitor');
const router = Router();

router.get('/query', processQuery);
router.get('/newInstance', newInstance);
router.post('/notifyExistence', notifyExistence);

module.exports = router;