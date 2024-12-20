const bycrypt = require("bcrypt");
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password are required." });

  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  //evaluate password
  const match = await bycrypt.compare(pwd, foundUser.password);
  if (match) {
    //create JWT
    res.json({ success: `User ${user} is logged in` });
  } else {
    res.sendStatus(401).json({ failure: "Not authorized" });
  }
};

module.exports = { handleLogin };
