import User from '../models/User.js';
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

const getTree = async (req, res) => {
  const _id = req.params.treeId;
  const tree = await User.findOne({ _id });

  if (!tree) throw new NotFoundError('Tree not found!');

  res.status(StatusCodes.OK).json(tree);
};

const postTree = async (req, res) => {
  const {
    creatorId,
    relation,
    name,
    number,
    dob,
    gender,
    address,
    education,
    company,
    about,
  } = req.body;
  if (
    !creatorId ||
    !relation ||
    !name ||
    !number ||
    !dob ||
    !gender ||
    !address ||
    !education ||
    !company ||
    !about
  ) {
    throw new BadRequestError('Please provide all values!');
  }

  const creatorTree = await User.findOne({ _id: creatorId });
  if (!creatorTree) throw new UnAuthenticatedError('Unauthorized!');

  const tree = await User.create({
    createdBy: creatorId,
    number,
    name,
    dob: dob,
    gender,
    address,
    education,
    company,
    about,
  });

  switch (relation) {
    case 'Father':
      creatorTree.father = tree._id + '-' + tree.name;
      break;
    case 'Mother':
      creatorTree.mother = tree._id + '-' + tree.name;
      break;
    case 'Spouse':
      creatorTree.spouse = tree._id + '-' + tree.name;
      break;
    case 'Child':
      creatorTree.children.push(tree._id + '-' + tree.name + '-' + tree.gender);
      break;
    case 'Sibling':
      creatorTree.siblings.push(tree._id + '-' + tree.name + '-' + tree.gender);
      break;
    default:
      throw new BadRequestError('Invalid relation type!');
  }
  await creatorTree.save();

  res.status(StatusCodes.CREATED).json(tree);
};

export { getTree, postTree };
