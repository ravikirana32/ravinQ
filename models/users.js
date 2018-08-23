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
    var pupID = parseInt(req.params.id);
    db.one('select * from users where id = $1', pupID)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE puppy'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function createUser(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into users(name, address, email, phone)' +
            'values(${name}, ${address}, ${email}, ${phone})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one puppy'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function updateUser(req, res, next) {
    db.none('update users set name=$1, address=$2, email=$3, phone=$4 where id=$5', [req.body.name, req.body.address, req.body.email, parseInt(req.body.phone),
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


module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    createUser: createUser,
    updateUser: updateUser,
    removeUser: removeUser
};