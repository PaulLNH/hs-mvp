const users = {
  getAllUsers: (req, res) => {
    res.json({ firstName: "Paul", lastName: "Laird", location: "Portsmouth" });
  },
};

module.exports = users;
