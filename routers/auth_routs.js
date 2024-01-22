const ex = require('express');
const router = ex.Router();
const Persons = require('../models/Persons')
const { query, validationResult, check } = require('express-validator');
const authController = require('../controllers/auth_contoroller')
// const flash = require('connect-flash');
const validator = require('../validators/validators');
//userValidator
const authValidator = require('../validators/authValidator');


router.use((req,res,next)=>{
    if(req.isAuthenticated()){
       return res.redirect('/dashboard')
    }
    next();
})

router.get('/register',authController.registerform.bind(authController));
router.get('/login',authController.loginform.bind(authController));


router.post('/register',authValidator.register(),authController.register.bind(authController));
router.post('/login',authValidator.login(),authController.login.bind(authController));




module.exports = router;