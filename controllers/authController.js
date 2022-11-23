import User from "../models/User.js"

const register = async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new Error("Please provide all values")
  }

  const user = await User.create({ name, email, password })
  res.status(201).json({ user })
}

const login = (req, res) => {
  res.send("login user")
}
const updateUser = (req, res) => {
  res.send("update user")
}

export { register, login, updateUser }
