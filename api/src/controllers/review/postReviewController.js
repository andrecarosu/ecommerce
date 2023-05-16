const { Product, Detail_order, Review } = require("../../db");
const { Op } = require("sequelize")

const createReview = async ({detail_order_id, product_id, ...review }) => {
  try {
    const { comment, scoring } = review

    const productExistent = await Product.findByPk(product_id)

    const detailExistent = await Detail_order.findOne({
      where: {
        detail_order_id: detail_order_id
      }
    })

    
    if (!productExistent || !detailExistent) {
      throw new Error('No se encontro el detalle o el producto')
    }

    const reviewExistent = await Review.findOne({
      where: {
        product_id: product_id,
        detail_order_id: detailExistent.detail_order_id
      }
    })


    if (!reviewExistent) {
      const newReview = await Review.create({
        comments: { comment },
        scoring,
      });

      await newReview.setDetail_order(detailExistent)
      await newReview.setProduct(productExistent)
    } else {
      //console.log(reviewExistent)
      // const b = reviewExistent.comments.push(comment)
      // //reviewExistent.comments = [...reviewExistent.comments, comment];
      await reviewExistent.update(
        {
          comments: { comment },
          scoring: {scoring}
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
