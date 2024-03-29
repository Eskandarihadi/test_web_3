const passport = require('passport');
const Persons = require('../models/Persons');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');



passport.serializeUser((user,done)=>{
    done(null,user.id)
});

passport.deserializeUser( async (id,done)=>{
    let user = await Persons.findById(id);
    if(user) done(null,user);
})

passport.use('local.register', new localStrategy(
    {
    
    usernameField : 'username',
    passwordFild : 'password',
    passReqToCallback : true
    }
   
    ,async (req ,username , password ,done)=>{
    try{
        let user = await Persons.findOne({username : req.body.username})
        if(user){
            return done(null,false,req.flash('errors', 'There is such user!!!'));

        }
        const newUser = new Persons({
            username : req.body.username ,
            email : req.body.email ,
            password : bcrypt.hashSync(req.body.password, 8),
        });
        await newUser.save();
        done(null,newUser);
    }catch(error){
        return done(error,false,{message : error})
    }
    
    }
));


passport.use('local.login',new localStrategy(
    {
    usernameField : 'username',
    passwordFild : 'password',
    passReqToCallback : true
    } , async (req , username , password ,done)=>{
        try{
            let user = await Persons.findOne({username : req.body.username})
            if(!user || !bcrypt.compareSync(req.body.password , user.password)){
            return done(null , false , req.flash('errors','your information is no coordination'));

            }
            done(null , user);
        }catch(error){
            return done(error,false,{message : error})
        }


    }   ))