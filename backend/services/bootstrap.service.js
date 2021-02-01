const User = require("../models/User")
const bcrypt = require("bcrypt")


const createBootstrap = async () => {
  await ifExistUsers()
}

const ifExistUsers = async () => {
  const users = await User.findAll()
  if (!users.length) {
    await createUser()
  }
}

const createUser = async () => {
  const hashedPassword = await bcrypt.hash("password1", 6)
  const user = new User({
    name: "user",
    email: "user@gmail.com",
    password: hashedPassword,
  })
  await user.save()
}

module.exports = {
  createBootstrap,
}
