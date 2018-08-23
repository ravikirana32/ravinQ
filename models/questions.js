var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:login1-2@localhost:5432/postgres';
var db = pgp(connectionString);

function getAllQuestions(req, res, next) {
    console.log("inside get all topics");
    db.any('select * from questions')
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

// function getSingleTopic(req, res, next) {
//     var pupID = parseInt(req.params.id);
//     db.one('select * from topics where id = $1', pupID)
//         .then(function(data) {
//             res.status(200)
//                 .json({
//                     status: 'success',
//                     data: data,
//                     message: 'Retrieved ONE puppy'
//                 });
//         })
//         .catch(function(err) {
//             return next(err);
//         });
// }

function createQuestions(req, res, next) {
    console.log("CRETE Questions");
    //req.body.age = parseInt(req.body.age);
    console.log(req.body);
    db.none('insert into questions(question, hint, solution, topic_id,user_id,answers)' +
            'values(${question}, ${hint}, ${solution}, ${topic_id}, ${user_id}, ${answers})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one question'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

// function updateTopic(req, res, next) {
//     db.none('update topics set name=$1, keywords=$2, description=$3, category=$4 access=$5 topic_image=$6 owner_profile_id=$7 where id=$8', [req.body.name, req.body.keywords, req.body.description, req.body.category, req.body.access, req.body.topic_image, req.body.owner_profile_id,
//             parseInt(req.params.id)
//         ])
//         .then(function() {
//             res.status(200)
//                 .json({
//                     status: 'success',
//                     message: 'Updated puppy'
//                 });
//         })
//         .catch(function(err) {
//             return next(err);
//         });
// }

// function removeTopic(req, res, next) {
//     var pupID = parseInt(req.params.id);
//     db.result('delete from topics where id = $1', pupID)
//         .then(function(result) {
//             /* jshint ignore:start */
//             res.status(200)
//                 .json({
//                     status: 'success',
//                     message: `Removed ${result.rowCount} puppy`
//                 });
//             /* jshint ignore:end */
//         })
//         .catch(function(err) {
//             return next(err);
//         });
// }

function getTopicQuestions(req, res, next) {
    console.log("inside get all topic questions");
    var topicID = parseInt(req.params.id);
    console.log(topicID);
    db.any('select * from questions  where topic_id = $1', topicID)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL questions'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}


module.exports = {
    // getAllTopics: getAllTopics,
    // getSingleTopic: getSingleTopic,
    // createTopic: createTopic,
    // updateTopic: updateTopic,
    // removeTopic: removeTopic,
    getAllQuestions: getAllQuestions,
    createQuestions: createQuestions,
    getTopicQuestions: getTopicQuestions
};