const ex = require('express');
const router = ex.Router();
const Persons = require('../models/Persons')
const { query, validationResult, check } = require('express-validator');
const UserController = require('../controllers/person_controller')
// const flash = require('connect-flash');
const validator = require('../validators/validators');
//userValidator
const PersonValidator = require('../validators/PersonValidator')


router.get('/', UserController.getAllusers.bind(UserController))

router.get('/form', UserController.getHomeForm.bind(UserController))

router.post('/', PersonValidator.handle(), UserController.postUsers.bind(UserController))

router.get('/:id', UserController.getOneUser.bind(UserController))

router.put('/:id', PersonValidator.handle(), UserController.putUsers.bind(UserController))


router.delete('/:id', UserController.deleteUsers.bind(UserController))

module.exports = router;