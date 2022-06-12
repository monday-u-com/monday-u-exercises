var express = require('express');
var router = express.Router();
var Task = require('../models/task')
var Group = require('../models/group')

//index page
router.get('/', function (req, res) {
    var groupName = req.query.groupName;
    var query = Group.find();
    query.exec(function (err, group) {
        tasks = []
        if (groupName != undefined) {
            if (group.length > 1) {
                tasks = group.find(g => g.name == groupName)['tasks']
            } else if (group.length == 1) {
                tasks = group[0]['tasks']
            }
        }

        res.render('index', { group: group, tasks: tasks, groupName: groupName })
    })
})

//add task
router.post('/addtask', function (req, res) {
    var newTask = req.body.newTask
    var groupName = req.body.groupName
    console.log("name" + groupName)
    var task = new Task({ title: newTask, status: 0 })
    Group.updateOne({ name: groupName }, { $push: { tasks: task } }, function (err, model) {
        if (err) console.log(err)
        res.redirect("/?groupName=" + groupName)
    })

})

//remove task
router.get('/removetask/:groupName/:taskId', function (req, res) {
    var taskId = req.params.taskId
    var groupName = req.params.groupName
    Group.findOneAndUpdate(
        { name: groupName },
        { $pull: { 'tasks': { "_id": taskId } } },
        function (err, model) {
            if (err) console.log(err)
            console.log("Tasked marked as complete.")
            res.redirect("/?groupName=" + groupName)
        }
    )

})

//mark task as done
router.get('/marktaskdone/:groupName/:taskId', function (req, res) {
    var taskId = req.params.taskId
    var groupName = req.params.groupName
    Group.findOneAndUpdate(
        { name: groupName },
        { $set: { 'tasks.$[ele].status': 1 } },
        {
            arrayFilters: [{ 'ele._id': taskId }]
        },
        function (err, model) {
            if (err) console.log(err)
            console.log("Tasked marked as complete.")
            res.redirect("/?groupName=" + groupName)
        }
    )
})


//add group
router.get('/addgroup/:name', function (req, res) {
    var groupName = req.params.name;
    var newGroup = new Group({ name: groupName })
    newGroup.save(function (err, newGroup) {
        console.log("Group added")
        res.redirect("/?group=" + groupName)
    })
})

module.exports = router;