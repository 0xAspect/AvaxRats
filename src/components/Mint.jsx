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

  const [imgs, setImgs] = useState(['']);


  const randomUris = () => {
    var img = [];
    for(var i = 1; i < 7; i++) {
      const imgSrc = require ("../assets/images/samples/" + i + '.png');
      img.push(imgSrc);
    }
    setImgs(img);
  }
  const [mintAmount, setMintAmount] = useState(1);
  console.log(imgs);

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
      <h1 class="display-4 fw-bold ">Grow your mischief - Mint Nibblers</h1>


        <div class="card mint-card">
    <div class="card-horizontal " >        
    <div class="card-body"> 
    <h3 class="card-title">Rat King:</h3> <p>{props.userAddress}</p></div>
      </div>
      </div>

<MintCard
  userAddress={props.userAddress}
  isLive = {props.isLive}
  web3Enabled={props.web3Enabled}
  mintRat={props.mintRat}
  nftTotalSupply={props.nftTotalSupply}
  avaxBalance={props.avaxBalance}></MintCard>
<div class="card ">
    <div class="card-horizontal " >
        <div class="img-square-wrapper">
          {imgs.map(img=> ( 
              <img class="imgSizer" src={img} alt={rat}/>
          ))}
        </div>
   
    </div>
  
</div>

     </div>

   </div>
  );
} 
export default Mint;
