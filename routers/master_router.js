const ex = require('express');
const confing = require('../confing');
const router = ex.Router();



router.use('/home', require('./user_routs'));
router.use('/auth',require('./auth_routs'));
router.use('/dashboard',require('./dashboard_routs'));
router.use('/logout',(req,res)=>{
    res.redirect('/home');
    
})

router.all('*', async (req, res, next) => {
    try {
        let err = new Error('page is not found !!!!!');
        err.status = 404;
        throw err;
    } catch (err) {
        next(err);
    }
})

//mastering errors
router.use(async (err, req, res, next) => {
    const code = err.status || 500;
    const message ='server error';
    const stack = err.stack || '';
    if(confing.debug){
        return res.render('errors/developper',{message,stack})
    }else{
        return res.render(`errors/${code}`,{message})
    }


})
module.exports = router; 