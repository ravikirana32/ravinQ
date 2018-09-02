var express = require('express');
var router = express.Router();

var users = require('../models/users');
var topics = require('../models/topics');
var questions = require('../models/questions');
var comments = require('../models/comments');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       name:
 *         type: string
 *       address:
 *         type: string
 *       email:
 *         type: string
 *       phone:
 *         type: bigint
 */
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/api/users', users.getAllUsers);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - users
 *     description: Returns a single users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: users's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single users
 *         schema:
 *           $ref: '#/definitions/users'
 */
router.get('/api/users/:id', users.getSingleUser);
/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - users
 *     description: Creates a new users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: users
 *         description: users object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/api/users', users.createUser);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags: 
 *       - users
 *     description: Updates a single users
 *     produces: 
 *          - application/json
 *     parameters:
 *       - name: users
 *         in: body
 *         description: Fields for the users resource
 *         schema:
 *          type: array
 *          $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/api/users/:id', users.updateUser);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - users
 *     description: Deletes a single users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: users's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/api/users/:id', users.removeUser);

/**
 * @swagger
 * /api/images/{id}:
 *   get:
 *     tags:
 *       - images
 *     description: Returns a single images
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: images's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single images
 *         schema:
 *           $ref: '#/definitions/images'
 */
router.get('/api/images/:name', function(req, res, next) {

    var options = {

        root: __dirname + "/images/",

        dotfiles: 'deny',

        headers: {

            'x-timestamp': Date.now(),

            'x-sent': true

        }

    };

    console.log(req.params.name);

    var fileName = req.params.name; //'1.PNG';//req.params.name;

    res.sendFile(fileName, options, function(err) {

        if (err) {

            next(err);

        } else {

            console.log('Sent:', fileName);

        }

    });

});

router.get('/api/topics', topics.getAllTopics);
router.get('/api/topics/:id', topics.getSingleTopic);
router.post('/api/topics', topics.createTopic);
router.put('/api/topics/:id', topics.updateTopic);
router.delete('/api/topics/:id', topics.removeTopic);

router.get('/api/getUserTopics/:id', topics.getUserTopics);
router.get('/api/getAllPublicTopics', topics.getAllPublicTopics);
router.get('/api/getUserPrivateTopics/:id', topics.getUserPrivateTopics);

router.get('/api/questions', questions.getAllQuestions);
router.post('/api/questions', questions.createQuestions);
router.get('/api/getTopicQuestions/:id', questions.getTopicQuestions);

router.get('/api/getTopicComments/:id', comments.getTopicComments);
router.post('/api/comments', comments.createComment);

router.get('/api/users', users.getAllUsers);
router.get('/api/users/:id', users.getSingleUser);
router.post('/api/users', users.createUser);
router.put('/api/users/:id', users.updateUser);
router.delete('/api/users/:id', users.removeUser);

router.post('/api/validateUser', users.validateUser);
router.get('/api/getUserByEmail/:email', users.getUserByEmail);

module.exports = router;