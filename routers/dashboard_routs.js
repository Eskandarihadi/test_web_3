const ex = require('express');
const router = ex.Router();
const Persons = require('../models/Persons')
const { query, validationResult, check } = require('express-validator');
const dashboardController = require('../controllers/dashboard_controller')
// const flash = require('connect-flash');
const validator = require('../validators/validators');
//userValidator
const dashboardValidator = require('../validators/dasahboardValidator');


router.use((req , res , next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
})


router.get('/',dashboardValidator.dash(),dashboardController.index.bind(dashboardController))



module.exports = router;