import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { nftFactoryAddress, nfTradeAddress, uri } from "../assets/addresses.js";
import arrow from "./arrow.css";

export default function NFTDisplay(props) {
  const [rat, setRat] = useState("");
  const [ratLevelnum, setRatLevel] = useState("");
  const [ratYield, setRatYield] = useState("");
  const [ratlevelCost, setRatLevelCost] = useState(" ");
  const [ratGatherTime, setRatGatherTime] = useState(" ");
  const [showMeta, setShowMeta] = useState(false);

  const DailyYield = Math.round((ratYield / ratGatherTime) * 60 * 60 * 24);
  const metadataUrl = uri + props.id + ".json";
  const nftradeUrl = nfTradeAddress + nftFactoryAddress + "/" + props.id;

  //style properties

  const [rarity, setRarity] = useState("");

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
    const interval = setInterval(() => {
      fetchData();
      ratLevel();
      levelUpCost();
      ratYieldFunc();
      gatherTime();
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
                <a style={{ color: rarity }}>{rat.attributes[0].value}</a>{" "}
              </h5>{" "}
              <h5>
                Trinkets gathered: {ratYield} ({DailyYield}/day){" "}
              </h5>
            </Card.Title>
            <>
              {showMeta && (
                <Table hover varient="dark" size="sm">
                  <tbody>
                    <tr>
                      <td> {rat.attributes[1].trait_type}</td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {rat.attributes[1].value}
                      </td>
                    </tr>
                    <tr>
                      <td> {rat.attributes[2].trait_type}</td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {rat.attributes[2].value}
                      </td>
                    </tr>
                    <tr>
                      <td> {rat.attributes[3].trait_type}</td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {rat.attributes[3].value}
                      </td>
                    </tr>
                    <tr>
                      <td> {rat.attributes[4].trait_type}</td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {rat.attributes[4].value}
                      </td>
                    </tr>
                    <tr>
                      <td> {rat.attributes[5].trait_type}</td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {rat.attributes[5].value}
                      </td>
                    </tr>
                    <tr>
                      <td> {rat.attributes[6].trait_type}</td>
                      <td colSpan={2} style={bold}>
                        {" "}
                        {rat.attributes[6].value}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={2}>
                        {" "}
                        <a href={nftradeUrl}> view on NFTtrade</a>
                      </td>
                    </tr>
                  </tbody>
                </Table>
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
