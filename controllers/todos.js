const Todo = require("../models/Todo");
const User = require("../models/User");

module.exports = {
  getTodos: async (req, res) => {
    // console.log(req.user);
    try {
      const todoItems = await Todo.find({ userId: req.user.id });
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      });

<<<<<<< HEAD
            
            //selects all items that have the same team but do not have the same userId as the current user.
            const teamItems = await Todo.
                find().
                where('team').equals(req.user.team).
                where('userId').ne(req.user._id)
                
            //selects all users that have the same team as the current user
            const teamMembers = await User.
                find().
                where('team').equals(req.user.team)
=======
      // console.log(todoItems);
>>>>>>> b62cc5b8f9d01ff6bf402f2c13c1a558c2bdaf3a

      // const teamItems = await Todo.find({team:req.user.team})//gets all items that have the same team as the user, exluding user's todo list
      // const teamMembers = await User.find({team:req.user.team})//gets all users from the User model


      //added for dropdown
      const todoStatus = await Todo.find()
        .where("status")
        .equals(req.user.status);

      // console.log(req.user.status);

      teamItems.forEach((item) => {
        teamMembers.forEach((member) => {
          if (member._id == item.userId) {
            item.userName == member.status;
          }
        });
      });

      res.render("todos.ejs", {
        todos: todoItems,
        left: itemsLeft,
        user: req.user,
        team: teamItems,
        teamMembers: teamMembers,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createTodo: async (req, res) => {
    try {
      let dueDate = req.body.dueDate;
      console.log(`dueDate: ${dueDate}`);
      let dueDateSliced = dueDate.slice(0, 11);
      console.log(`dueDateSliced: ${dueDateSliced}`);
      await Todo.create({
        todo: req.body.todoItem,
        completed: false,
        userId: req.body.teamMember,
        dueDate: dueDateSliced,
        status: "not started",
        team: req.user.team,
      });
      console.log("Todo has been added!");
      res.redirect("/todos");
    } catch (err) {
      console.log(err);
    }
  },
  updateStatus: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          status: req.body.status,
        }
      );
      console.log("Status Updated");
      res.json("Status Updated");
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log("Deleted Todo");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
