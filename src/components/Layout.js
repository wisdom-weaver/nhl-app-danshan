import React from "react";
import { NavLink } from "react-router-dom";
import bettorsightLogo from "../static/bettorsight-logo.svg";

function Layout(props) {
  const redirect_btn = (
    <>
      <h5 className="center">BEST NHL ODDS</h5>
      <div className="center">
        <a target="_blank" href="https://jgexchange.com/bet.html/">
          <div className="btn black-btn">click here</div>
        </a>
      </div>
    </>
  );
  return (
    <div className="">
      <div className="logo-continer">
        <img src={bettorsightLogo} alt="" />
      </div>
      <div className="row-flex ">
        <NavLink to="/">
          <div className="btn black-btn m5">Home</div>
        </NavLink>
        <NavLink to="/powerrankings">
          <div className="btn black-btn m5">Power Rankings</div>
        </NavLink>
        <NavLink to="/injuries">
          <div className="btn black-btn m5">Injuries</div>
        </NavLink>
        {/* <NavLink to="/trends"><div className="btn black-btn m5">Trends</div></NavLink> */}
      </div>
      <div className="rankings-container">
        <div className="row">
          <div className="col s12">
            <div className="side-card top-side-card">{redirect_btn}</div>
          </div>
          <div className="col s12 m10 offset-m1 l8 offset-l2">
            {props.children}
          </div>
          <div className="col s12 m10 offset-m1 l2 side-card side-side-card">
            {redirect_btn}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
