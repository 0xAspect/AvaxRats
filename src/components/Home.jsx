import React, { useState, PureComponent } from "react";
import MintCard from "./MintCard";
import Faq from "./Faq";
import image from "../assets/images/rat3.png";
import imageRatCycle from "../assets/images/ratCycle.png";
import imageRarity from "../assets/images/rarity.png";
import list from "../assets/images/tester.png";
import "reactjs-popup/dist/index.css";
import trinket from "../assets/images/trinket.png";

const rarity = {
  Common: "color: '#ffffff' ",
  Uncommon: "#1eff00",
  Rare: "#0070dd",
  Epic: "	#a335ee",
  Legendary: "#ff8000",
};

function Home(props) {
  const [mintAmount, setMintAmount] = useState(1);

  const mintRat = () => {
    props.mintRat(mintAmount);
  };
  const handleMintAmountChange = (event) => {
    if (event.target.value == "up") {
      if (mintAmount < 20) {
        setMintAmount(mintAmount + 1);
      }
    }
    if (event.target.value == "down") {
      if (mintAmount > 1) {
        setMintAmount(mintAmount - 1);
      }
    }
  };

  const coinStyle = {
    color: "#E84141",
    fontWeight: "bold",
    textAlign: "center",
  };
  const nibStyle = {
    color: "#EBDD5B",
    fontWeight: "bold",
    textAlign: "center",
  };
  return (
    <div className="home" style={{ textAlign: "left" }}>
      <div class="container">
        <div class="row align-items-center my-5 lg-0">
          <div class="col-lg-6">
            <h1 class="font-weight-light">Welcome to the SewerVerse</h1>
            <p style={{ fontSize: "20px" }}>
              {" "}
              The AVAX Rats are a collection of 10,000 unique, levelable NFTs.
              RATS are constantly scurrying around in the sewers beneth the
              Avalanche Blockchain on the hunt for{" "}
              <a style={coinStyle}>TRINKETS</a>, the currency of the SewerVerse.
              Each RAT starts life at level 1 but can be fed{" "}
              <a style={nibStyle}>NIBBLES </a> to level up.
            </p>
            <p style={{ fontSize: "20px" }}>
              Each RAT is unique, hand-drawn and is randomly generated from
              numerous traits and assets. All of them are unique, but some are
              are rarer than others and will have rarer traits. You can check
              the Rarity Ranking and Distribution below for the details!
            </p>
          </div>
          <div class="col-lg-6">
            <img class="img-fluid rounded mb-4 mb-lg-0" src={list} alt="" />
          </div>
        </div>
        <MintCard
          userAddress={props.userAddress}
          web3Enabled={props.web3Enabled}
          mintRat={props.mintRat}
          nftTotalSupply={props.nftTotalSupply}
          avaxBalance={props.avaxBalance}
        ></MintCard>
        <div class="row align-items-center my-5 lg-0">
          <div class="col-lg-6">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src={imageRatCycle}
              alt=""
            />
          </div>
          <div class="col-lg-6">
            <h1 class="font-weight-light">The Sewer Game</h1>
            <p style={{ fontSize: "20px" }}>
              Each RAT is constantly roaming the SewerVerse looking for{" "}
              <a style={coinStyle}>TRINKETS.</a>
            </p>
            <p style={{ fontSize: "20px" }}>
              The higher the level the of the RAT the more{" "}
              <a style={coinStyle}>TRINKETS</a> it will find.
            </p>
            <p style={{ fontSize: "20px" }}>
              {" "}
              <a style={coinStyle}>TRINKETS</a> are the currency of the
              SewerVerse and can be STAKED.
            </p>
            <p style={{ fontSize: "20px" }}>
              {" "}
              <a>Staking </a> <a style={coinStyle}>TRINKETS</a> rewards the
              user's swarm with delicous{" "}
              <a a style={nibStyle}>
                NIBBLES.
              </a>
            </p>
            <p style={{ fontSize: "20px" }}>
              {" "}
              <a style={nibStyle}>NIBBLES</a> can be{" "}
              <a> fed to RATS to increase their level! </a>
            </p>
          </div>
        </div>
        <div class="row align-items-center my-5 lg-0">
          <div class="col-lg-6">
            <h1 class="font-weight-light">Rarity and Distribution</h1>
            <p style={{ fontSize: "20px" }}>
              As well as having a unique combination of traits and attributes,
              each RAT is assigned a rarity:{" "}
            </p>
            <ul style={{ fontSize: "20px" }}>
              <li style={{ color: rarity.Common }}>45% Common</li>
              <li style={{ color: rarity.Uncommon }}>25% Uncommon</li>
              <li style={{ color: rarity.Rare }}>15% Rare</li>
              <li style={{ color: rarity.Epic }}> 10% Epic</li>
              <li style={{ color: rarity.Legendary }}> 5% Legendary</li>
            </ul>
          </div>
          <div class="col-lg-6">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src={imageRarity}
              alt=""
            />
          </div>
        </div>

        <div class="row align-items-center my-5">
          <div class="col-lg-12">
            <h1 class="font-weight-light">
              Unique, levelable, passive yield earning NFTs on the Avax
              Blockchain with stakeable rewards.
            </h1>
          </div>
        </div>

        <div class="row align-items-center my-5">
          <div class="col-lg-12">
            <h1 class="font-weight-light">Fequently Asked Questions </h1>
            <div style={{ fontSize: "20px", marginBottom: "100px" }}>
              <Faq
                question={"How much does a RAT cost?"}
                answer={"Each rat costs 1 AVAX."}
              ></Faq>
              <Faq question={"When can I mint?"} answer={"Soon (tm)."}></Faq>
              <Faq
                question={"Is there a maximum amount I can mint?"}
                answer={
                  "20 RATS can be minted per transaction. There is no limit of RATS per wallet."
                }
              ></Faq>
              <Faq
                question={"What are Trinkets?"}
                answer={
                  "TRINKETS are the currency of the SewerVerse. RATS gather TRINKETS in proportion to their level."
                }
              ></Faq>
              <Faq
                question={"Do I have to stake my Rats to earn Trinkets?"}
                answer={"No, RATS are constantly earning TRINKETS."}
              ></Faq>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
