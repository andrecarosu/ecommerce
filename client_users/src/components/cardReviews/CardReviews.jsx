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
        <div className={styles.box}>
          <div className={styles.star}>
            {starList}
          </div>
          <span>
          <label htmlFor="">Usuario: {nombreReview}</label>
          </span>

          <div style={{marginBottom: "20px"}}>
          
            <p className={styles.texto}>
            {comments?.map((comment) => (
    <div key={comment.id}>
          {comment.comment}
    </div>
))}

</p> 


          </div>
          <hr />
        </div>
      </div>
    );
  }
  
export default CardReview 
