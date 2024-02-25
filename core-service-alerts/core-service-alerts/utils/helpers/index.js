const common = require('common-module');;
const APIResponse = require('./APIResponse');
const asyncHandler = async (fn) => function asyncUtilWrap(...args) {
  const fnReturn = fn(...args);
  const res = args[1];
  // const next = args[args.length - 1];
  return Promise.resolve(fnReturn).catch((error) => res.status(common.httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse('Error while performing operation', true, 500, error.message)));
};

module.exports = {
  asyncHandler,
};
