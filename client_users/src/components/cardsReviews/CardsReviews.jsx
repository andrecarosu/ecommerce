import CardReview from "../cardReviews/CardReviews"
import { useSelector } from "react-redux"
function CardsReviews(){
 const {reviews} = useSelector((state)=> state)
    return(
    <div>
        <div style={{display:"flex", justifyContent:"flex-start", margin:"20px 20px 20px 50px"}}>
            <h2>Opiniones acerca del producto</h2>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <hr style={{width:"90%"}}/>
        </div>
        {reviews.length ? (
            <div style={{ marginBottom: "30px"}}>
                {reviews.map(review => (
                    <CardReview
                        review_id={review.review_id}
                        email={review.Detail_order.email}
                        comments={review.comments}
                        scoring={review.scoring}
                        product_id={review.product_id}
                    />
                ))}
            </div>
        ) : (
            <div style={{margin: "100px"}}>
                <p style={{fontSize:"1.5rem"}}>Este producto no tiene opiniones aún</p>
            </div>
        )}
    </div>
    )
}
export default CardsReviews