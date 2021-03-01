import _ from "lodash";
import { useSelector } from "react-redux";
import { get_team_data_from_any_name, get_team_key } from "../../../utils/utils";
import LargeLogo from "../../LargeLogo";
import {
  SingleStat,
  structure_raw_row_from_key_mapping,
  TeamBar,
} from "../stats_cards_components";

const key_mapping_trends = [
  {
    key_head: "Team",
    key_final: "team",
    key_init: "gsx$team",
  },
  {
    key_head: "Teams",
    key_final: "teams",
    key_init: "gsx$teams",
  },
  {
    key_head: "Win Loss",
    key_final: "win-loss",
    key_init: "gsx$win-loss",
  },
  {
    key_head: "Streak",
    key_final: "streak",
    key_init: "gsx$streak",
  },
  {
    key_head: "ATS",
    key_init: "gsx$ats",
    key_final: "ats",
  },
  {
    key_head: "Open",
    key_final: "open",
    key_init: "gsx$open",
  },
  {
    key_head: "Side",
    key_final: "side",
    key_init: "gsx$side",
  },
  {
    key_head: "Money",
    key_final: "money",
    key_init: "gsx$money",
  },
  {
    key_head: "OU",
    key_final: "ou",
    key_init: "gsx$ou",
  },
];

const category = 'basketball', subcategory ='nba';

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
            <td>Teams</td>
            {key_mapping_trends.map(({ key_head, key_final }) => (
              <td>{key_head}</td>
            ))}
          </tr>
          <tr>
            <td style={{ borderBottom: `3px solid ${colorA}` }}>
              {trendsA["teams"]}
            </td>
            {key_mapping_trends.map(({ key_head, key_final }) => (
              <td>{trendsA[key_final]}</td>
            ))}
          </tr>
          <tr>
            <td style={{ borderBottom: `4px solid ${colorB}` }}>
              {trendsB["teams"]}
            </td>
            {key_mapping_trends.map(({ key_head, key_final }) => (
              <td>{trendsB[key_final]}</td>
            ))}
          </tr>
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
  // return <></>
  return (
    <div className="card round-card">
      <div className="card-content">
        {trends && Object.keys(trends).length != 0 ? (
          <>
          <table className="hide-on-small-only">
          <tbody>
            <tr>
              <td>Teams</td>
              {key_mapping_trends.map(({ key_head, key_final }) => (
                <td>{key_head}</td>
              ))}
            </tr>
            <tr>
              <td style={{ borderBottom: `3px solid ${color1}` }}>
                {trends["teams"]}
              </td>
              {key_mapping_trends.map(({ key_head, key_final }) => (
                <td>{trends[key_final]}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <table className="hide-on-med-and-up">
          <tbody>
            {key_mapping_trends.map(({ key_head, key_final }) => (
              <SingleStat
                statLeft={trends[key_final]}
                // statRight={trendsB[key_final]}
                show_line={true}
                statTitle={key_head}
                {...{ color1, color2 }}
              />
            ))}
          </tbody>
        </table>
        </>
        ) : (
          <h5 className="center">No Trends yet</h5>
        )}
      </div>
    </div>
  );
};
