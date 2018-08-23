var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:login1-2@localhost:5432/postgres';
var db = pgp(connectionString);

function getAllTopics(req, res, next) {
    console.log("inside get all topics");
    db.any('select * from topics')
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

function getSingleTopic(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.one('select * from topics where id = $1', pupID)
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

function createTopic(req, res, next) {
    console.log("CRETE TOPIC");
    console.log(req.body);
    db.none('insert into topics(name, keywords, description, category,access,topic_image,owner_profile_id,up_rank,down_rank,review,single_star,two_star,three_star,four_star,five_star)' +
            'values(${name}, ${keywords}, ${description}, ${category}, ${access}, ${topic_image},${owner_profile_id},${up_rank},${down_rank},${review},${single_star},${two_star},${three_star},${four_star},${five_star})',
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

function updateTopic(req, res, next) {
    console.log(req.params.id);
    db.none('update topics set name=$1, keywords=$2, description=$3, category=$4, access=$5, topic_image=$6, owner_profile_id=$7, up_rank=$8, down_rank=$9, review=$10, single_star=$11, two_star=$12, three_star=$13, four_star=$14, five_star=$15 where id=$16', [req.body.name, req.body.keywords, req.body.description, req.body.category, req.body.access, req.body.topic_image, req.body.owner_profile_id, req.body.up_rank, req.body.down_rank, req.body.review, req.body.single_star, req.body.two_star, req.body.three_star, req.body.four_star, req.body.five_star,
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

function removeTopic(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.result('delete from topics where id = $1', pupID)
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

function getUserTopics(req, res, next) {
    console.log("inside get all user topics ");
    var userID = req.params.id;
    console.log(userID);
    db.any('select * from topics  where owner_profile_id = $1', userID)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL topics'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function getAllPublicTopics(req, res, next) {
    console.log("inside get all user topics ");
    var access = "3";
    console.log(access);
    db.any('select * from topics  where access = $1', access)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL topics'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function getUserPrivateTopics(req, res, next) {
    console.log("inside get all user topics ");
    var userID = req.params.id;
    var access = '2';
    console.log(userID);
    db.any('select * from topics  where (access = $1 and owner_profile_id = $2)', [access, userID])
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL topics'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}


module.exports = {
    getAllTopics: getAllTopics,
    getSingleTopic: getSingleTopic,
    createTopic: createTopic,
    updateTopic: updateTopic,
    removeTopic: removeTopic,
    getUserTopics: getUserTopics,
    getAllPublicTopics: getAllPublicTopics,
    getUserPrivateTopics: getUserPrivateTopics
};