const validator = require('./validators')
const { check } = require('express-validator');
class authValidator extends validator {
    register(){
        return [
        check('username','username cant empty').notEmpty(),
        check('email','email format is not difind').isEmail(),
        check('password','password wrong').isLength({min : 5})
        ]
        
    }
    login(){
        return [
            check('username','username cant empty').notEmpty(),
        check('email','email format is not difind').isEmail(),
        check('password','password wrong').isLength({min : 5})
        ]
        
    }
}
module.exports =new authValidator;