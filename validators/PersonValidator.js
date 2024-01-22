const validator = require('./validators')
const { check } = require('express-validator');
class PersonValidator extends validator {
    handle(){
        return [
            check('email','email format is not difind').isEmail(),
        check('password','password wrong').isLength({min : 5})
        ]
        
    }
}
module.exports =new PersonValidator;