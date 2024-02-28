const catchAsync = fn => (req, res, next) => {
    fn(req, res, next).catch(err => {
        console.log(err.stack)
        delete err.stack;
        next(err)
    });
};

module.exports = catchAsync;
