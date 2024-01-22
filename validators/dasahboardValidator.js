const validator = require('./validators')
const { check } = require('express-validator');
class dashboardValidator extends validator {
    dash(){
        return [
            check('email','email format is not difind').isEmail(),
        check('password','password wrong').isLength({min : 5})
        ]
        
    }
}
module.exports =new dashboardValidator;