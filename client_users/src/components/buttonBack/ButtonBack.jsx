import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ButtonBack() {
    const history = useHistory()

    function onClick() {
        history.push('/')
    }

    return (
        <div 
        onClick={onClick} 
        style={{ borderRadius: '50%', position: 'absolute', left: '20px', top: '25px', cursor:"pointer", width:"10px", height:"10px" }}>
           <div style={{display:"flex", padding:"10px", }}>
            <h3 
                style={
                    {margin:"0px 0px 0px 10px", 
                    color:"white"
                }}
            > <FontAwesomeIcon icon={faArrowLeft} size="lg" style={{color:"#ADADAD"}}/>
            </h3>
           </div>
        </div>
    )
}