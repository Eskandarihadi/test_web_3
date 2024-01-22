

class controllers{
    error(massege,status = 500){
        let err = new Error(massege);
        err.status = status;
        throw err;
    }
}

module.exports = controllers;