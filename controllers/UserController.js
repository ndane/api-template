import mongoose from 'mongoose';

const User = mongoose.model('Users');

export default {
  users(req, res) {
    User.find({}, (err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  },

  create(req, res) {
    const newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  },

  user(req, res) {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.send(user);
    });
  },

  update(req, res) {
    const dictionary = { _id: req.params.id };

    // Remove ability to update password via update call
    delete req.body.password;

    User.findOneAndUpdate(dictionary, req.body, { new: true }, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  },

  delete(req, res) {
    /* User.remove({ _id: req.params.id }, (err) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `deleted user with ID ${req.params.id}` });
    }); */
    res.json({ message: 'DELETE verb not supported for this model' });
  },
};
