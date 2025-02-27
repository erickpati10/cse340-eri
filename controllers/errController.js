const errController = {};

errController.triggerError = async function (req, res, next) {
  try {
    throw new Error("This is an intentional server error!");
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

module.exports = errController;
