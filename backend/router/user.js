
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


// add user
router.post('/add-users', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        userRole: req.body.userRole,
        username: req.body.username,
        doctor:req.body.doctor,
        password: hash
      });
      user.save()
        .then(savedUser => {
          res.status(201).json({
            message: 'user created',
            savedUser: savedUser
          })
        })
        .catch(error => {
          res.status(500).json({
            message: 'Invalid authentication credentials!'
          })
        })
    })
})

// login user
router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Invalid authentication credentials!'
        })
      }
      fetchedUser = user
      // return promise true or false
      return bcrypt.compare(req.body.password, user.password)
    }).then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }

      const token = jwt.sign({
        username: fetchedUser.username,
        userdId: fetchedUser._id
        // name: fetchedUser.name
      }, 'secert_this_should_be_longer', { expiresIn: '2h' });

      res.status(200).json({
        token: token,
        expiresIn: 7200,
        userId: fetchedUser._id,
        name: fetchedUser.name,
        userRole: fetchedUser.userRole,
        doctor:fetchedUser.doctor
      })
    }).catch(error => {
      res.status(500).json({
        error: error
      })
    })
})

// get userlist
router.get('/user-list', (req, res) => {
  const pageSize = +req.query.pagesize,
    currentPage = +req.query.page
  userQuery = User.find();
  let fetchedUser
  if (pageSize && currentPage) {
    userQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
  }
  userQuery.then(userList => {
    fetchedUser = userList
    return User.count()
  }).then(count => {
    res.status(200).json({
      users: fetchedUser,
      maxCount: count
    })

  })
})

// delete
router.delete('/del-user/:id', (req, res) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
      message: 'one record deleted'
    })
  })
})


// get user by Id
router.get('/user/:id', (req, res) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json({
        user
      })
    } else {
      res.status(4001).json({
        message: 'user not found'
      })
    }
  })
})


// update user
router.put('/edit-user/:id', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        _id: req.params.id,
        name: req.body.name,
        userRole: req.body.userRole,
        username: req.body.username,
        doctor:req.body.doctor,
        password: hash
      });
      console.log(user)
      User.updateOne({ _id: req.params.id}, user ).then(updatedUser => {
        res.status(201).json({
          message: 'update successful'
        })
      })
    })
})



module.exports = router
