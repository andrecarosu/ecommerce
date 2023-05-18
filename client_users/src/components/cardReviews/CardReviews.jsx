import { FaStar, FaRegStar } from 'react-icons/fa';
import styles from "./CardReviews.module.css"

function CardReview({comments, scoring, email}) {
    const maxStars = 5;
    const filledStars = Math.round(scoring);
    const arroba = "@";
    const indice = email.indexOf(arroba);
    const nombreReview = email.slice(0, indice);
    console.log(666, nombreReview);    
    const starList = Array(maxStars).fill().map((_, index) => {
      if (index < filledStars) {
        return <FaStar key={index} />;
      } else {
        return <FaRegStar key={index} />;
      }
    });
    
    return (
      <div className={styles.container}>
        <div className={styles.box} >
          <h4 style={{ padding: "5px", margin:"10px" }}>
            <label htmlFor="">{nombreReview}</label>
          </h4>
          <div style={{display: "flex", justifyContent:"center"}}>
            <hr style={{width: "90%"}}/>
          </div>
          <div style={{marginBottom: "20px", marginTop:"15px", display:"flex", justifyContent:"center" }}>
            <div style={{width: "90%"}}>
              <div className={styles.star}>
                {starList}
              </div>
              <p className={styles.texto} style={{padding: "5px"}}>
                {comments?.map((comment) => (
                  <div key={comment.id}>
                    {comment.comment}
                  </div>
                ))}
              </p>
              </div> 
          </div>
        </div>
      </div>
    );
  }
  
export default CardReview 
