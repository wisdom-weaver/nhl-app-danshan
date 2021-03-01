import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRouteMatch } from "react-router";
import LargeLogo from "../components/LargeLogo";
import StatsCardWrapper from "../components/StatsCardWrapper";
import { get_team_data_from_any_name } from "../utils/utils";
// import StatsTabsCard, { statsPostFetchFn } from "./StatsTabsCard";
import StatsTabsCard, { post_fetch_api_at_stat_key } from "./StatsTabsCard";
import {
  updateGameStreaksAction,
  updateTeamStatsAction,
} from "../store/actions/teamStatsActions";
import { structure_matchup_data } from "../components/stats_cards_components/basketball-nba-tabs/MatchTab";
import { structure_injuries_data } from "../components/stats_cards_components/basketball-nba-tabs/InjuriesTab";
import { structure_odds_data } from "../components/stats_cards_components/basketball-nba-tabs/OddsTab";
import { structure_trends_data } from "../components/stats_cards_components/basketball-nba-tabs/TrendsTab";
import { structure_streaks_data } from "../components/stats_cards_components/basketball-nba-tabs/StreaksTab";

const category='baskettball', subcategory='nba';

function GamePage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const { gameid } = match.params;
  const category = "basketball";
  const subcategory = "nba";
  const GameID = gameid.replaceAll("_", " ");

  var [teamA_mini, teamB_mini] = GameID.split("@").map(
    (ea) => ea.split(" ").reverse()[0]
  );

  const teamAData = get_team_data_from_any_name({team: teamA_mini, category, subcategory});
  const teamBData = get_team_data_from_any_name({team: teamB_mini, category, subcategory});
  console.log({teamAData, teamBData});
  const teamsData = {
    teamA: teamAData.teamName,
    teamA_Img: teamAData.teamImg,
    colorA: teamAData.color1,
    teamB: teamBData.teamName,
    colorB: teamBData.color1,
    teamB_Img: teamBData.teamImg,
  };

  const { configs } = useSelector(
    ({ teamStats }) => teamStats[category][subcategory]
  );

  return (
    <div className="container">
      <StatsCardWrapper
        {...{ category, subcategory, post_fetch_api_at_stat_key, configs }}
      >
        <StatsTabsCard {...{ category, subcategory, GameID, teamsData }} />
      </StatsCardWrapper>
    </div>
  );
}

export default GamePage;
