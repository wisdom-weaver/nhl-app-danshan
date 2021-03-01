import { structure_matchup_data } from "../../components/stats_cards_components/basketball-nba-tabs/MatchTab";
import { structure_injuries_data } from "../../components/stats_cards_components/basketball-nba-tabs/InjuriesTab";
import { structure_odds_data } from "../../components/stats_cards_components/basketball-nba-tabs/OddsTab";
import { structure_trends_data } from "../../components/stats_cards_components/basketball-nba-tabs/TrendsTab";
import { structure_streaks_data } from "../../components/stats_cards_components/basketball-nba-tabs/StreaksTab";
import { structure_powerrankings_data } from "../../components/stats_cards_components/basketball-nba-tabs/PowerRankingsTab";
import { hockey_nhl_stats_ob } from "../../components/stats_cards_components/hockey-nhl-tabs/hockey_nhl_stats_ob";

const initialState = {
  hockey: {
    nhl: hockey_nhl_stats_ob
  },
};

export const teamStatsReducer = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case "SET_STATUS_AT_KEY":
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          [action.subcategory]: {
            ...state[action.category][action.subcategory],
            status: {
              ...state[action.category][action.subcategory].status,
              [action.status_key]: action.status_update,
            },
          },
        },
      };
    case "SET_STATS_AT_KEY":
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          [action.subcategory]: {
            ...state[action.category][action.subcategory],
            stats: {
              ...state[action.category][action.subcategory].stats,
              [action.stat_key]: action.stat_structure,
            },
          },
        },
      };
    default:
      return state;
  }
};
