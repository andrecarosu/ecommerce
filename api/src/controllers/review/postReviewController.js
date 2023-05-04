const { Product, Supplier, User, Review } = require("../../db");
const { Op } = require("sequelize")

const createReview = async ({ email, product_id, ...review }) => {
  try {
    const { comment, scoring } = review

    const productExistent = await Product.findByPk(product_id)


    const userExistent = await User.findOne({
      where: {
        email: {
          [Op.iLike]: `%${email}%`,
        },
      }
    })


    if (!productExistent || !userExistent) {
      throw new Error('No se encontro el usuario o el producto')
    }

    const reviewExistent = await Review.findOne({
      where: {
        product_id: product_id,
        user_id: userExistent.user_id
      }
    })


    if (!reviewExistent) {
      const newReview = await Review.create({
        comments: { comment },
        scoring
      });

      await newReview.setUser(userExistent)
      await newReview.setProduct(productExistent)
    } else {
      //console.log(reviewExistent)
      // const b = reviewExistent.comments.push(comment)
      // //reviewExistent.comments = [...reviewExistent.comments, comment];
      await reviewExistent.update(
        {
          comments: { comment }
        }
      )
      //await reviewExistent.save()
    }







    return;
  } catch (error) {
    console.log(error)
    throw new Error('Ocurrio u problema')
  }

};

module.exports = { createReview };
