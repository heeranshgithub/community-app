import User from '../models/User.js'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'

const getTree = async (req, res) => {
  const _id = req.params.id

  // Check if the ID is valid
  if (!mongoose.isValidObjectId(_id)) {
    throw new BadRequestError('Invalid Tree ID format!')
  }

  const tree = await User.findOne({ _id: _id })

  if (!tree) throw new NotFoundError('Tree not found!')

  res.status(StatusCodes.OK).json(tree)
}

export { getTree }
