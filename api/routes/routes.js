var express = require('express');
var router = express.Router(); 
var user = require('../controllers/User') 
const isAuth = require('../middleware/is-auth');
const checkPermission = require('../middleware/check-permission');


router.get('/test', (req, res) => { res.json({ mess: "Hello" }) })

router.post('/login', user.login);

router.post('/users', isAuth, user.addUser);
router.get('/users', isAuth, checkPermission, user.getUser);
router.get('/usersById', isAuth, checkPermission, user.usersById);

router.put('/users/:id', isAuth, checkPermission, user.updateUsers);
router.delete('/users', isAuth, checkPermission, user.deleteUser); 
 
module.exports = router ;