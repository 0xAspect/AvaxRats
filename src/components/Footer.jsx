
import React from "react";
import {nftFactoryAddress,snowtraceAddress}from '../assets/addresses.js';
import discord from "../assets/images/discord1.svg";
import twitter from "../assets/images/twitter.svg";
import github from "../assets/images/github.svg";
import snowtrace from "../assets/images/snowtrace.svg"

function Footer() {

  //todo add social links to images

const iconStyle = {
  height : '30px',
  marginRight: '10px'
}

var url = {snowtraceAddress} + nftFactoryAddress;

  return (
    <div className="footer" style={{marginTop: "50px"}}>
      <footer className="py-3 bg-dark fixed-bottom">
        <div className="container">
          <div className='text-center'>
              <a href={url} target="_blank" ><img src={snowtrace} style={iconStyle} alt="" /></a>
              <a href='https://www.google.com'target="_blank" ><img src={discord} style={iconStyle} alt="" /></a>
              <a href='https://www.twitter.com/AvaxNibblers'target="_blank" ><img src={twitter} style={iconStyle} alt="" /></a>
              <img src={github} style={iconStyle} alt="" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;