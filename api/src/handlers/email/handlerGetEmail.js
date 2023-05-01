const { getUserByEmail , getAllUsersEmail, getCommerceByEmail } = require("../../controllers/email/getEmailController");



const getUserByEmailHandler = async (req, res, next) => {
  const { email } = req.query;
  try {
    const UserEmail = email? await getUserByEmail(email) : await getAllUsersEmail()
    res.status(200).json(UserEmail)
  } catch (error) {
    next(error)
  }
};

const getCommerceByEmailHandler = async (req, res, next)=>{
  const {email} = req.query
  try{
    const commerceEmail =  await getCommerceByEmail(email)
    res.status(200).json(commerceEmail)
  }catch(error){
    next(error)
  }

}

module.exports = {

  getUserByEmailHandler,
  getCommerceByEmailHandler
}
