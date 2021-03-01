import _ from "lodash";
import { useSelector } from "react-redux";
import {
  get_team_data_from_any_name,
  get_team_key,
} from "../../../utils/utils";
import LargeLogo from "../../LargeLogo";
import {
  SingleStat,
  structure_raw_row_from_key_mapping,
} from "../stats_cards_components";

const key_mapping_odds = [
  {
    key_head: "Team",
    key_init: "gsx$team",
    key_final: "team",
  },
  {
    key_init: "gsx$open",
    key_final: "open",
    key_head: "Open",
  },
  {
    key_init: "gsx$consensus",
    key_final: "consensus",
    key_head: "Consensus",
  },
  {
    key_init: "gsx$betmgm",
    key_final: "betmgm",
    key_head: "Betmgm",
  },
  {
    key_init: "gsx$sportsbetting",
    key_final: "sportsbetting",
    key_head: "Sports Betting",
  },
  {
    key_init: "gsx$wynn",
    key_final: "wynn",
    key_head: "Wynn",
  },
  {
    key_init: "gsx$wh",
    key_final: "wh",
    key_head: "WH",
  },
  {
    key_init: "gsx$dk",
    key_final: "dk",
    key_head: "DK",
  },
  {
    key_init: "gsx$circa",
    key_final: "circa",
    key_head: "Circa",
  },
];

const category = "basketball",
  subcategory = "nba";

export const structure_odds_data = (data_ar) => {
  var raw_odds = data_ar[0].feed.entry;
  raw_odds = structure_raw_row_from_key_mapping({
    raw: raw_odds,
    key_mapping: key_mapping_odds,
  });
  // console.log("raw_odds", raw_odds);
  raw_odds = raw_odds.map((ea) => ({
    ...ea,
    team: get_team_key({ team: ea.team, category, subcategory }),
  }));
  var str_odds = _.keyBy(raw_odds, "team");
  delete str_odds[""];
  // console.log("str_odds", str_odds);
  return { stat_structure: str_odds, stat_key: "odds" };
};

export const OddsTab = ({ statA, statB }) => {
  const { teamA, teamA_Img, colorA } = statA;
  const oddsA = (statA && statA?.stats["odds"]) || {};
  const { teamB, teamB_Img, colorB } = statB;
  const oddsB = (statB && statB?.stats["odds"]) || {};
  // console.log("odds", { oddsA, oddsB });
  // return <></>
  return (
    <div className="card-content">
      {oddsA && Object.keys(oddsA).length != 0 ? (
        <>
          <div className="row-flex align-">
            <div className="col-flex w-200px justify-flex-start">
              <LargeLogo image={teamA_Img} />
              <span className="bold center">{teamA}</span>
            </div>
            <h5 className="center">vs</h5>
            <div className="col-flex w-200px justify-flex-start">
              <LargeLogo image={teamB_Img} />
              <span className="bold center">{teamB}</span>
            </div>
          </div>
          <div className="spacing-20px"></div>
          <h5 className="center">Odds</h5>
          <div className="spacing-20px"></div>
          <div className="m-auto max_w-250px">
            {key_mapping_odds.map(({ key_head, key_final }) => (
              <>
                <SingleStat
                  statLeft={key_head}
                  statRight={oddsA[key_final]}
                  lval={20}
                  rval={80}
                  // statTitle={key_head}
                  {...{ colorA, colorB }}
                />
                <div className="spacing-10px"></div>
              </>
            ))}
          </div>
        </>
      ) : (
        <h5 className="center">No Odds yet</h5>
      )}
    </div>
  );
};

export const TeamOdds = ({ team, category, subcategory }) => {
  const { teamImg } = get_team_data_from_any_name({
    team,
    category,
    subcategory,
  });
  const odds = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].stats["odds"][team];
    } catch (err) {
      return [];
    }
  });
  // return <></>
  return (
    <div className="card round-card">
      <div className="card-content">
        {odds && Object.keys(odds).length != 0 ? (
          <>
            <div className="row-flex align-">
              <div className="col-flex w-200px justify-flex-start">
                <LargeLogo image={teamImg} />
                <span className="bold center">{team}</span>
              </div>
            </div>
            <div className="spacing-20px"></div>
            <h5 className="center">Odds</h5>
            <div className="spacing-20px"></div>
            <div className="m-auto max_w-250px">
              {key_mapping_odds.map(({ key_head, key_final }) => (
                <>
                  <SingleStat
                    statLeft={key_head}
                    statRight={odds[key_final]}
                    lval={20}
                    rval={80}
                    // statTitle={key_head}
                    // {...{ colorA, colorB }}
                  />
                  <div className="spacing-10px"></div>
                </>
              ))}
            </div>
          </>
        ) : (
          <h5 className="center">No Odds yet</h5>
        )}
      </div>
    </div>
  );
};
