import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRouteMatch } from "react-router";
import LargeLogo from "../components/LargeLogo";
import StatsCardWrapper from "../components/StatsCardWrapper";
import { get_team_data_from_any_name } from "../utils/utils";
import StatsTabsCard, { statsPostFetchFn } from "./StatsTabsCard";
import {
  updateGameStreaksAction,
  updateTeamStatsAction,
} from "../store/actions/teamStatsActions";
import { post_fetch_api_at_stat_key } from "./StatsTabsCard";
import InjuriesPage from "./InjuriesPage";
import { TeamInjuries } from "../components/stats_cards_components/hockey-nhl-tabs/InjuriesTab";
import SmallLogo from "../components/SmallLogo";
import { TeamOdds } from "../components/stats_cards_components/hockey-nhl-tabs/OddsTab";
import { TeamTrends } from "../components/stats_cards_components/hockey-nhl-tabs/TrendsTab";
import {
  TeamMatchup,
  TeamMatchupMD,
} from "../components/stats_cards_components/hockey-nhl-tabs/MatchTab";
import { TeamPowerRankings } from "../components/stats_cards_components/hockey-nhl-tabs/PowerRankingsTab";
import { NavLink } from "react-router-dom";
import { ButtonLinks } from "../components/Layout";

const category = "hockey";
const subcategory = "nhl";

function TeamPage(props) {
  const match = useRouteMatch();
  var { teamid } = match.params;
  teamid = teamid?.replace("_", " ");
  const teamData = get_team_data_from_any_name({
    team: teamid,
    category,
    subcategory,
  });
  const { teamImg, teamName, color1, color2 } = teamData;
  const { configs } = useSelector(
    ({ teamStats }) => teamStats[category][subcategory]
  );
  const status = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].status;
    } catch (err) {
      return false;
    }
  });

  const team_matchup = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].stats.matchup[teamName];
    } catch (err) {
      return {};
    }
  });

  return (
    <div className="">
      <div className="team-top-section">
        <StatsCardWrapper
          {...{ category, subcategory, post_fetch_api_at_stat_key, configs }}
        >
          <div className="spacing-30px"></div>
          <div className="row">
            <div className="col s12 m12 l6 offset-l3">
              <div className="card round-card" style={{ background: color1 }}>
                <div className="card-content">
                  <div className="col-flex">
                    <div
                      className="large-logo-container"
                      style={{
                        backgroundColor: "white",
                        padding: "2px",
                        height: "80px",
                        width: "80px",
                        overflow: "hidden",
                        borderRadius: "15px",
                      }}
                    >
                      <img src={teamImg} />
                    </div>
                    <h5 className="head white-text">{teamName}</h5>
                  </div>
                </div>
              </div>
            </div>
            <ButtonLinks />
            {status?.powerrankings == "loaded" && (
              <div className="col s12">
                <TeamPowerRankings
                  {...{ team: teamName, category, subcategory }}
                />
              </div>
            )}
            {status?.injuries == "loaded" && (
              <div className="col s12">
                <TeamInjuries {...{ team: teamName, category, subcategory, showTeam: false }} />
              </div>
            )}
            {status?.matchup == "loaded" && (
              <div className="col s12">
                <TeamMatchup {...{ team: teamName, category, subcategory }} />
              </div>
            )}
            {status?.matchup == "loaded" && (
              <div className="col s12">
                <TeamMatchupMD {...{ team: teamName, category, subcategory }} />
              </div>
            )}
            {status?.trends == "loaded" && (
              <div className="col s12">
                <TeamTrends {...{ team: teamName, category, subcategory }} />
              </div>
            )}
          </div>
        </StatsCardWrapper>
      </div>
    </div>
  );
}

export default TeamPage;
