import _ from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  get_team_data_from_any_name,
  get_team_key,
} from "../../../utils/utils";
import { TeamLink } from "../../../views/HomePage";
import LargeLogo from "../../LargeLogo";
import { structure_raw_row_from_key_mapping } from "../stats_cards_components";

const key_mapping_goaliedepths = [
  { key_head: "Team", key_init: "gsx$team", key_final: "team" },
  { key_head: "Last", key_init: "gsx$last", key_final: "last" },
  { key_head: "First", key_init: "gsx$first", key_final: "first" },
  { key_head: "DOB", key_init: "gsx$dob", key_final: "dob" },
  { key_head: "Nation", key_init: "gsx$nation", key_final: "nation" },
];

// const format_injuries_pos = (inp)=>{
//   let ar = [
//     {imp:'high', style:'red-text'},
//     {imp:'med',  style:'blue-text'},
//     {imp:'low',  style:'green-text'},
//     {imp:'na',   style:'black-text'},
//   ]
//   let evaluated = ar.find(({imp})=>inp.toLowerCase().includes(imp))
//   let classname = (evaluated && evaluated.style) ||  'black-text'
//   return <span className={classname}>{inp}</span>
// };

const category = "basketball";
const subcategory = "nba";

const stat_key = "goaliedepths";

export const structure_goaliedepths_data = (data_ar) => {
  var raw_goaliedepths = data_ar[0].feed.entry;
  raw_goaliedepths = structure_raw_row_from_key_mapping({
    raw: raw_goaliedepths,
    key_mapping: key_mapping_goaliedepths,
  });

  raw_goaliedepths = raw_goaliedepths.map((ea) => ({
    ...ea,
    team: get_team_key({ team: ea.team, category, subcategory }),
  }));
  var str_goaliedepths = _.groupBy(raw_goaliedepths, "team");
  // console.log({str_goaliedepths})
  return { stat_structure: str_goaliedepths, stat_key };
};

export const TeamGoalieDepths = ({
  team,
  category,
  subcategory,
  showTeam = false,
}) => {
  const { teamImg, color1 } = get_team_data_from_any_name({
    team,
    category,
    subcategory,
  });
  // const injuries = []
  const goaliedepths = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].stats[stat_key][team];
    } catch (err) {
      return [];
    }
  });
  // console.log(team, goaliedepths);
  return (
    <>
      <div
        className="card round-card"
        style={{ boxShadow: `0 0px 5px 0 ${color1}` }}
      >
        <div className="card-content">
          {showTeam && (
            <TeamLink {...{ team, size: "large", align: "center" }} />
          )}
          {!showTeam && <h5 className="center head">Goalie Depth Chart</h5>}
          <div className="spacing-10px"></div>
          {goaliedepths && goaliedepths.length > 0 ? (
            <div className="m0auto">
              <table style={{ maxWidth: 500 }} className="m0auto">
                <tbody>
                  <tr>
                    {key_mapping_goaliedepths
                      .slice(1)
                      .map(({ key_head }, index) => (
                        <th key={index}>{key_head}</th>
                      ))}
                  </tr>
                  {goaliedepths?.map((goaliedepth, gdindex) =>
                    gdindex < 2 ? (
                      <tr 
                      style={gdindex==1 ? {
                         borderBottom: `2px solid ${color1}`
                      }:{}}
                      key={gdindex}>
                        {key_mapping_goaliedepths
                          .slice(1)
                          .map(({ key_final }, index) => (
                            <th key={index}>{goaliedepth[key_final]}</th>
                          ))}
                      </tr>
                    ) : (
                      <tr key={gdindex}>
                        {key_mapping_goaliedepths
                          .slice(1)
                          .map(({ key_final }, index) => (
                            <td key={index}>{goaliedepth[key_final]}</td>
                          ))}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <h6 className="center head">No Goalie Depth Chart</h6>
          )}
        </div>
      </div>
    </>
  );
};
