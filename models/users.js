var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:login1-2@localhost:5432/postgres';
var db = pgp(connectionString);

function getAllUsers(req, res, next) {
    db.any('select * from users')
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL puppies'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function getSingleUser(req, res, next) {
    var userID = parseInt(req.params.id);
    db.one('select * from users where id = $1', userID)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE user'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function getUserByEmail(req, res, next) {
    var email = req.params.email;
    console.log(email);
    db.one('select * from users where profile_id = $1', email)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE user'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function createUser(req, res, next) {
    console.log(req.body);
    let user_email = req.body.email;
    db.one('select * from users where email = $1', user_email)
        .then(function(data) {
            console.log(data);
            if (data.email == req.body.email) {
                res.status(200)
                    .json({
                        status: 'error',
                        message: 'user email existed allready'
                    });
            }

        })
        .catch(function(err) {
            //return next(err);
            db.none('insert into users(first_name, last_name,email,profile_id, phone,password,profilePicture)' +
                    'values(${first_name}, ${last_name}, ${email},${profile_id}, ${phone}, ${password}, ${profilePicture})',
                    req.body)
                .then(function(data) {
                    console.log("user data after signUp");
                    console.log(data);
                    db.one('select * from users where email = $1', user_email)
                        .then(function(data) {
                            console.log(data);
                            res.status(200)
                                .json({
                                    status: 'success',
                                    message: 'Inserted one user',
                                    user: data
                                });
                        })
                        .catch(function(err) {
                            return next(err);
                        })

                })
                .catch(function(err) {
                    return next(err);
                });
        });
}

function updateUser(req, res, next) {
    db.none('update users set first_name=$1, last_name=$2,profile_id=$3, email=$4, phone=$5 , password=$6 ,profilePicture=$7 where id=$8', [req.body.first_name, req.body.last_name, req.body.profile_id, req.body.email, parseInt(req.body.phone), req.body.password, req.body.profilePicture,
            parseInt(req.params.id)
        ])
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated puppy'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function removeUser(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.result('delete from users where id = $1', pupID)
        .then(function(result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} puppy`
                });
            /* jshint ignore:end */
        })
        .catch(function(err) {
            return next(err);
        });
}

function validateUser(req, res, next) {
    console.log(req.body.email);
    console.log(req.body.password);
    var user_email = req.body.email;
    db.one('select * from users where email = $1', user_email)
        .then(function(data) {
            console.log(data);
            if (data.password == req.body.password) {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Retrieved ONE user'
                    });
            } else {
                res.status(200)
                    .json({
                        status: 'failure',
                        message: 'password not matched'
                    });
            }

        })
        .catch(function(err) {
            return next(err);
        });
}

module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    createUser: createUser,
    updateUser: updateUser,
    removeUser: removeUser,
    validateUser: validateUser,
    getUserByEmail: getUserByEmail
};