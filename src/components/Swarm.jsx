import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import NFTDisplay from "./NFTDisplay.jsx";
import NFTPre from "./NFTPre.jsx";
import './Home.css'
import trinket from '../assets/images/trinket.png';





function Contact(props) {

  var ids = Array.from(props.nftBalance);
  const [ totalUnclaimedTrinketYield, setTotalUnclaimedTrinketYield ] = useState(0);


  const claimYieldAll = async() => {
    props.claimRatYieldAll(props.userAddress)
  }

  const showTotalUnclaimedYield = async() => {
    const unclaimed = await props.loadTotalUnclaimedTrinketYield(props.userAddress);
    setTotalUnclaimedTrinketYield(unclaimed /10);
  }

  const style1 = {
    paddingTop: "25px",
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (props.userAddress != 'none'){
        if (props.isLive === true){
          showTotalUnclaimedYield()
        }
      }
      },2000);
      }, [props.userAddress])
  return (
<div>
  <div class="container-fluid bg-light text-dark p-7" >
   <div class="container bg-light p-5" style={{textAlign: 'left'}}>
     <h1 class="display-4 fw-bold">NIBBLERS</h1>
       <p>Rat King: {props.userAddress}</p>
       <div>{ids.length != 0 
       &&   <div>     <p>Nibblers: {ids.length} <a style={{marginLeft: "25px"}}>NIBBLES: {Math.round((props.nibblesBalance *100) /100).toLocaleString()}</a> </p>  <div>{totalUnclaimedTrinketYield > 0 && <> <p> Your rats have been hard at work and have gathered {totalUnclaimedTrinketYield} TRINKETS <div style ={{textAlign: 'center'}}> <button type="button" class="button-54" style = {{marginLeft: '25px'}} onClick={claimYieldAll}>Collect TRINKETS </button></div> </p></>  } </div> </div> } </div>

    </div>
  </div>


    <div className="container" style={style1}>
    {props.isConnected == false 
  ? <> <h1>Please connect to view Rats.</h1> <button type="button" class="button-54"onClick={props.web3Enabled}> Connect </button> </>
  :  <div> {ids.length == 0 
            ? <><h1>You have no Rats yet!</h1><NavLink to="/mint"><button type="button" class="button-54"> Mint Rats </button></NavLink></>
            : <div className="row">
            <> {props.reveal == false ?   <>{ids.map(id=> (<NFTPre id = {id}></NFTPre> ))}</>
            : <>{ids.map(id=> ( 
              <NFTDisplay rarity='uncommon' id = {id}               revealMax={props.revealMax}
              loadRatUri = {props.loadRatUri} userAddress={props.userAddress} loadRatLevel={props.loadRatLevel} levelUpRat={props.levelUpRat}levelUpRatCost={props.levelUpRatCost}loadRatYield={props.loadRatYield}claimRatYield={props.claimRatYield} loadGatherTime={props.loadGatherTime} nibblesBalance={props.nibblesBalance} reveal = {props.reveal}></NFTDisplay>
             ))}
             </>}
             </>
            </div>
          }
            </div>  
  }


    </div>
    <p style={style1}></p>
</div>

  );
};




export default Contact;
// export default Contact;
      

