
const express = require('express');
const router = express.Router();
const userController =require('../controller/user')


// add user
router.post('/add-users', userController.addUser)

// login user
router.post('/login', userController.login)

// get userlist
router.get('/user-list',userController.getUserList )

// delete
router.delete('/del-user/:id', userController.deleteUser)


// get user by Id
router.get('/user/:id',userController.getUserById)


// update user
router.put('/edit-user/:id', userController.updateUser)



module.exports = router
