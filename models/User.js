import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, 'Please provide number'],
    minlength: 8,
    maxlength: 15,
    trim: true, // trims any extra space from start or end, will also take care of this in the fronted
    unique: true, // enforces uniqueness of the mobile number
  },
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  password: {
    type: String,
    // not setting to required because one user can create the profile of another user
    minlength: 6,
    maxlength: 30,
    select: false,
    trim: true, // trims any extra space from start or end, will also take care of this in the fronted
    // setting select: false for the password field means that by default,
    // the password field will not be included in query
    // results when fetching documents from the database using Mongoose.
  },
  createdBy: {
    type: String, // some _id
    trim: true,
    // this field won't be there, when a user creates their own profile, so not required
  },

  gender: {
    type: String,
    minlength: 4,
    maxlength: 6,
    trim: true,
  },
  address: {
    type: String,
    minlength: 3,
    maxlength: 75,
    trim: true,
  },
  education: {
    type: String,
    minlength: 1,
    maxlength: 20,
    trim: true,
  },
  company: {
    type: String,
    minlength: 1,
    maxlength: 20,
    trim: true,
  },
  father: {
    type: String, // will just save their _id, length of _id is 24
    minlength: 24,
    maxlength: 24,
    trim: true,
  },
  mother: {
    type: String, // will just save their _id,length of _id is 24
    minlength: 24,
    maxlength: 24,
    trim: true,
  },
  spouse: {
    type: String, // will just save their _id, length of _id is 24
    minlength: 24,
    maxlength: 24,
    trim: true,
  },
  siblings: {
    type: [String], // array of _ids
    validate: {
      validator: function (value) {
        return value.length <= 20 // Limit the array to 20 siblings
      },
      message: 'A user can have at most 20 siblings.',
    },
  },
  children: {
    type: [String], // array of _ids
    validate: {
      validator: function (value) {
        return value.length <= 20 // Limit the array to 20 children
      },
      message: 'A user can have at most 20 children.',
    },
  },
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return //don't want to hash pass again for updateUser
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  //this 'await has no effect' warning is related to linting or TypeScript rules
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

export default mongoose.model('User', UserSchema)
