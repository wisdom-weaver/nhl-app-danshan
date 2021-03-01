// import { functionsIn } from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// import GetFromAPI from "../components/GetFromAPI";
import LargeLogo from "../components/LargeLogo";
import SmallLogo from "../components/SmallLogo";
import StatsCardWrapper from "../components/StatsCardWrapper";
import { TeamInjuries } from "../components/stats_cards_components/hockey-nhl-tabs/InjuriesTab";
import {
  get_all_teams_names,
  get_n_with_sign,
  get_team_data,
} from "../utils/utils";
import StatsTabsCard, { post_fetch_api_at_stat_key } from "./StatsTabsCard";
import { TeamLink } from "./HomePage";
import _ from "lodash";
import { ButtonLinks } from "../components/Layout";

const category = "hockey";
const subcategory = "nhl";

const filter = ({ search, rankings_all }) => {
  // search = search.trim()
  if (!search) return;
  search = search.split(" ");

  rankings_all = Object.entries(rankings_all);
  rankings_all = rankings_all.map(([team, teamob]) => {
    var count = 0;
    var { team, ranking } = teamob;
    search.map((word) => {
      if (!word) return;
      word = word.toLowerCase();
      if (team && team.toLowerCase().includes(word)) count += 100;
      if (ranking && ranking.toLowerCase().includes(word)) count += 5;
    }, 0);
    return { team, count };
  });
  var sorted = rankings_all
    .filter((ea) => ea.count != 0)
    .sort((a, b) => b.count > a.count)
    .map(({ team }) => team);
  return sorted;
};

const EachPowerRankingRow = ({ team, rankings_all }) => {
  const { teamImg } = get_team_data({ team, category, subcategory });
  return (
    <>
      <tr>
        <td>
          <TeamLink {...{ team }} />
        </td>
        <td className="head">{get_n_with_sign(rankings_all[team].ranking)}</td>
      </tr>
    </>
  );
};

const PowerRankingsJSX = ({ teams, rankings_all }) => {
  return (
    <>
      {teams && teams.length > 0 && (
        <table>
          <tr>
            <th>Teams</th>
            <th>PowerRankings</th>
          </tr>
          {teams?.map((team) => (
            <EachPowerRankingRow {...{ team, rankings_all }} />
          ))}
        </table>
      )}
      {(!teams || !(teams?.length > 0)) && (
        <h5 className="center">Nothing Found</h5>
      )}
    </>
  );
};

function PowerRankingsPage() {
  const { configs } = useSelector(
    ({ teamStats }) => teamStats[category][subcategory]
  );
  var rankings_all = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].stats["powerrankings"];
    } catch (err) {
      return {};
    }
  });

  const [search, set_search] = useState("");

  var loaded = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].status["powerrankings"];
    } catch (err) {
      return false;
    }
  });

  return (
    <div>
      <h5 className="center head">NHL PowerRankings</h5>
      <div className="row">
        <ButtonLinks />
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          set_search(e.target.value);
        }}
      />
      <StatsCardWrapper
        {...{ category, subcategory, post_fetch_api_at_stat_key, configs }}
      >
        {loaded == "loaded" && (
          <>
            <div className="card round-card">
              <div className="card-content">
                {(() => {
                  var teams;
                  if (!search || search?.trim().length == 0)
                    teams = _.sortBy(rankings_all, function (ob) {
                      return parseFloat(ob.ranking);
                    }).map((ea) => ea.team);
                  else {
                    teams = filter({ search, rankings_all });
                  }
                  return <PowerRankingsJSX {...{ teams, rankings_all }} />;
                })()}
              </div>
            </div>
          </>
        )}
        {loaded == "loading" && (
          <>
            <div className="card round-card">
              <div className="card-content">
                <h5 className="center"> Loading.... </h5>
              </div>
            </div>
          </>
        )}
      </StatsCardWrapper>
    </div>
  );
}

export default PowerRankingsPage;
