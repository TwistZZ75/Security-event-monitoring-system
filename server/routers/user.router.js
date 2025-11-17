const UserController = require('../controllers/user.controller')
const { getUserSchema, postUserSchema, updateUserSchema } = require('../fastify_schemes/user.schemes')

// Экспортируем как плагин Fastify
module.exports = async function(fastify, options) {
    // GET /users
    fastify.get("/users", UserController.getAllUsers);
    //GET one /users
    fastify.get("/users/:id", getUserSchema , UserController.getOneUser);

    // POST /users  
    fastify.post("/users", postUserSchema, UserController.createUser);

    //PUT /users
    fastify.put("/users", updateUserSchema, UserController.updateUser)

    //DELETE /users
    fastify.delete("/users/:id", UserController.deleteUser)

}