const Controller = require('./controller');
const Persons = require('../models/Persons');
const { query, validationResult, check } = require('express-validator');


class UserController extends Controller {
    async getAllusers(req, res, next) {
        try {
            
            let person = await Persons.find({});
            res.render('home', {
                users: person,
                del : req.flash('del'),
                info : req.flash('info'),
                update: req.flash('update')
            });
        } catch (err) {
            next(err);
        }
    }

    getHomeForm(req, res, next) {
        try {
            res.render('form');
        } catch (err) {
            next(err);
        }
    }


    async postUsers(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let my_errors = errors.array().map(err=>err.msg)
                req.flash('errors', my_errors)
                return res.redirect('/home/form');
            }


            req.body.id = parseInt(req.body._id)
            let newPerson = new Persons({
                id: req.body._id,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            await newPerson.save()
            req.flash('info', 'added a new information ****')
            res.redirect('/home')
        } catch (err) {
            next(err);
        }
    }


    async getOneUser(req, res, next) {
        try {
            let user = await Persons.findOne({ id: req.params._id });
            if(!user){
                this.error('this user not found', 404);
            }
            res.render('persoon', { user: user })
        } catch (err) {
            next(err);
        }
    }


    async putUsers(req, res, next) {
        try {
            await Persons.updateOne({ id: req.params._id }, { $set: req.body });

            req.flash('update', 'person updateing $$$')
            res.redirect('/home')
        } catch (err) {
            next(err);
        }
    }

    async deleteUsers(req, res, next) {
        try {
            await Persons.deleteOne({ id: req.params._id });
            req.flash('del', '!!!!deleted user!!!!');
            res.redirect('/home')
        } catch (err) {
            next(err);
        }



    }
}

module.exports = new UserController;