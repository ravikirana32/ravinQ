var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:login1-2@localhost:5432/postgres';
var db = pgp(connectionString);

function createComment(req, res, next) {
    console.log("CRETE Questions");
    //req.body.age = parseInt(req.body.age);
    console.log(req.body);
    db.none('insert into comments(owner_profile_id, owner_name, comment,topic_id)' +
            'values(${owner_profile_id}, ${owner_name}, ${comment}, ${topic_id})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one comment'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function getTopicComments(req, res, next) {
    console.log("inside get all topic questions");
    var Topic_ID = parseInt(req.params.id);
    console.log(Topic_ID);
    db.any('select * from comments  where topic_id = $1', Topic_ID)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL Comments'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}


module.exports = {
    createComment: createComment,
    getTopicComments: getTopicComments
};