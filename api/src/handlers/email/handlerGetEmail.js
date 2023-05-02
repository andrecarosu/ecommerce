const { getUserByEmail , getAllUsersEmail} = require("../../controllers/email/getEmailController");



const getUserByEmailHandler = async (req, res, next) => {
  const { email } = req.query;
  try {
    const UserEmail = email? await getUserByEmail(email) : await getAllUsersEmail()
    res.status(200).json(UserEmail)
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getUserByEmailHandler,
}
