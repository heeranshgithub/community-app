import User from '../models/User.js';
import { NotFoundError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

const getTree = async (req, res) => {
  const _id = req.params.id;
  const tree = await User.findOne({ _id });

  if (!tree) throw new NotFoundError('Tree not found!');

  res.status(StatusCodes.OK).json(tree);
};

export { getTree };
