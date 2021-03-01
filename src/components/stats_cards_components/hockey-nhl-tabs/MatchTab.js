import React from "react";
import _ from "lodash";
import {
  both,
  higher_better,
  lower_better,
  get_n,
  SingleStat,
  structure_raw_row_from_key_mapping,
  TeamBar,
} from "../stats_cards_components";
import { get_n_with_sign, get_team_data_from_any_name, get_team_key } from "../../../utils/utils";
import { useSelector } from "react-redux";

const category = "hockey";
const subcategory = "nhl";

const key_mapping_matchup = [
  {
    key_head: "Team",
    key_init: "gsx$teams",
    key_final: "team",
    side_eval: null,
  },
  {
    key_head: "Shots",
    key_final: "shots",
    key_init: "gsx$sdb",
    side_eval: higher_better,
  },
  {
    key_head: "Penalties",
    key_final: "penalties",
    key_init: "gsx$_d6ua4",
    side_eval: lower_better,
  },
  {
    key_head: "Pen Minutes",
    key_final: "pen_minutes",
    key_init: "gsx$_d88ul",
    side_eval: lower_better,
  },
  {
    key_head: "P1",
    key_final: "p1",
    key_init: "gsx$_dkvya",
    side_eval: higher_better,
  },
  {
    key_head: "P2",
    key_final: "p2",
    key_init: "gsx$team",
    side_eval: higher_better,
  },
  {
    key_head: "P3",
    key_final: "p3",
    key_init: "gsx$_dnp34",
    side_eval: higher_better,
  },
  {
    key_head: "Total",
    key_final: "total",
    key_init: "gsx$_dp3nl",
    side_eval: higher_better,
  },
  {
    key_head: "Opp Shots",
    key_final: "opp_shots",
    key_init: "gsx$_df9om",
    side_eval: lower_better,
  },
  {
    key_head: "Opp Penalties",
    key_final: "opp_penalties",
    key_init: "gsx$_dgo93",
    side_eval: higher_better,
  },
  {
    key_head: "Opp Pen Minutes",
    key_final: "opp_pen_minutes",
    key_init: "gsx$opp",
    side_eval: higher_better,
  },
  {
    key_head: "Opp P1",
    key_final: "opp_p1",
    key_init: "gsx$_djhdx",
    side_eval: lower_better,
  },
  {
    key_head: "Opp P2",
    key_final: "opp_p2",
    key_init: "gsx$_dw4je",
    side_eval: lower_better,
  },
  {
    key_head: "Opp P3",
    key_final: "opp_p3",
    key_init: "gsx$_dxj3v",
    side_eval: lower_better,
  },
  {
    key_head: "Opp Total",
    key_final: "opp_total",
    key_init: "gsx$_dyxo8",
    side_eval: lower_better,
  },
];

const key_mapping_matchup_sag = [
  {
    key_head: "Team",
    key_init: "gsx$team",
    key_final: "team",
    side_eval: null,
  },
  {
    key_head: "Power Ranking",
    key_init: "gsx$danshanranking",
    key_final: "ranking",
    side_eval: lower_better,
  },
  {
    key_head: "Sagarin Rating",
    key_init: "gsx$sagarin",
    key_final: "rating",
    side_eval: lower_better,
  },
];

export const structure_matchup_data = (data_ar) => {
  try {
    var raw_matchup = data_ar[0].feed.entry;
    // console.log("raw_matchup", raw_matchup);
    var raw_matchup_sag = data_ar[1].feed.entry;
    // console.log("raw_matchup_sag", raw_matchup_sag);

    raw_matchup = structure_raw_row_from_key_mapping({
      raw: raw_matchup,
      key_mapping: key_mapping_matchup,
    });
    raw_matchup = raw_matchup.map((ea) => ({
      ...ea,
      team: get_team_key({ team: ea.team, category, subcategory }),
    }));
    raw_matchup_sag = structure_raw_row_from_key_mapping({
      raw: raw_matchup_sag,
      key_mapping: key_mapping_matchup_sag,
    });
    raw_matchup_sag = raw_matchup_sag.map((ea) => ({
      ...ea,
      team: get_team_key({ team: ea.team, category, subcategory }),
      rating : get_n_with_sign(ea.rating),
      ranking : get_n_with_sign(ea.ranking),
    }));

    // console.log("raw_matchup=>", raw_matchup);

    var str_matchup = _.keyBy(
      _.merge(_.keyBy(raw_matchup, "team"), _.keyBy(raw_matchup_sag, "team")),
      "team"
    );
    delete str_matchup[""];
    // console.log("str_matchup=>", str_matchup);
    return { stat_structure: str_matchup, stat_key: "matchup" };
  } catch (err) {
    return { stat_structure: {}, stat_key: "matchup" };
  }
};

export const MatchupTab = ({ statA, statB }) => {
  const { teamA, teamA_Img, colorA } = statA;
  const matchA = (statA && statA?.stats?.matchup) || {};
  const { teamB, teamB_Img, colorB } = statB;
  const matchB = (statB && statB?.stats?.matchup) || {};
  // console.log('matchup tab', matchA, matchB)
  
  const display_key_mapping = [
    ...key_mapping_matchup_sag.slice(1),
    ...key_mapping_matchup.slice(1),
  ];

  return (matchA && Object.keys(matchA).length != 0) ||
    (matchB && Object.keys(matchB).length != 0) ? (
    <div className="card-content">
      <TeamBar
        midTitle={"Matchup"}
        {...{ teamA, teamA_Img, teamB, teamB_Img }}
      />
      <div className="bottom-margin-30px"></div>
      {display_key_mapping.map((stat_row) => (
        <>
          <div className="spacing-10px"></div>
          <SingleStat
            statLeft={matchA && matchA[stat_row.key_final]}
            statRight={matchB && matchB[stat_row.key_final]}
            side={
              stat_row.side_eval
                ? stat_row.side_eval(
                    get_n(matchA[stat_row.key_final]),
                    get_n(matchB[stat_row.key_final])
                  )
                : -1
            }
            show_line={true}
            statTitle={stat_row.key_head}
            {...{ colorA, colorB }}
          />
        </>
      ))}

      <div className="bottom-margin-30px"></div>
    </div>
  ) : (
    <div className="card-content">
      <p className="flow-text center">No Data Fetched at the moment</p>
    </div>
  );
};


export const TeamMatchup = ({ team, category, subcategory }) => {
  const { teamImg, color1, color2 } = get_team_data_from_any_name({
    team,
    category,
    subcategory,
  });
  const match = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].stats["matchup"][team];
    } catch (err) {
      return [];
    }
  });

  const p_heads = [
    "P1",
    "P2",
    "P3",
  ];
  const opp_p_heads = [
    "Opp P1",
    "Opp P2",
    "Opp P3",
  ];
  const odds_heads = [
    "Shots",
    "Penalties",
    "Pen Minutes",
    "Total",
  ];
  const opp_odds_heads = [
    "Opp Shots",
    "Opp Penalties",
    "Opp Pen Minutes",
    "Opp Total",
  ];

  return (
    <div className="card round-card"
    style={{ boxShadow: `0 0px 5px 0 ${color1}`}}>
      <div className="card-content">
        {match && Object.keys(match).length != 0 ? (
          <>
            <div className="row-flex justify-space-around">
              {/* <TeamLink {...{team, size:'large',}}/> */}
            </div>
            <div className="bottom-margin-30px"></div>
            <div className="row-flex justify-space-around">
              {/* <TeamLink {...{team, size:'large',}}/> */}
              <h5 className="head">Team Matchup</h5>
            </div>
            <div className="spacing-20px"></div>
            <div className="row mb-5px">
              <div className="col s6">
                <div className="row mb-0px">
                  <StatPairCollection heads_ar={p_heads} {...{ match }} />
                </div>
              </div>
              <div className="col s6">
                <div className="row mb-0px">
                  <StatPairCollection heads_ar={opp_p_heads} {...{ match }} />
                </div>
              </div>
            </div>
            <div className="row mb-5px ">
              <div className="col s12 m6">
                <StatPair {...{ match, stat_row: _.find(key_mapping_matchup_sag, { key_head: 'Power Ranking' }) }} />
              </div>
              <div className="col s12 m6">
                <StatPair {...{ match, stat_row: _.find(key_mapping_matchup_sag, { key_head: 'Sagarin Rating' }) }} />
              </div>
            </div>
            <div className="row mb-0px">
              <div className="col s6">
                <div className="row">
                  <StatPairCollection heads_ar={odds_heads} {...{ match }} />
                </div>
              </div>
              <div className="col s6">
                <div className="row">
                  <StatPairCollection
                    heads_ar={opp_odds_heads}
                    {...{ match }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="flow-text center">No Data Fetched at the moment</p>
        )}
      </div>
    </div>
  );
};

const get_ar_from_key_heads = (head_ar) => {
  const mapping = key_mapping_matchup.concat(key_mapping_matchup_sag);
  return head_ar.map((head) => _.find(mapping, { key_head: head }));
};

const StatPair = ({ stat_row, match }) => {
  return (
    <>
      <div
        style={{ paddingLeft: "25px", paddingRight: "25px" }}
        className="row-flex justify-space-between"
      >
        <span className="head">{stat_row?.key_head}</span>
        <span>{match[stat_row?.key_final]}</span>
      </div>
      <div className="spacing-20px"></div>
    </>
  );
};

const StatPairCollection = ({ heads_ar, match }) => {
  return (
    <>
      {get_ar_from_key_heads(heads_ar).map((stat_row, ind) => (
        <div className="col s12 l6">
          {" "}
          <StatPair {...{ match, stat_row }} />{" "}
        </div>
      ))}
    </>
  );
};