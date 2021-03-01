import { relativeTimeRounding } from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Tabs, Tab } from "react-materialize";
import { useDispatch, useSelector } from "react-redux";
import { store } from "..";
import LargeLogo from "../components/LargeLogo";
import SmallLogo from "../components/SmallLogo";
import {
  MatchupTab,
  structure_matchup_data,
} from "../components/stats_cards_components/basketball-nba-tabs/MatchTab";
import { InjuriesTab } from "../components/stats_cards_components/basketball-nba-tabs/InjuriesTab";
import { OddsTab } from "../components/stats_cards_components/basketball-nba-tabs/OddsTab";
import {
  both,
  higher_better,
  lower_better,
  SingleStat,
  TeamBar,
} from "../components/stats_cards_components/stats_cards_components";
import {
  get_all_team_stats_action,
  get_team_stats_at_key_only_action,
  set_stats_at_key_action,
  set_status_at_key_action,
} from "../store/actions/teamStatsActions";
import { get_colors_combo, get_team_data_from_any_name } from "../utils/utils";
import { TrendsTab } from "../components/stats_cards_components/basketball-nba-tabs/TrendsTab";
import { StreaksTab } from "../components/stats_cards_components/basketball-nba-tabs/StreaksTab";

export const dispatch_structured_data = ({
  category,
  subcategory,
  structured_data,
}) => {
  var { stat_key, stat_structure } = structured_data;
  return store.dispatch(
    set_stats_at_key_action({
      category,
      subcategory,
      stat_key,
      stat_structure,
    })
  );
};
export const dispatch_status_loaded = ({ category, subcategory, stat_key }) => {
  return store.dispatch(
    set_status_at_key_action({
      category,
      subcategory,
      status_key: stat_key,
      status_update: "loaded",
    })
  );
};
export const post_fetch_api_at_stat_key = ({
  data_ar,
  structure_data,
  category,
  subcategory,
}) => {
  const structured_data = structure_data(data_ar);
  const { status_key } = structured_data;
  dispatch_structured_data({
    category,
    subcategory,
    structured_data,
  });
};

const get_team_stats = ({ team, configs, category, subcategory, stats }) => {
  if (!stats) return {};
  var ar = Object.keys(configs).map(([key]) => [
    [key],
    [stats[key][team]] || null,
  ]);
  return Object.entries(ar);
};

function StatsTabsCard(props) {
  // console.log("StatsTabCard 2");
  const dispatch = useDispatch();

  const { category, subcategory, GameID, teamsData } = props;
  // console.log(category, subcategory, GameID)
  var [teamA_mini, teamB_mini] = GameID.split("@").map(
    (ea) => ea.split(" ").reverse()[0]
  );
  const configs = {
    matchup: {
      apis: [
        // match_api,
        "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/1/public/values?alt=json",
        // sag_api
        "https://spreadsheets.google.com/feeds/list/1cUcZSRXi5ksKsHqTnQGTtWkhflNbxUpTTwaPmLv-cmk/4/public/values?alt=json",
      ],
      structure_data: structure_matchup_data,
    },
  };
  const { stats, status } = useSelector(
    (store) => store.teamStats[category][subcategory]
  );
  if (!stats)
    return (
      <>
        <div className="row">
          <div className="col s12">
            <div className="card round-card">
              <div className="card-content">
                <h1 className="center">Loading...</h1>
              </div>
            </div>
          </div>
        </div>
      </>
    );

  const team_dataA = get_team_data_from_any_name({team: teamA_mini, category, subcategory});
  const team_dataB = get_team_data_from_any_name({team: teamB_mini, category, subcategory});
  const keys = ["matchup", "injuries", "odds", "trends"];

  const { colorA, colorB } = get_colors_combo({
    colorsA: [team_dataA.color1, team_dataA.color2],
    colorsB: [team_dataB.color1, team_dataB.color2],
  });

  const statA = {
    teamA: team_dataA.teamName,
    teamA_Img: team_dataA.teamImg,
    colorA,
    stats: dispatch(
      get_all_team_stats_action({
        team: teamA_mini,
        category,
        subcategory,
        keys,
      })
    ),
  };
  const statB = {
    teamB: team_dataB.teamName,
    teamB_Img: team_dataB.teamImg,
    colorB,
    stats: dispatch(
      get_all_team_stats_action({
        team: teamB_mini,
        category,
        subcategory,
        keys,
      })
    ),
  };

  const streak_game_id = `${teamA_mini}@${teamB_mini}`;
  const streaks = (() => {
    try {
      return stats["streaks"][streak_game_id];
    } catch (err) {
      return [];
    }
  })();

  // console.log("stats", { statA, statB });
  // console.log("streaks", streak_game_id, streaks);

  return (
    <>
      <div className="row">
        <div className="col s12 m12">
          <div className="card round-card">
            <div className="card-content">
              {status["trends"] == "loaded" &&
                statA &&
                statB &&
                statA?.stats["trends"] &&
                statB?.stats["trends"] && <TrendsTab {...{ statA, statB }} />}
            </div>
          </div>
        </div>
        <div className="col s12 m6">
          <div className="card round-card">
            <div className="card-content">
              {status["matchup"] == "loaded" &&
                statA &&
                statB &&
                statA?.stats["matchup"] &&
                statB?.stats["matchup"] && <MatchupTab {...{ statA, statB }} />}
            </div>
          </div>
        </div>
        <div className="col s12 m6">
          <div className="card round-card">
            <div className="card-content">
              {status["injuries"] == "loaded" &&
                statA &&
                statB &&
                statA?.stats["injuries"] &&
                statB?.stats["injuries"] && (
                  <InjuriesTab {...{ statA, statB }} />
                )}
            </div>
          </div>
        </div>
        <div className="col s12 m6">
          <div className="card round-card">
            <div className="card-content">
              {status["odds"] == "loaded" &&
                statA &&
                statB &&
                statA?.stats["odds"] &&
                statB?.stats["odds"] && <OddsTab {...{ statA, statB }} />}
            </div>
          </div>
        </div>
        <div className="col s12 m6">
          <div className="card round-card">
            <div className="card-content">
              {status["streaks"] == "loaded" && statA && statB && (
                <StreaksTab {...{ statA, statB, streaks }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsTabsCard;
