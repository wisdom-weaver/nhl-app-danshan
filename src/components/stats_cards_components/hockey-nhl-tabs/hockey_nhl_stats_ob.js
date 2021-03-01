import { structure_odds_data, OddsTab } from "./OddsTab";
import { structure_injuries_data, InjuriesTab } from "./InjuriesTab";
import { structure_streaks_data, StreaksTab } from "./StreaksTab";
import { structure_trends_data, TrendsTab } from "./TrendsTab";
import { structure_matchup_data, MatchupTab } from "./MatchTab";
import { structure_powerrankings_data } from "./PowerRankingsTab";

export const hockey_nhl_stats_ob = {
  status: {
    matchup: "not_loaded",
    injuries: "not_loaded",
    odds: "not_loaded",
    trends: "not_loaded",
    streaks: "not_loaded",
    powerrankings: "not_loaded",
  },
  configs: {
    odds:{
      apis: [
        "https://spreadsheets.google.com/feeds/list/1dEWChz8nDCVa1tmIi2QuUSzuYD2ZHQ1th2ZvUW5OKto/5/public/values?alt=json",
      ],
      structure_data: structure_odds_data,
    },
    injuries: {
      apis: [
        "https://spreadsheets.google.com/feeds/list/1dEWChz8nDCVa1tmIi2QuUSzuYD2ZHQ1th2ZvUW5OKto/4/public/values?alt=json",
      ],
      structure_data: structure_injuries_data,
    },
    streaks: {
      apis: [
        "https://spreadsheets.google.com/feeds/list/1dEWChz8nDCVa1tmIi2QuUSzuYD2ZHQ1th2ZvUW5OKto/7/public/values?alt=json",
      ],
      structure_data: structure_streaks_data,
    },
    trends: {
      apis: [
        "https://spreadsheets.google.com/feeds/list/1dEWChz8nDCVa1tmIi2QuUSzuYD2ZHQ1th2ZvUW5OKto/6/public/values?alt=json",
      ],
      structure_data: structure_trends_data,
    },
    matchup: {
      apis: [
        "https://spreadsheets.google.com/feeds/list/1dEWChz8nDCVa1tmIi2QuUSzuYD2ZHQ1th2ZvUW5OKto/1/public/values?alt=json",
        "https://spreadsheets.google.com/feeds/list/1dEWChz8nDCVa1tmIi2QuUSzuYD2ZHQ1th2ZvUW5OKto/2/public/values?alt=json",
      ],
      structure_data: structure_matchup_data,
    },
    powerrankings:{
      apis: [
        "https://spreadsheets.google.com/feeds/list/1dEWChz8nDCVa1tmIi2QuUSzuYD2ZHQ1th2ZvUW5OKto/2/public/values?alt=json",
      ],
      structure_data: structure_powerrankings_data
    }
  },
  tabs:[
    {title: 'matchup', component: MatchupTab},
    {title: 'odds', component: OddsTab},
    {title: 'trends', component: TrendsTab},
    {title: 'injuries', component: InjuriesTab},
    {title: 'streaks', component: StreaksTab},
  ]
}