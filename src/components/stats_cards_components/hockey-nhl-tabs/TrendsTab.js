import React from "react";
import _ from "lodash";
import LargeLogo from "../../LargeLogo";
import {
  SingleStat,
  structure_raw_row_from_key_mapping,
  TeamBar,
} from "../stats_cards_components";
import {
  get_team_data_from_any_name,
  get_team_key,
} from "../../../utils/utils";
import { useSelector } from "react-redux";

const category = "hockey";
const subcategory = "nhl";

const key_mapping_trends = [
  {
    key_head: "Team",
    key_final: "team",
    key_init: "gsx$team",
  },
  {
    key_head: "W/L",
    key_final: "wl",
    key_init: "gsx$wl",
  },
  {
    key_head: "Streak",
    key_final: "streak",
    key_init: "gsx$streak",
  },
  {
    key_head: "ML Op",
    key_final: "mlop",
    key_init: "gsx$mlop",
  },
  {
    key_head: "T Op",
    key_final: "top",
    key_init: "gsx$top",
  },
  {
    key_head: "Cur ML",
    key_final: "curml",
    key_init: "gsx$curml",
  },
  {
    key_head: "Cur Ttl",
    key_final: "curttl",
    key_init: "gsx$curttl",
  },
  {
    key_head: "Puck",
    key_final: "puck",
    key_init: "gsx$puck",
  },
  {
    key_head: "ML",
    key_final: "ml",
    key_init: "gsx$ml",
  },
  {
    key_head: "O/U",
    key_final: "ou",
    key_init: "gsx$ou",
  },
];

export const structure_trends_data = (data_ar) => {
  var raw_trends = data_ar[0].feed.entry;
  raw_trends = structure_raw_row_from_key_mapping({
    raw: raw_trends,
    key_mapping: key_mapping_trends,
  });
  raw_trends = raw_trends.map((ea) => ({
    ...ea,
    team: get_team_key({ team: ea.team, category, subcategory }),
  }));

  // console.log("raw_trends", raw_trends);
  var str_trends = _.keyBy(raw_trends, "team");
  delete str_trends[""];
  // console.log("str_trends", str_trends);
  return { stat_structure: str_trends, stat_key: "trends" };
};

export const TrendsTab = ({ statA, statB }) => {
  const { teamA, teamA_Img, colorA } = statA;
  const trendsA = (statA && statA?.stats?.trends) || {};
  const { teamB, teamB_Img, colorB } = statB;
  const trendsB = (statB && statB?.stats?.trends) || {};
  // console.log("trends", { trendsA, trendsB },);
  // return <></>
  const show_trends = key_mapping_trends.slice(1);
  return (trendsA && Object.keys(trendsA).length != 0) ||
    (trendsB && Object.keys(trendsB).length != 0) ? (
    <div className="card-content">
      <TeamBar
        midTitle={"Trends"}
        {...{ teamA, teamA_Img, teamB, teamB_Img }}
      />
      <div className="bottom-margin-30px"></div>
      <table className="hide-on-small-only">
        <tbody>
          <tr>
            <th>Team</th>
            {show_trends.map(({ key_head, key_final }) => (
              <th>{key_head}</th>
            ))}
          </tr>
          {trendsA && Object.keys(trendsA).length != 0 && (
            <tr>
              <td style={{ borderBottom: `3px solid ${colorA}` }}>
                {trendsA["team"]}
              </td>
              {show_trends.map(({ key_head, key_final }) => (
                <td>{trendsA[key_final]}</td>
              ))}
            </tr>
          )}
          {trendsB && Object.keys(trendsB).length != 0 && (
            <tr>
              <td style={{ borderBottom: `4px solid ${colorB}` }}>
                {trendsB["team"]}
              </td>
              {show_trends.map(({ key_head, key_final }) => (
                <td>{trendsB[key_final]}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
      <table className="hide-on-med-and-up">
        <tbody>
          {key_mapping_trends.map(({ key_head, key_final }) => (
            <SingleStat
              statLeft={trendsA[key_final]}
              statRight={trendsB[key_final]}
              show_line={true}
              statTitle={key_head}
              {...{ colorA, colorB }}
            />
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="card-content">
      <p className="flow-text center">No Trends at the moment</p>
    </div>
  );
};

export const TeamTrends = ({ team, category, subcategory }) => {
  const { teamImg, color1, color2 } = get_team_data_from_any_name({
    team,
    category,
    subcategory,
  });
  const trends = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].stats["trends"][team];
    } catch (err) {
      return [];
    }
  });
  const show_trends = key_mapping_trends.slice(1);
  // return <></>
  return (
    <div
      className="card round-card"
      style={{ boxShadow: `0 0px 5px 0 ${color1}` }}
    >
      <div className="card-content">
        {trends && Object.keys(trends).length != 0 ? (
          <>
            <h5 className="center head">Trends</h5>
            <table className="hide-on-small-only">
              <tbody>
                <tr>
                  <th>Team</th>
                  {show_trends.map(({ key_head, key_final }) => (
                    <th>{key_head}</th>
                  ))}
                </tr>
                <tr>
                  <td style={{ borderBottom: `3px solid ${color1}` }}>
                    {trends["team"]}
                  </td>
                  {show_trends.map(({ key_head, key_final }) => (
                    <td>{trends[key_final]}</td>
                  ))}
                </tr>
              </tbody>
            </table>
            <div className="hide-on-med-and-up">
              <div className="col-flex">
                {show_trends.map(({ key_head, key_final }) => (
                  <>
                    <div 
                      style={{maxWidth: '200px'}}
                    className="row-flex w-100 justify-space-between">
                      <>
                        <span className="head">{key_head}</span>
                        <span>{trends[key_final]}</span>
                      </>
                    </div>
                    <div className="spacing-10px"></div>
                  </>
                ))}
              </div>
            </div>
          </>
        ) : (
          <h5 className="center">No Trends yet</h5>
        )}
      </div>
    </div>
  );
};
