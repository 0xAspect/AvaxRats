import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { nftFactoryAddress, nfTradeAddress} from "../assets/addresses.js";
import arrow from "./arrow.css";

export default function NFTDisplay(props) {
  const [rat, setRat] = useState("");
  const [ratLevelnum, setRatLevel] = useState("");
  const [ratYield, setRatYield] = useState("");
  const [ratlevelCost, setRatLevelCost] = useState(" ");
  const [ratGatherTime, setRatGatherTime] = useState(" ");
  const [showMeta, setShowMeta] = useState(false);
  const [uri, setUri] = useState("");

  const DailyYield = Math.round((ratYield / ratGatherTime) * 60 * 60 * 24);

  const nftradeUrl = nfTradeAddress + nftFactoryAddress + "/" + props.id;
  //style properties

  const [rarity, setRarity] = useState("");


  console.log(props.revealMax);
  const fetchData = async () => {
    const uri = await props.loadRatUri(props.id);
    const response = await axios.get(uri);
    setRat(response.data);
    console.log(response.data);
    console.log(props.id);
    if (props.revealMax > props.id) {
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
    }

  };

  const handleMeta = async () => {
    setShowMeta(!showMeta);
  };

  const ratLevel = async () => {
    let x = await props.loadRatLevel(props.id);
    setRatLevel(x);
  };

  const gatherTime = async () => {
    let x = await props.loadGatherTime(props.id);
    setRatGatherTime(x);
  };
  const ratYieldFunc = async () => {
    let y = await props.loadRatYield(props.id);
    setRatYield(y);
  };
  const levelUp = async () => {
    props.levelUpRat(props.id);
  };
  const levelUpCost = async () => {
    let cost = await props.levelUpRatCost(props.id);
    setRatLevelCost(cost);
  };
  // const claimYield = async() => {
  //   props.claimRatYield(props.id)
  // }
  console.log(rarity);

  useEffect(() => {
    const interval = setInterval(async () => {
      fetchData();
      ratLevel();
      levelUpCost();
      if (props.farmLive == true){
        ratYieldFunc();
        gatherTime();
      }

    }, 2000);
  }, [props.userAddress]);

  const style1 = {
    width: "20rem",
  };

  const bold = {
    fontWeight: "bold",
  };
  return (
    <div className="col-xs-6 col-md-4" style={style1}>
      {rat && (
        <Card style={{ textAlign: "left" }} hover varient="dark">
          <Card.Img src={rat.image} />
          <Card.Body>
            <Card.Title onClick={handleMeta} style={{ color: "black" }}>
              <h4>
                {" "}
                {rat.name}{" "}
                <span style={{ textAlign: "right" }} onClick={handleMeta}>
                  <i class={showMeta === false ? "arrow up" : "arrow down"}></i>
                </span>
              </h4>{" "}
              <h5>
  
                Level {ratLevelnum}{" "}
                <a style={{ color: rarity }}>{props.revealMax >= props.id ? rat.attributes[0].value : "Rat"} </a>{" "}
              </h5>{" "}
              <h5>
                Trinkets gathered: {ratYield} ({DailyYield}/day){" "}
              </h5>
            </Card.Title>
            <>
              {showMeta && (
                <>
                <Table hover varient="dark" size="sm">
                  <tbody>
                    <tr>
                      <td> Rarity </td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {props.revealMax >= props.id ? rat.attributes[0].value: "?"}
                      </td>
                    </tr>
                    <tr>
                      <td> Background</td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {props.revealMax >= props.id ? rat.attributes[1].value: "?"}
                      </td>
                    </tr>
                    <tr>
                      <td> Fur</td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {props.revealMax >= props.id ? rat.attributes[2].value: "?"}
                      </td>
                    </tr>
                    <tr>
                      <td> Eyes</td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {props.revealMax >= props.id ? rat.attributes[3].value: "?"}
                      </td>
                    </tr>
                    <tr>
                      <td> Whiskers</td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {props.revealMax >= props.id ? rat.attributes[4].value: "?"}
                      </td>
                    </tr>
                    <tr>
                      <td> Ears</td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {props.revealMax >= props.id ? rat.attributes[5].value: "?"}
                      </td>
                    </tr>
                    <tr>
                      <td> Nose </td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {props.revealMax >= props.id ? rat.attributes[6].value: "?"}
                      </td>
                    </tr>
                    <tr>
                      <td> Tail </td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {props.revealMax >= props.id ? rat.attributes[7].value: "?"}
                      </td>
                    </tr>
                    <tr>
                      <td> Clothes </td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {props.revealMax >= props.id ? rat.attributes[8].value: "?"}
                      </td>
                    </tr>
                  </tbody>
                  
                </Table>
                 <Table size="sm">
                 <tbody>
                     <tr>
                       <td>Ferocity</td>
                       <td>Cunning</td>
                       <td>Agility</td>
                     </tr>
                     <tr>
                       <td>{props.revealMax >= props.id ? rat.attributes[9].value: "?"}
</td>
<td>{props.revealMax >= props.id ? rat.attributes[10].value: "?"} </td>
<td>{props.revealMax >= props.id ? rat.attributes[11].value: "?"} </td>

                     </tr>
                     <tr>
                       <td colSpan={3}>
                         {" "}
                         <a href={nftradeUrl}> view on NFTtrade</a>
                       </td>
                     </tr>
                     </tbody>
                 </Table>
                 </>
              )}
            </>
            <button class="button-54" role="button" onClick={levelUp}>
              {" "}
              <a>level up: {ratlevelCost} $NiBBLES </a>{" "}
            </button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
