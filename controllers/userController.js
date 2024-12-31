import BadRequestError from '../errors/bad-request-error.js'
import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'

const register = async (req, res) => {
  const { name, number, password } = req.body

  if (!name || !number || !password)
    throw new BadRequestError('Please provide all values!')

  const numberExists = await User.findOne({ number }) // could've also written {number: number}

  if (numberExists) throw new BadRequestError('Number already in use!')

  if (password.length < 6)
    throw new BadRequestError('Password must be longer than 6 characters!')

  const user = await User.create({ number, name, password })
  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      number: user.number,
      accessToken: token,
    },
  })
}

export { register }
