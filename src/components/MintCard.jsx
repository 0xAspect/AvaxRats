import React, {useState} from "react";
import image from "../assets/images/avax-logo.svg";
import './Mint.css'
import './Home.css'





// import Button from "react-bootstrap/Button";
import 'reactjs-popup/dist/index.css';



function MintCard(props) {

  const [mintAmount, setMintAmount] = useState(1);

    const mintRat = () => {
        props.mintRat(mintAmount)
    }
    const handleMintAmountChange = (event) => {
      
        
        if (event.target.value == 'up'){
            if (mintAmount < 20 ){
                setMintAmount(mintAmount+1)
            }
        }
        if (event.target.value == 'down'){
            if (mintAmount > 1 ){
                setMintAmount(mintAmount-1)
            }
        }
    }
    
  return (

<div class="card mint-card" style = {{width: '100%'}}>
    <div class="card-horizontal  " >
        <div class="img-square-wrapper">
        </div>
        <div class="card-body">
            <h1 class="card-title">Mint Now</h1>
            <h4 class="card-title"> Cost: <img src={image} width ="25px"></img> 1</h4>
            <h4> {props.nftTotalSupply}/10,000 Rats minted so far</h4>
            <div onClick={handleMintAmountChange} width='100%'> <button value='down' class='button-54 btn-down' >-</button> <button class=' button-54 btn-mid' >{mintAmount}</button> <button class='button-54 btn-up' value='up'>+</button>   </div>
            <div>
              {props.userAddress != 'none' 
              ? <div>{props.isLive === true ? <button  class="button-54 btn-margin" onClick={mintRat}> <a>Mint! </a> </button> : <button  class="button-54 btn-margin" > <a>Mint! (SOON) </a> </button> }</div>
              : <button  class="button-54 btn-margin" onClick={props.web3Enabled}> <a> PLEASE CONNECT WALLET </a> </button> }
              </div> 
            
            <p></p>
            <p class="card-text"> Avax: {Math.round(props.avaxBalance * 100) / 100}</p>
        </div>
    </div>
  
</div>

  );
} 
export default MintCard;
