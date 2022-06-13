import React from "react";
import { NavLink } from "react-router-dom";
import AvaxLogo from "../assets/images/avax-logo.svg";
import logo from "../assets/images/logo.svg";
import "./Home.css";
import trinket from "../assets/images/trinket.png";

function Navigation(props) {
  const imgStyle = {
    height: "20px",
  };
  return (
    <div>
      <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <NavLink className="nav-link" to="/">
          {" "}
          <img style={{height: "60px"}} alt="avaxrats" src={logo}></img>{" "}
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <NavLink className="nav-link" to="/mint">
                {" "}
                MINT{" "}
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/swarm">
                {" "}
                GATHER{" "}
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/stake">
                {" "}
                <a>STAKE</a>{" "}
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/swarm">
                {" "}
                <a>GROW</a>{" "}
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{textAlign: "right"}}> 
            <li>
              <NavLink to="/mint">
                <button class="button-55" role="button">
                  {" "}
                  MINT!
                </button>
              </NavLink>
            </li>
            <li>
              <button
                onClick={props.web3Enabled}
                class="button-54"
                role="button"
              >
                {props.userAddress != "none" ? (
                  <a>
                    {" "}
                    {props.network == "0xa86a" ||
                    props.network == "Fuji" ||
                    props.network == "Avax" ? (
                      <a>
                        <img src={AvaxLogo} style={imgStyle} /> ....
                        {props.userAddress.slice(38, 42)}{" "}
                      </a>
                    ) : (
                      "Wrong Network!"
                    )}
                  </a>
                ) : (
                  "Connect Wallet"
                )}
              </button>
            </li>
            <>
              {props.isConnected && (
                <>
                  <li>
                    <NavLink to="/swarm">
                      <button class="button-54" role="button">
                        {props.rats > 0 ? (
                          <a>NIBBLERS: {props.rats} </a>
                        ) : (
                          <>
                            AVAX:
                            {props.network == "0xa86a" ||
                            props.network == "Fuji" ||
                            props.network == "Avax" ? (
                              <a>
                                {" "}
                                {Math.round(props.avaxBalance * 100) / 100}
                              </a>
                            ) : (
                              <a> N/A</a>
                            )}
                          </>
                        )}
                      </button>
                    </NavLink>
                  </li>
                  <li>
                    <button class="button-54" role="button">
                      <img style={imgStyle} src={trinket}></img>
                      {props.network == "0xa86a" ||
                      props.network == "Fuji" ||
                      props.network == "Avax" ? (
                        <a>
                          {" "}
                          {Math.round(props.trinketBalance * 100) / 100} (
                          {Math.round(props.stakedTrinketBalance * 100) / 100}){" "}
                        </a>
                      ) : (
                        <a> N/A</a>
                      )}
                    </button>
                  </li>
                </>
              )}
            </>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
