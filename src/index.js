"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("dotenv").config();
var ApolloServer = require("apollo-server").ApolloServer;
var typeDefs_1 = __importDefault(require("./types/typeDefs"));
var typeorm_database_1 = __importDefault(require("./typeorm.database"));
var task_model_1 = require("./entity/task.model");
var taskType_model_1 = require("./entity/taskType.model");
var user_model_1 = require("./entity/user.model");
typeorm_database_1["default"]()
    .then(function () {
    console.log("Database was connected.");
})["catch"](function (error) {
    console.error("Database error:", error);
});
var resolvers = {
    Query: {
        tasks: function (_, _a) {
            var name = _a.name;
            return task_model_1.Task.getRepository().find({ where: { title: name } });
        },
        task: function (_, _a) {
            var id = _a.id;
            return task_model_1.Task.getRepository().findOne({ where: { id: Number } });
        },
        taskTypes: function (_, _a) {
            var name = _a.name;
            return taskType_model_1.TaskType.getRepository().find({ where: { name: name } });
        },
        users: function (_, _a) {
            var name = _a.name;
            return user_model_1.User.getRepository().find({ where: { name: name } });
        }
    },
    Mutation: {
        addTask: function (_, _a) {
            var input = _a.input;
            return task_model_1.Task.getRepository().save(__assign({}, input));
        },
        updateTask: function (_, _a) {
            var input = _a.input, id = _a.id;
            return task_model_1.Task.getRepository().save(__assign(__assign({}, input), { id: id }));
        }
    },
    Task: {
        taskType: function (task) { return taskType_model_1.TaskType.getRepository().find(); },
        executor: function (task) { return user_model_1.User.getRepository().find(); }
    }
};
var server = new ApolloServer({ typeDefs: typeDefs_1["default"] });
server.listen(process.env.PORT, function () {
    console.log("Server ready at " + process.env.PORT);
});
