import { BadRequestError } from '../errors/index.js';
import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res) => {
  const { name, number, gender, password } = req.body;

  if (!name || !number || !gender || !password)
    throw new BadRequestError('Please provide all values!');

  const numberExists = await User.findOne({ number }); // could've also written {number: number}

  if (numberExists) throw new BadRequestError('Number already in use!');

  if (password.length < 6)
    throw new BadRequestError('Password must be longer than 6 characters!');

  const user = await User.create({ number, name, gender, password });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      number: user.number,
      gender: user.gender,
      token,
      id: user._id,
    },
  });
};

const login = async (req, res) => {
  const { number, password } = req.body;
  if (!number || !password)
    throw new BadRequestError('Please provide all values!');

  const user = await User.findOne({ number }).select('+password');
  if (!user) throw new BadRequestError('Invalid Credentials!');
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new BadRequestError('Invalid Credentials!');

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      number: user.number,
      gender: user.gender,
      token,
      id: user._id,
    },
  });
};

export { register, login };
