import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
})

//in mongoose docs, here we setting up a middleware "so before we save the doc we want to run some functionality"
UserSchema.pre("save", async function () {
  // iit is a hook that is called before we save the doc, but not every method (like find one) is going to trigger it
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model("User", UserSchema) //User 'will create users collection in mangodb'
