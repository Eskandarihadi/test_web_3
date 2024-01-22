const Controller = require('./controller');
const Persons = require('../models/Persons');
const { query, validationResult, check } = require('express-validator');
const passport = require('passport')

class authController extends Controller {
    async loginform(req, res, next) {
        try {
            res.render('auth/login')
        } catch (err) {
            next(err);
        }

    }
    async registerform(req, res, next) {
        try {
            res.render('auth/register')
        } catch (err) {
            next(err);
        }

    }


    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let my_errors = errors.array().map(err=>err.msg)
                req.flash('errors', my_errors)
                return res.redirect('/auth/login');
            }
            // passport.authenticate('local.login',(err,user)=>{
            //     if(!user) return res.redirect('/auth/login');
            //     else{
            //     req.logIn(user,err=>{
            //     return res.redirect('/dashboard')}
            //     )}
            // })
            passport.authenticate('local.login',{
                successRedirect : '/dashboard',
                failureRedirect : '/auth/login',
                failureFlash : true
            })(req,res,next)

        } catch (err) {
            next(err);
        }



    }
    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let my_errors = errors.array().map(err=>err.msg)
                req.flash('errors', my_errors)
                return res.redirect('/auth/register');
            }
            passport.authenticate('local.register',{
                successRedirect : '/dashboard',
                failureRedirect : '/auth/register',
                failureFlash : true
            })(req,res,next)
        } catch (err) {
            next(err);
        }


    }






}

module.exports = new authController;