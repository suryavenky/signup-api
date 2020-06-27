const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');
const permission = require('./../services/permissionService');
// TODO: introduce bcrypt to hash the password
// const bcrypt = require('bcrypt');

router.delete(
  '/:id',
  permission.allowIfLoggedin,
  permission.grantAccess('deleteAny', 'profile'),
  async (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      res.status(202).json({ message: 'deleted successfully!!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
);

router.get(
  '/:id',
  permission.allowIfLoggedin,
  permission.grantAccess('readOwn', 'profile'),
  (req, res) => {
    User.findById(req.params.id, (err, doc) => {
      if (!err) {
        if (doc == null)
          res.status(404).json({ message: 'Id not found' });

        res.status(200).json(doc);
      } else {
        res.status(500).json(err);
        console.log('Error retrieving the data...!!' + err);
      }
    });
  },
);

router.get(
  '/',
  permission.allowIfLoggedin,
  permission.grantAccess('readAny', 'profile'),
  (req, res) => {
    const filter = {};
    if (res.locals.loggedInUser.role == 'admin')
      filter.companyName = res.locals.loggedInUser.companyName;
    User.find(filter, (err, doc) => {
      if (!err) {
        if (doc.length == null)
          res.status(404).json({ error: 'No records found' });
        res.status(200).json(doc);
      } else {
        console.log('Error retrieving the data...!!' + err);
        return res
          .status(500)
          .json({ error: 'something went wrong' + err });
      }
    });
  },
);

router.post('/register', async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      city,
      companyName,
      mobile,
    } = req.body;

    if (!companyName)
      res.status(400).json({ message: 'Company name required' });

    const companyExists = await User.exists({ companyName });

    if (companyExists)
      res.status(406).json({
        message: 'admin already exist, choose different company',
      });

    const newUser = new User({
      email,
      password: password,
      role: 'admin',
      firstName,
      lastName,
      mobile,
      city,
      companyName,
    });
    await newUser.save();
    res.status(201).json({ message: 'created successfully' });
  } catch (err) {
    console.log(err);
    if ((err.name = 'validationError')) res.status(400).json(err);
    res.status(500).json({ error: err });
  }
});

router.post(
  '/',
  permission.allowIfLoggedin,
  permission.grantAccess('updateAny', 'profile'),
  async (req, res) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        city,
        companyName,
        mobile,
      } = req.body;

      if (!companyName)
        res.status(400).json({ message: 'Company name required' });

      const companyExists = User.exists({ companyName });

      const role = companyExists ? 'employee' : 'admin';
      if (
        res.locals.loggedInUser.companyName == companyName ||
        res.locals.loggedInUser.role == 'super_admin'
      ) {
        const newUser = new User({
          email,
          password: password,
          role: role || 'employee',
          firstName,
          lastName,
          mobile,
          city,
          companyName,
        });
        await newUser.save();
        res.status(201).json({ message: 'created successfully' });
      } else {
        res.status(400).json({
          message:
            'Only ' + companyName + ' admin can create users..',
        });
      }
    } catch (err) {
      console.log(err);
      if ((err.name = 'validationError')) res.status(400).json(err);
      res.status(500).json({ error: err });
    }
  },
);

router.put(
  '/:id',
  permission.allowIfLoggedin,
  permission.grantAccess('updateAny', 'profile'),
  async (req, res) => {
    const id = req.params.id;
    try {
      await User.findByIdAndUpdate(id, req.body);
      res.status(204).json({ message: 'updated successfully' });
    } catch (err) {
      console.log(err);
      if ((err.name = 'validationError')) res.status(400).json(err);
      res.status(500).json({ error: err });
    }
  },
);

module.exports = router;
