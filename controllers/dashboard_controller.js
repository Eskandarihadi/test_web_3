const Controller = require('./controller');
const Persons = require('../models/Persons');
const { query, validationResult, check } = require('express-validator');


class dashboardController extends Controller {
    async index(req, res, next) {
        try {
            res.render('dashboard/index')
        } catch (err) {
            next(err);
        }
    }




}

module.exports = new dashboardController