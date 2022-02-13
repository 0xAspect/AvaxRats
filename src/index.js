import React, { useEffect, useCallback, useState, Button } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  About,
  Swarm,
  Stake,
  Popup,
  Mint,
  SimpleNFT,
  MintCard,
} from "./components";
import Web3 from "web3";
import NFT from "./abi/FactoryNFT.json";
import Trinket from "./abi/Trinkets.json";
import Nibbles from "./abi/Nibbles.json";
import {
  nftFactoryAddress,
  trinketFarmAddress,
  nibblesAddress,
  snowTraceAddress,
  snowtraceAddress,
} from "./assets/addresses.js";
import Card from "react-bootstrap/Card";

//About Page
//Add content
//make more interesting
//TOOO - clean up fallback functions

export default function App() {
  const web3 = new Web3(Web3.givenProvider);

  //declare web3 state variables
  const isLive = false;
  const [network, setNetwork] = useState("none");
  const [userAddress, setUserAddress] = useState("none");
  const [userConnected, setUserConnected] = useState(false);
  const [avaxBalance, setAvaxBalance] = useState("0");
  const [trinketBalance, setTrinketBalance] = useState("0");
  const [nftBalance, setNftBalance] = useState("");
  const [uri, setUri] = useState("");
  const [nftTotalSupply, setNftTotalSupply] = useState("* ");
  const [stakedTrinketBalance, setStakedTrinketBalance] = useState("0");
  const [unclaimedNibbles, setUnclaimedNibbles] = useState("0");
  const [nibblesBalance, setNibblesBalance] = useState("0");
  const [trinketStakeTime, setTrinketStakeTime] = useState("0");

  //declare contract
  const nftFactory = new web3.eth.Contract(NFT.abi, nftFactoryAddress);
  const trinketFarm = new web3.eth.Contract(Trinket.abi, trinketFarmAddress);
  const nibbles = new web3.eth.Contract(Nibbles.abi, nibblesAddress);

  //prompt user to connect
  const web3Enabled = async () => {
    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);
      componentDidMount();
      return true;
    }
    return false;
  };

  //Load User account function
  const loadUser = async () => {
    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    setUserConnected(true);
    loadNetwork();

    return account;
  };

  //Load Network function
  const loadNetwork = async () => {
    let num = await web3.currentProvider.chainId;
    console.log(num);
    if (num === "0xa86a") {
      setNetwork("Avax");
    }
    if (num === "0xa869") {
      setNetwork("Fuji");
    } else {
      setNetwork(num);
    }
  }

  //Load avax/trinket/nib balance functions
  const loadAVAXBalance = useCallback(
    async (usr) => {
      await web3.eth.getBalance(usr).then((balance) => {
        setAvaxBalance(web3.utils.fromWei(balance));
      });
    },
    [setAvaxBalance]
  );

  const loadTrinketBalance = useCallback(
    async (usr) => {
      let bal = await trinketFarm.methods.balanceOf(usr).call();
      setTrinketBalance(web3.utils.fromWei(bal));
    },
    ["0"]
  );

  const loadNibblesBalance = useCallback(
    async (usr) => {
      let bal = await nibbles.methods.balanceOf(usr).call();
      setNibblesBalance(web3.utils.fromWei(bal));
    },
    ["0"]
  );

  //load NFT collection and URI
  const loadNftBalance = useCallback(
    async (usr) => {
      let bal = await nftFactory.methods.balanceOf(usr.toString()).call();
      let uri = await nftFactory.methods.baseURL().call();
      let ids = [];
      for (var i = 0; i < bal; i++) {
        let tokenId = await nftFactory.methods
          .tokenOfOwnerByIndex(usr.toString(), i)
          .call();
        ids.push(tokenId);
      }
      setNftBalance(ids);
      setUri(uri);
    },
    [setNftBalance]
  );

  const loadNFTSupply = useCallback(async (usr) => {
    let bal = await nftFactory.methods.totalSupply().call();
    setNftTotalSupply(bal);
  });

  //NFT rat data/functions
  const loadRatLevel = useCallback(async (id) => {
    let bal = await nftFactory.methods.currentLevel(id).call();
    return bal;
  });

  const loadGatherTime = async (id) => {
    const time = await trinketFarm.methods.gatherTime(id).call();
    return time;
  };

  const loadRatYield = useCallback(async (id) => {
    let ratYield = await trinketFarm.methods.calculateYield(id).call();

    return ratYield / 10;
  });

  const loadTotalUnclaimedTrinketYield = useCallback(async (userAddress) => {
    let totalUnclaimedTrinketYield = await trinketFarm.methods
      .totalUnclaimedTrinkets(userAddress)
      .call();
    return totalUnclaimedTrinketYield;
  });

  const claimRatYield = useCallback(async (id) => {
    let utils = { from: userAddress };
    await trinketFarm.methods.claimTrinkets(id).send(utils);
    return true;
  });

  const claimRatYieldAll = useCallback(async (userAddress) => {
    let utils = { from: userAddress };
    let claimAmount = await loadTotalUnclaimedTrinketYield(userAddress);
    let checker = trinketBalance;
    popupHandler("claim", ["Trinkets", claimAmount / 10]);
    await trinketFarm.methods
      .claimTrinketsAllRats(userAddress)
      .send(utils)
      .on("confirmation", function (a, receipt) {
        popupHandler("claimed", [
          "Trinkets",
          claimAmount / 10,
          snowtraceAddress + "tx/" + receipt.transactionHash,
        ]);
      });
    return true;
  });

  //level up  a rat
  const levelUpRat = async (id) => {
    let utils = { from: userAddress };
    const currentLevel = await loadRatLevel(id);
    const levelUpPrice = await nftFactory.methods.levelUpCost(id).call();
    popupHandler("levelApprove", [id, currentLevel, levelUpPrice]);
    const convertPrice = web3.utils.toWei(levelUpPrice);
    await nibbles.methods
      .approve(nftFactoryAddress, convertPrice)
      .send(utils)
      .on("confirmation", function (a, receipt) {
        popupHandler("levelConfirm", [id, currentLevel, levelUpPrice]);
      });
    await nftFactory.methods
      .levelUp(id)
      .send(utils)
      .on("confirmation", function (a, receipt) {
        popupHandler("levelSuccess", [
          id,
          currentLevel,
          levelUpPrice,
          snowtraceAddress + "tx/" + receipt.transactionHash,
        ]);
      });
  };

  const levelUpRatCost = async (id) => {
    const levelUpPrice = await nftFactory.methods.levelUpCost(id).call();
    return levelUpPrice;
  };

  //Mint new rat function
  const mintRat = async (nftMintAmount) => {
    let utils = {
      from: userAddress,
      value: 1000000000000000000 * nftMintAmount,
    };
    popupHandler("mint", nftMintAmount);
    await nftFactory.methods
      .createToken(nftMintAmount)
      .send(utils)
      .on("confirmation", function (a, receipt) {
        const data = [];
        data.push(snowtraceAddress + "tx/" + receipt.transactionHash);
        if (receipt.events.Transfer.length > 1) {
          data.push(receipt.events.Transfer[0].returnValues.tokenId);
        } else {
          data.push(receipt.events.Transfer.returnValues.tokenId);
        }
        data.push(nftMintAmount);
        popupHandler("minted", data);
      });
  };

  //popup functions------------------------------------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const [popupHeader, setPopupHeader] = useState("");
  const [popupContent, setPopupContent] = useState("");
  var hasConfirmed = false;

  const togglePopup = () => {
    setIsOpen(!isOpen);
    hasConfirmed = true;
  };

  function popupHandler(type, data) {
    //mint
    if (type === "mint") {
      setPopupHeader(
        <a>
          Minting {data} Rat{data > 1 && "s"}....
        </a>
      );
      setPopupContent(
        <>
          <a style={{ opacity: "0.5" }}>
            Please confirm transaction in wallet.
          </a>
          <p></p>
          <div id="loading"></div>
        </>
      );
      setIsOpen(!isOpen);
      hasConfirmed = false;
    }
    if (type === "minted" && hasConfirmed === false) {
      setPopupHeader(
        <>
          <p>Success!</p>{" "}
          <a>
            {" "}
            {data[2]} Sewer Rat{data[2] > 1 && "s"} Minted!
          </a>
        </>
      );
      setPopupContent(
        <>
          {" "}
          <SimpleNFT id={data[1]}></SimpleNFT>{" "}
          <NavLink to="/swarm">
            <button class="button-55" role="button">
              {" "}
              view rats{" "}
            </button>
          </NavLink>
          <p></p>
          <a href={data[0]}> view on snowtrace</a>
        </>
      );
      setIsOpen(!isOpen);
      hasConfirmed = true;

      //claim nibbles and  trinkets
    }
    if (type === "claim") {
      setPopupHeader(
        <a>
          Claiming {data[1]} {data[0]}...
        </a>
      );
      setPopupContent(
        <>
          <a style={{ opacity: "0.5" }}>
            Please confirm transaction in wallet.
          </a>
          <p></p>
          <div id="loading"></div>
        </>
      );
      setIsOpen(!isOpen);
      hasConfirmed = false;
    }
    if (type === "claimed" && hasConfirmed == false) {
      setPopupHeader(<a>Success!</a>);
      setPopupContent(
        <>
          {" "}
          <p>
            {data[1]} {data[0]} claimed.
          </p>
          <p style={{ opacity: "0.5" }}>*nibble nibble*</p>
          <p>
            <a href={data[2]}>view on snowtrace</a>
          </p>
        </>
      );
      setIsOpen(!isOpen);
      hasConfirmed = true;

      //stake
    }
    if (type === "stakeApprove" && hasConfirmed == false) {
      setPopupHeader(<a>Approving {data} Trinkets for stake.</a>);
      setPopupContent(
        <>
          {" "}
          <a style={{ opacity: "0.5" }}>Please approve spend in wallet.</a>
          <p></p>
          <div id="loading"></div>{" "}
        </>
      );
      setIsOpen(!isOpen);
      hasConfirmed = false;
    }
    if (type === "stakeConfirm" && hasConfirmed == false) {
      setPopupHeader(<a>Staking {data} Trinkets...</a>);
      setPopupContent(
        <>
          <a style={{ opacity: "0.5" }}>Please sign transaction.</a>
          <p></p>
          <div id="loading"></div>{" "}
        </>
      );
      setIsOpen(!isOpen);
      hasConfirmed = false;
    }
    if (type === "staked" && hasConfirmed == false) {
      setPopupHeader(<a>Success!</a>);
      setPopupContent(
        <>
          <p>{data[0]} Trinkets staked and pending Nibbles claimed. </p>
          <p style={{ opacity: "0.5" }}>*nibble nibble*</p>
          <p>
            <a href={data[1]}>view on snowtrace</a>
          </p>
        </>
      );
      setIsOpen(!isOpen);
      hasConfirmed = true;

      //Level up
    }
    if (type === "levelApprove" && hasConfirmed == false) {
      console.log(data);
      setPopupHeader(
        <a>
          Leveling up Rat {data[0]} to level {parseInt(data[1]) + 1}.{" "}
        </a>
      );
      setPopupContent(
        <>
          <SimpleNFT id={data[0]}></SimpleNFT>
          <p>Cost: {data[2]} Nibbles</p>
          <p style={{ opacity: "0.5" }}>
            Please approve Nibble spend in wallet.
          </p>
          <div id="loading"></div>
        </>
      );
      setIsOpen(!isOpen);
      hasConfirmed = false;
    }
    if (type === "levelConfirm" && hasConfirmed == false) {
      setPopupHeader(
        <a>
          Leveling up Rat {data[0]} to level {parseInt(data[1]) + 1}.{" "}
        </a>
      );
      setPopupContent(
        <>
          <SimpleNFT id={data[0]}></SimpleNFT>
          <p>Cost: {data[2]} Nibbles</p>
          <p style={{ opacity: "0.5" }}>Please confirm level up in wallet.</p>
          <div id="loading"></div>
        </>
      );
      setIsOpen(!isOpen);
      hasConfirmed = false;
    }
    if (type === "levelSuccess" && hasConfirmed == false) {
      setPopupHeader(<a>Success! </a>);
      setPopupContent(
        <>
          <SimpleNFT id={data[0]}></SimpleNFT>
          <p>
            Rat {data[0]} is now level {parseInt(data[1]) + 1}{" "}
          </p>
          <p style={{ opacity: "0.5" }}>*nibble nibble*</p>
          <p>
            <a href={data[3]}>view on snowtrace</a>
          </p>
        </>
      );
      setIsOpen(!isOpen);
      hasConfirmed = true;
    }
  }

  //nibble functions ---------------------------------------------
  const stake = async (bal) => {
    let utils = { from: userAddress };
    let convertBal = web3.utils.toWei(bal);
    popupHandler("stakeApprove", bal);
    await trinketFarm.methods
      .approve(nibblesAddress.toString(), convertBal)
      .send(utils)
      .on("confirmation", function (a, receipt) {
        popupHandler("stakeConfirm", bal);
      });
    await nibbles.methods
      .stake(convertBal)
      .send(utils)
      .on("receipt", function (receipt) {
        const tx = snowtraceAddress + "tx/" + receipt.transactionHash;
        popupHandler("staked", [bal, tx]);
      });
  };
  const unstake = async (bal) => {
    let utils = { from: userAddress };
    let convertBal = web3.utils.toWei(bal);
    await nibbles.methods
      .unstake(convertBal)
      .send(utils)
      .on("receipt", function (receipt) {
        console.log(receipt.transactionHash);
      });
  };
  const claimNibbles = async (userAddress) => {
    let utils = { from: userAddress };
    popupHandler("claim", ["Nibbles"]);
    await nibbles.methods
      .claimYield(userAddress)
      .send(utils)
      .on("confirmation", function (conf, receipt) {
        const tx = snowtraceAddress + "tx/" + receipt.transactionHash;
        popupHandler("claimed", ["Nibbles", "", tx]);
      });
  };

  const loadStakeTime = async (user) => {
    const time = await nibbles.methods.stakeTime(user).call();
    setTrinketStakeTime(time);
  };

  const loadStakedTrinkets = useCallback(async (userAddress) => {
    let stakedTrinkets = await nibbles.methods
      .userStakingBalance(userAddress)
      .call();
    setStakedTrinketBalance(web3.utils.fromWei(stakedTrinkets));
  });

  const loadUnclaimedNibbles = useCallback(async (userAddress) => {
    let unclaimedNibbles = await nibbles.methods
      .calculateYield(userAddress)
      .call();
    setUnclaimedNibbles(web3.utils.fromWei(unclaimedNibbles));
  });
  //Call functions and load user data
  const componentDidMount = useCallback(async () => {
   
    await loadUser().then(
      (response) => {
        if (response != userAddress) {
          setUserAddress(response);
        }
        loadAVAXBalance(response);
        if (isLive === true) {
          loadTrinketBalance(response);
          loadNftBalance(response);
          loadStakedTrinkets(response);
          loadNibblesBalance(response);
          loadUnclaimedNibbles(response);
          loadStakeTime(response);
        }

      },
      []
    );

  });

  // connect user if not currently connected after website loads and respond to changes in network etc.
  useEffect(() => {
    const interval = setInterval(() => {
      
      if (userConnected === true) {
        componentDidMount();

      }
      if (isLive === true){
        loadNFTSupply();
      }

    }, 2000);
  }, [userAddress]);

  return (
    <Router>
      <Navigation
        isConnected={userConnected}
        userAddress={userAddress}
        avaxBalance={avaxBalance}
        network={network}
        web3Enabled={web3Enabled}
        trinketBalance={trinketBalance}
        stakedTrinketBalance={stakedTrinketBalance}
        rats={nftBalance.length}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              userAddress={userAddress}
              web3Enabled={web3Enabled}
              mintRat={mintRat}
              nftTotalSupply={nftTotalSupply}
              avaxBalance={avaxBalance}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/swarm"
          element={
            <Swarm
              userAddress={userAddress}
              isConnected={userConnected}
              web3Enabled={web3Enabled}
              nftBalance={nftBalance}
              uri={uri}
              loadRatLevel={loadRatLevel}
              levelUpRat={levelUpRat}
              levelUpRatCost={levelUpRatCost}
              loadRatYield={loadRatYield}
              claimRatYield={claimRatYield}
              claimRatYieldAll={claimRatYieldAll}
              loadTotalUnclaimedTrinketYield={loadTotalUnclaimedTrinketYield}
              loadGatherTime={loadGatherTime}
              nibblesBalance={nibblesBalance}
            />
          }
        />

        <Route
          path="/stake"
          element={
            <Stake
              stake={stake}
              unstake={unstake}
              web3Enabled={web3Enabled}
              isConnected={userConnected}
              trinketBalance={trinketBalance}
              stakedTrinketBalance={stakedTrinketBalance}
              unclaimedNibbles={unclaimedNibbles}
              userAddress={userAddress}
              nibblesBalance={nibblesBalance}
              claimNibbles={claimNibbles}
              trinketStakeTime={trinketStakeTime}
            />
          }
        >
          {/* <Route path="" element={<Posts />} />
        <Route path=":postSlug" element={<Post />} /> */}
        </Route>
        <Route
          path="/mint"
          element={
            <Mint
              userAddress={userAddress}
              mintRat={mintRat}
              nftTotalSupply={nftTotalSupply}
              avaxBalance={avaxBalance}
              web3Enabled={web3Enabled}
            />
          }
        />
      </Routes>
      {isOpen && (
        <Popup
          content={popupContent}
          header={popupHeader}
          handleClose={togglePopup}
        />
      )}
      <Footer />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
