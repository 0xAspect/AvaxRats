import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import cheese from '../assets/images/cheese.png';
import trinket from '../assets/images/trinket.png';

import './Home.css';
import Table from "react-bootstrap/Table";



function About(props) {


  // const DailyYieldPerTrinket = (((((props.unclaimedNibbles / props.stakedTrinketBalance) / props.trinketStakeTime) * 60 ) * 60) * 24);
  // const DailyYield = DailyYieldPerTrinket * props.stakedTrinketBalance;
  // let max = Math.max(props.stakedTrinketBalance, props.trinketBalance);
const [inputValue, setInputValue] = useState(0);
const [maxIsStake, setMaxIsStake] = useState(true);


const inputValueChange = (event) => {
    setInputValue(event.target.value)
  
}
const inputValueChangeMax = (event) => {
  if (maxIsStake === false){
    setInputValue(props.stakedTrinketBalance)
    setMaxIsStake(true);
  }
  else {
    setInputValue(props.trinketBalance)
    setMaxIsStake(false);
  }
  
}

const handleStake = async() => {
    let y = inputValue.toString();
    await props.stake(y);
}

const handleUnstake = async() => {
  if (inputValue <= props.stakedTrinketBalance && inputValue > 0 ){
  let y = inputValue.toString()
  await props.unstake(y);
  }
}

const claimYield = async() => {
  props.claimNibbles(props.userAddress)
}

const trinketStyle = {
  color: '#E84141',
  fontWeight: 'bold',
  textAlign: 'center'

}

const nibbleStyle = {
  color: '#EBDD5B',
  fontWeight: 'bold',
  textAlign: 'center'
}

const cardStyleTrink = {

  height: '260px',
  textAlign: 'center',
  border: '6px solid #E84141'
  
}
const cardStyleNib = {

  height: '260px',
  textAlign: 'center',
  border: '6px solid #EBDD5B',
  marginBotton:'500px'
  
}

  return (

    
    <div className="about">
 
      <div class="container-fluid bg-light text-dark p-7" >
   <div class="container bg-light p-5">
    <h1>Stake <span style={trinketStyle}>TRINKETS</span> to earn <a style={nibbleStyle}>NIBBLES.</a></h1>
    <p></p>
    <h4>Feed $NIBBLES to your rats to level them up!</h4>
     
    </div>

  </div>
  <div className='container' style={{color: "black"}}>
    <div classname="row">

<div className="col" >
<Card style = {cardStyleTrink}> 
<Card.Body>
<Card.Title>
<h1 style={trinketStyle}>TRINKETS</h1>
<img src={trinket} className="icons"></img>
<Table class="table table-borderless" >
<tbody class="table table-borderless" >
  
<tr>
    <td > <a >Trinkets in wallet:</a> </td>
    <td > Trinkets staked:</td>
  </tr>
  <tr>
    <td> <a>{((Math.round(props.trinketBalance *100) /100)).toLocaleString() } </a></td>
    <td  > {(Math.round(props.stakedTrinketBalance *100) /100).toLocaleString() }</td>
  </tr>
  </tbody>

</Table>
</Card.Title>
<>{props.isConnected === true ?
<div style={{textAlign: "center"}}>
<button  class='button-54' style={{marginRight: '0px'}}onClick={inputValueChangeMax}>Max</button><input class='inputTest' type='number' onChange={inputValueChange} value={inputValue} placeholder={inputValue}></input>
<a>{props.isLive === true ? <><button class='button-54' onClick={handleStake}>Stake </button><button class='button-54' onClick={handleUnstake}>Unstake </button></>: <button class='button-54'>(SOON!) </button>}</a>
</div>
: <button  class='button-54'onClick={props.web3Enabled}>Connect to farm!</button>
}</>
</Card.Body>
</Card>
</div>
<>{props.stakedTrinketBalance > 0 && 
<div className="col" style = {{marginBottom:"100px"}} >
<Card style = {cardStyleNib}> 
<Card.Body>
<Card.Title>
<h1 style={nibbleStyle}>NIBBLES</h1>
<img src={cheese} className="icons"></img>
<Table class="table table-borderless" >
<tbody class="table table-borderless" >
  
<tr>
    <td > <a >Pending:</a> </td>
    <td >Balance:</td>
  </tr>
  <tr>
    <td> <a>{(Math.round(props.unclaimedNibbles *100) /100).toLocaleString() }</a></td>
    <td  >  {(Math.round(props.nibblesBalance *100) /100).toLocaleString() }</td>
  </tr>
  </tbody>

</Table>
</Card.Title>
<button  class='button-54'onClick={claimYield}>CLAIM NIBBLES</button>

</Card.Body>
</Card>
</div>
}</>



{/* <div className="col" >{props.stakedTrinketBalance > 0 && 
<Card style = {cardStyle}> 
<Card.Body>
<Card.Title>
<h1 style={nibbleStyle}>NIBBLES </h1>

<div>

<Table class="table table-borderless" >
<tbody class="table table-borderless" >
<tr>
    <td> Pending rewards: </td>
    <td> Nibbles in wallet: </td>
  </tr>
  <tr>
    <td   > {(Math.round(props.unclaimedNibbles *100) /100).toLocaleString() } ({(Math.round(DailyYield *100) /100).toLocaleString() }/day)</td>
    <td  > {(Math.round(props.nibblesBalance *100) /100).toLocaleString() }</td>

  </tr>

  </tbody>
</Table>

<button class='button-54' onClick={claimYield}>Claim Nibbles</button>




</div>

</Card.Title>
</Card.Body>
</Card>
}
</div> */}

</div>
    </div>
    </div>
  );
}

export default About;


