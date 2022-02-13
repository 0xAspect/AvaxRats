import React from "react";
import './Popup.css'
import Card from "react-bootstrap/Card";
import "../index.css";


 

const Popup = props => {
  return (
    <div>


    <div className="popup-box" onClick={props.handleClose}>
      {/* <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
      
     
    </div>
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div> */}
<Card className="box" style={{ width: '45%'  }}>
<span className="close-icon" onClick={props.handleClose}>x</span>
  <Card.Body>
    <Card.Title>{props.header}</Card.Title>
{props.content}


  </Card.Body>

</Card>
</div>

    </div>
  );
};
 
export default Popup;