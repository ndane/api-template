module.exports = {
  users(req, res) {
    res.json({ message: 'List of users' });
  },

  create(req, res) {
    res.json({ message: 'Creating a user' });
  },

  user(req, res) {
    res.json({ message: `Single user with id ${req.params.id}` });
  },

  update(req, res) {
    res.json({ message: `Update user with id ${req.params.id}` });
  },

  delete(req, res) {
    res.json({ message: `Delete user with id ${req.params.id}` });
  },
};
