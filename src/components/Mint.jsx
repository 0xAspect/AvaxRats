import React, {useEffect, useCallback, useState} from "react";
import Card from "react-bootstrap/Card";
import image from "../assets/images/avax-logo.svg";
import './Mint.css'
import './Home.css'
import {imgUri} from "../assets/addresses.js"
import rat from "../assets/images/tester.png";
import MintCard from "./MintCard.jsx";




// import Button from "react-bootstrap/Button";
import 'reactjs-popup/dist/index.css';



function Mint(props) {

  const [uris, setURIs] = useState(['']);


  const randomUris = () => {
    var uris = [];
    for(var i = 0; i < 6; i++) {
      var imgURL = imgUri + (Math.floor((Math.random() * 100) + 1)).toString() + '.png';
      uris.push(imgURL);
    }
    setURIs(uris);
  }
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
    
    useEffect(() => {
        randomUris()
        }, [props.userAddress])

  return (
    
    <div class="container-fluid bg-dark text-light p-7" >
    <div class="container bg-dark p-5">
      <h1 class="display-4 fw-bold ">Grow your mischief - Mint $RATS</h1>


        <div class="card mint-card">
    <div class="card-horizontal " >        
    <div class="card-body"> 
    <h3 class="card-title">Rat Keeper:</h3> <p>{props.userAddress}</p></div>
      </div>
      </div>

<MintCard
  userAddress={props.userAddress}
  web3Enabled={props.web3Enabled}
  mintRat={props.mintRat}
  nftTotalSupply={props.nftTotalSupply}
  avaxBalance={props.avaxBalance}></MintCard>
<div class="card ">
    <div class="card-horizontal " >
        <div class="img-square-wrapper">
          {uris.map(uri=> ( 
              <img class="imgSizer" src={rat} alt={rat}/>
          ))}
        </div>
   
    </div>
  
</div>

     </div>

   </div>
  );
} 
export default Mint;
