import React, { useState} from 'react'
import axios from "axios";
import {nftFactoryAddress, nfTradeAddress, uri}from '../assets/addresses.js';



export default function SimpleNFT(props) {

  


    const [ rat, setRat ] = useState('');
    const [rarity, setRarity] = useState("");

    const metadataUrl = (uri + props.id + '.json');

    const fetchData = async () => {
        const response = await axios.get(metadataUrl);
        setRat(response.data);
        const rarity = response.data.attributes[0].value;
        if (rarity == "Common") {
          setRarity("fffff");
        }
        if (rarity == "Uncommon") {
          setRarity("#1eff00");
        }
        if (rarity == "Rare") {
          setRarity("#0070dd");
        }
        if (rarity == "Epic") {
          setRarity("#a335ee");
        }
        if (rarity == "Legendary") {
          setRarity("#ff8000");
        }

    };

    fetchData();


    const style1 = {
        width: '20rem'  
    }
    const style2 = {
        width: '65%',  
        boxshadow: "1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px"

    }
    const bold = {
        fontWeight: 'bold'
    }
    
    return (
<>{rat && 

<div>
<img style = {style2 } src={rat.image}></img>
<p></p>
<h4>{rat.name}<a style={{ color: rarity }}> {" "} {rat.attributes[0].value} </a></h4>
</div> }</>
    )
}