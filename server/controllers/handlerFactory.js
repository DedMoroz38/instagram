const catchAsync = require("./../utils/catchAsync");

exports.getOne = (Model) => catchAsync(async (req, res, next) => {
  let query = Model.findById(req.user.rows[0].id);
  const doc = await query;
  if(!doc) {
      return next(new AppErrors('No document found!', 404));
  }
  res.status(200).json({
      status: "success",
      data: {
          data: doc
      }
  });

});