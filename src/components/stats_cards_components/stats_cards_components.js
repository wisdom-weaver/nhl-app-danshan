import React from 'react';
import LargeLogo from '../LargeLogo';

export const BarLine = (props) => {
  const { left, right, colorA, colorB, side } = props;
  return (
    <div className="row-flex barline">
      <div
        style={{
          backgroundColor: colorA,
          width: `${left - 0.3}%`,
          opacity: side != -1 ? (side == 0 ? "1" : "0.2") : "1",
        }}
        className="bar-left mh-10px"
      ></div>
      <div
        style={{ backgroundColor: "white", width: `${0.6}%` }}
        className="bar-left mh-10px"
      ></div>
      <div
        style={{
          backgroundColor: colorB,
          width: `${right - 0.3}%`,
          opacity: side != -1 ? (side == 1 ? "1" : "0.2") : "1",
        }}
        className="bar-right mh-10px"
      ></div>
    </div>
  );
};

export const TeamBar = ({ teamA, teamB, teamA_Img, teamB_Img, midTitle }) => {
  return (
    <div className="row-flex justify-space-between">
      <div className="col-flex">
        <LargeLogo image={teamA_Img} />
        <span className="bold center">{teamA}</span>
      </div>
      <h5 className="center">{midTitle}</h5>
      <div className="col-flex">
        <LargeLogo image={teamB_Img} />
        <span className="bold center">{teamB}</span>
      </div>
    </div>
  );
};

export const SingleStat = ({
  statLeft,
  statRight,
  statTitle,
  barBottomText,
  colorA,
  colorB,
  side = -1,
  show_line = false,
  lval = 50,
  rval = 50,
}) => {
  const left = (lval * 100) / (lval + rval);
  const right = (rval * 100) / (lval + rval);
  return (
    <div className="SingleStatContainer w-100">
      <div className="row-flex justify-space-between">
        <span>{statLeft}</span>
        <span className="bold">{statTitle}</span>
        <span>{statRight}</span>
      </div>
      {show_line && <BarLine {...{ left, right, colorA, colorB, side }} />}
      {barBottomText && <p className="center grey-text">{barBottomText}</p>}
      {!barBottomText && <div className="spacing-5px"></div>}
    </div>
  );
};

export const get_n = (n) => {
  parseFloat(n?.split(" ")?.reverse()[0] || '')
};
export const higher_better = (a, b) => {
  a = get_n(a);
  b = get_n(b);
  return a > b ? 0 : 1;
};
export const lower_better = (a, b) => {
  a = get_n(a);
  b = get_n(b);
  return b > a ? 0 : 1;
};
export const both = (a, b) => -1;


export const structure_raw_row_from_key_mapping = ({raw, key_mapping})=>(
  raw.map((row) =>key_mapping.reduce((acc,{ key_init, key_final }) => ({ ...acc, [key_final]: row[key_init]?.$t }),{}))
)